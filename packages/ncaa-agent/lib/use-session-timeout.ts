'use client'

import { useEffect, useRef, useState } from 'react'
import { signOut } from 'next-auth/react'

interface UseSessionTimeoutOptions {
  timeoutMinutes?: number // Total timeout duration
  warningMinutes?: number // Show warning before timeout
  onWarning?: () => void
  onTimeout?: () => void
}

export function useSessionTimeout({
  timeoutMinutes = 30,
  warningMinutes = 2,
  onWarning,
  onTimeout,
}: UseSessionTimeoutOptions = {}) {
  const [showWarning, setShowWarning] = useState(false)
  const lastActivityRef = useRef<number>(Date.now())
  const warningShownRef = useRef<boolean>(false)
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const timeoutMs = timeoutMinutes * 60 * 1000
  const warningMs = warningMinutes * 60 * 1000

  const updateActivity = () => {
    lastActivityRef.current = Date.now()
    warningShownRef.current = false
    setShowWarning(false)
  }

  const handleSignOut = async () => {
    console.log('🕐 Session timeout - signing out user')
    if (onTimeout) onTimeout()
    await signOut({ callbackUrl: '/auth/signin' })
  }

  useEffect(() => {
    // Track user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']

    events.forEach(event => {
      document.addEventListener(event, updateActivity)
    })

    // Check for timeout every 30 seconds
    checkIntervalRef.current = setInterval(() => {
      const now = Date.now()
      const timeSinceActivity = now - lastActivityRef.current
      const timeUntilTimeout = timeoutMs - timeSinceActivity

      // Show warning if approaching timeout
      if (timeUntilTimeout <= warningMs && !warningShownRef.current) {
        console.log(`⚠️ Session warning - ${warningMinutes} minutes until auto-signout`)
        warningShownRef.current = true
        setShowWarning(true)
        if (onWarning) onWarning()
      }

      // Sign out if timeout reached
      if (timeSinceActivity >= timeoutMs) {
        handleSignOut()
      }
    }, 30000) // Check every 30 seconds

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity)
      })
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current)
      }
    }
  }, [timeoutMs, warningMs, onWarning, onTimeout])

  return {
    showWarning,
    dismissWarning: updateActivity,
    remainingMinutes: Math.ceil((timeoutMs - (Date.now() - lastActivityRef.current)) / 60000)
  }
}
