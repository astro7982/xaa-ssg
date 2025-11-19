'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDemoMode } from '@/lib/demo-mode-context'

interface ConsentScreen {
  id: string
  appName: string
  permissions: string[]
  icon: string
}

const CONSENT_SCREENS: ConsentScreen[] = [
  {
    id: 'ncaa-stats',
    appName: 'NCAA Stats API',
    permissions: [
      'Read team standings and rankings',
      'Access game statistics',
      'View playoff projections',
      'Process analytical data'
    ],
    icon: '🏈'
  }
]

interface Props {
  onComplete: () => void
}

export default function ConsentSimulator({ onComplete }: Props) {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [hasTrackedInitial, setHasTrackedInitial] = useState(false)
  const { incrementConsentScreens, addTimeWasted, incrementClicks } = useDemoMode()

  useEffect(() => {
    // Track only the first consent screen shown
    if (!hasTrackedInitial) {
      incrementConsentScreens()
      setHasTrackedInitial(true)
    }
  }, [hasTrackedInitial, incrementConsentScreens])

  useEffect(() => {
    // Track when moving to next screen
    if (currentScreen > 0) {
      incrementConsentScreens()
    }
  }, [currentScreen, incrementConsentScreens])

  const handleAllow = async () => {
    incrementClicks()
    setIsProcessing(true)

    // Simulate OAuth redirect delay (2-3 seconds)
    const delay = 2000 + Math.random() * 1000
    addTimeWasted(Math.floor(delay / 1000))

    await new Promise(resolve => setTimeout(resolve, delay))

    if (currentScreen < CONSENT_SCREENS.length - 1) {
      // Move to next consent screen
      setCurrentScreen(prev => prev + 1)
      setIsProcessing(false)
    } else {
      // All consent screens complete
      onComplete()
    }
  }

  const handleCancel = () => {
    incrementClicks()
    // In a real scenario, this would cancel the flow
    // For demo purposes, we'll just allow it anyway after a moment
    setTimeout(() => {
      onComplete()
    }, 500)
  }

  const screen = CONSENT_SCREENS[currentScreen]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen.id}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="text-4xl">{screen.icon}</div>
              <div>
                <h2 className="text-xl font-bold text-white">{screen.appName}</h2>
                <p className="text-blue-100 text-sm">Authorization Required</p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* App wants access message */}
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800 flex items-start gap-2">
                <span className="text-lg">⚠️</span>
                <span>
                  <strong>{screen.appName}</strong> wants to access your data
                </span>
              </p>
            </div>

            {/* Permissions list */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                This application will be able to:
              </p>
              <ul className="space-y-2">
                {screen.permissions.map((permission, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>{permission}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Warning about no IdP visibility */}
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-xs text-red-700 flex items-start gap-2">
                <span>🔓</span>
                <span>
                  Your IT admin has <strong>no visibility</strong> into this authorization.
                  Tokens will be stored directly in the application.
                </span>
              </p>
            </div>

            {/* Agent Automation Warning */}
            <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-md">
              <p className="text-xs text-purple-800 flex items-start gap-2">
                <span>🤖</span>
                <span>
                  <strong>Imagine this with an AI agent:</strong> Every API integration requires manual consent.
                  For automated workflows making hundreds of calls, this becomes impossible.
                </span>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                disabled={isProcessing}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700
                  rounded-md text-sm font-medium transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAllow}
                disabled={isProcessing}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white
                  rounded-md text-sm font-medium transition-colors disabled:opacity-50
                  flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Allow</span>
                )}
              </button>
            </div>

            {/* Fine print */}
            <p className="mt-4 text-xs text-gray-400 text-center">
              By clicking "Allow", you authorize {screen.appName} to access your data.
              This consent bypasses your identity provider.
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
