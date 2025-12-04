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
  onCancel: () => void
}

export default function ConsentSimulator({ onComplete, onCancel }: Props) {
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
    // Cancel the authorization - don't execute the query
    onCancel()
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
          <div className="bg-gradient-to-r from-orange-600 to-red-600 px-6 py-4 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🏢</div>
              <div>
                <h2 className="text-lg font-bold text-white">ENTERPRISE DATA ACCESS REQUEST</h2>
                <p className="text-orange-100 text-xs">Traditional OAuth Authorization</p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            {/* Architecture Flow */}
            <div className="mb-4 p-4 bg-blue-50 border-2 border-blue-300 rounded-md">
              <div className="text-center space-y-3">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm">
                    🤖 NCAA Stats AI Chatbot
                  </div>
                  <div className="text-xs text-blue-600 font-medium mt-1">(Requesting Application)</div>
                </div>

                <div className="text-blue-600 text-2xl">↓</div>
                <div className="text-xs text-gray-600 font-medium">wants to access</div>
                <div className="text-blue-600 text-2xl">↓</div>

                <div className="flex flex-col items-center">
                  <div className="bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2">
                    {screen.icon} {screen.appName}
                  </div>
                  <div className="text-xs text-orange-600 font-medium mt-1">(Resource Application)</div>
                  <div className="text-xs text-gray-500 mt-1 font-medium">Enterprise-Managed Proprietary Data</div>
                </div>
              </div>
            </div>

            {/* Enterprise Data Warning + IT Visibility Combined */}
            <div className="mb-4 p-3 bg-amber-50 border-2 border-amber-400 rounded-md">
              <p className="text-xs text-amber-900 flex items-start gap-2">
                <span className="text-base">🏢</span>
                <span>
                  <strong>This is COMPANY-OWNED data</strong> (not personal user data).
                  IT should manage this centrally, but <strong>has NO VISIBILITY</strong> with Traditional OAuth.
                </span>
              </p>
            </div>

            {/* Permissions list */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                The chatbot will access:
              </p>
              <ul className="space-y-1">
                {screen.permissions.map((permission, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>{permission}</span>
                  </li>
                ))}
              </ul>
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
