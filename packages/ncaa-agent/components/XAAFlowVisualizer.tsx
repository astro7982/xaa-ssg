'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export type XAAStep = {
  id: string
  label: string
  description: string
  status: 'pending' | 'in_progress' | 'completed' | 'error'
  timestamp?: number
}

const XAA_STEPS: XAAStep[] = [
  {
    id: 'user_login',
    label: '1. User Login',
    description: 'Authenticating with Okta IdP...',
    status: 'pending'
  },
  {
    id: 'id_token',
    label: '2. ID Token',
    description: 'Received identity token',
    status: 'pending'
  },
  {
    id: 'token_exchange',
    label: '3. Token Exchange',
    description: 'Requesting cross-app access...',
    status: 'pending'
  },
  {
    id: 'id_jag',
    label: '4. ID-JAG',
    description: 'Enterprise approved connection',
    status: 'pending'
  },
  {
    id: 'access_request',
    label: '5. Access Token',
    description: 'Getting NCAA data access...',
    status: 'pending'
  },
  {
    id: 'mcp_query',
    label: '6. MCP Query',
    description: 'Fetching NCAA stats...',
    status: 'pending'
  },
  {
    id: 'data_returned',
    label: '7. Data',
    description: 'Query complete!',
    status: 'pending'
  }
]

interface Props {
  currentStep?: number
  isActive?: boolean
  cachedTokens?: {
    idToken?: string
    idJag?: string
    accessToken?: string
    cachedAt?: number
  } | null
}

export default function XAAFlowVisualizer({ currentStep = 0, isActive = false, cachedTokens }: Props) {
  const [steps, setSteps] = useState<XAAStep[]>(XAA_STEPS)
  const [showTokens, setShowTokens] = useState(false)

  useEffect(() => {
    if (isActive && currentStep > 0) {
      setSteps(prev =>
        prev.map((step, index) => ({
          ...step,
          status: index < currentStep ? 'completed' : index === currentStep ? 'in_progress' : 'pending',
          timestamp: index < currentStep ? Date.now() : undefined
        }))
      )
    } else {
      setSteps(XAA_STEPS)
    }
  }, [currentStep, isActive])

  const tokenAge = cachedTokens?.cachedAt ? Math.floor((Date.now() - cachedTokens.cachedAt) / 1000) : 0

  return (
    <div className="bg-scoreboard rounded-lg p-6 scoreboard-glow border border-scoreboard-orange/20 h-full overflow-y-auto">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-3 h-3 rounded-full bg-scoreboard-orange animate-pulse" />
        <h2 className="text-xl font-athletic text-white uppercase tracking-wider">
          🔐 XAA Flow Monitor
        </h2>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              p-4 rounded-md border-l-4 transition-all duration-300
              ${step.status === 'completed' ? 'border-green-500 bg-green-500/10' : ''}
              ${step.status === 'in_progress' ? 'border-scoreboard-orange bg-scoreboard-orange/10 token-pulse' : ''}
              ${step.status === 'pending' ? 'border-gray-600 bg-gray-800/30' : ''}
              ${step.status === 'error' ? 'border-red-500 bg-red-500/10' : ''}
            `}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`
                    text-sm font-scoreboard
                    ${step.status === 'completed' ? 'text-green-400' : ''}
                    ${step.status === 'in_progress' ? 'text-scoreboard-orange' : ''}
                    ${step.status === 'pending' ? 'text-gray-500' : ''}
                  `}>
                    {step.label}
                  </span>
                  {step.status === 'in_progress' && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-scoreboard-orange border-t-transparent rounded-full"
                    />
                  )}
                  {step.status === 'completed' && (
                    <span className="text-green-400">✓</span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">{step.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Security Warning Section */}
      {cachedTokens && (
        <div className="mt-6 pt-6 border-t border-red-500/30">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-start gap-2 mb-2">
              <span className="text-red-400 text-lg">⚠️</span>
              <div className="flex-1">
                <h3 className="text-red-400 font-bold text-sm">SECURITY RISK</h3>
                <p className="text-red-300/80 text-xs mt-1">
                  Token stored in browser memory - UNPROTECTED
                </p>
              </div>
            </div>
            <div className="mt-3 space-y-1 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span>Exposed for {tokenAge}s</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span>Vulnerable to XSS attacks</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span>No encryption or vault</span>
              </div>
            </div>

            <button
              onClick={() => setShowTokens(!showTokens)}
              className="mt-3 w-full px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200
                text-xs rounded border border-red-500/40 hover:border-red-500/60 transition-all"
            >
              {showTokens ? '🔒 Hide Tokens' : '👁️ View Exposed Tokens'}
            </button>

            {showTokens && cachedTokens && (
              <div className="mt-4 space-y-3">
                {cachedTokens.accessToken && (
                  <div className="bg-black/30 rounded p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-red-400 font-bold">ACCESS TOKEN</span>
                      <span className="text-xs text-red-300">⚠️ UNPROTECTED</span>
                    </div>
                    <div className="text-xs text-gray-300 font-mono break-all">
                      {cachedTokens.accessToken.substring(0, 50)}...
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {isActive && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <div className="w-2 h-2 rounded-full bg-okta-blue animate-pulse" />
            <span>Secured by Okta Cross-App Access (XAA)</span>
          </div>
        </div>
      )}
    </div>
  )
}
