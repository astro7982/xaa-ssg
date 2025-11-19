'use client'

import { useDemoMode } from '@/lib/demo-mode-context'
import { motion } from 'framer-motion'

export default function SessionMetrics() {
  const { metrics, mode } = useDemoMode()

  // Only show in Traditional OAuth mode
  if (mode !== 'traditional') {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-900/30 border-2 border-red-500/40 rounded-lg p-4 h-full overflow-y-auto"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">⚠️</span>
        <h3 className="text-sm font-bold text-red-200 uppercase tracking-wide">
          Traditional OAuth Overhead
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-scoreboard/50 rounded-md p-3 border border-red-500/20">
          <div className="text-xs text-gray-400 mb-1">Consent Screens</div>
          <div className="text-2xl font-bold text-red-300">{metrics.consentScreens}</div>
        </div>

        <div className="bg-scoreboard/50 rounded-md p-3 border border-red-500/20">
          <div className="text-xs text-gray-400 mb-1">Time Wasted</div>
          <div className="text-2xl font-bold text-red-300">{metrics.timeWasted}s</div>
        </div>

        <div className="bg-scoreboard/50 rounded-md p-3 border border-red-500/20">
          <div className="text-xs text-gray-400 mb-1">Clicks Required</div>
          <div className="text-2xl font-bold text-red-300">{metrics.clicksRequired}</div>
        </div>

        <div className="bg-scoreboard/50 rounded-md p-3 border border-red-500/20">
          <div className="text-xs text-gray-400 mb-1">IdP Visibility</div>
          <div className="text-lg font-bold text-red-400">NONE</div>
        </div>
      </div>

      <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-md p-3">
        <p className="text-xs text-yellow-200 flex items-start gap-2">
          <span className="text-sm">🔓</span>
          <span>
            <strong>Security Oversight:</strong> Each consent grants direct token access, bypassing
            your identity provider. IT has zero visibility or control over these authorizations.
          </span>
        </p>
      </div>

      {/* Comparison callout */}
      {metrics.consentScreens > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-3 bg-green-900/20 border border-green-500/30 rounded-md p-3"
        >
          <p className="text-xs text-green-200 flex items-start gap-2">
            <span className="text-sm">💡</span>
            <span>
              <strong>With XAA:</strong> Zero consent screens, instant authorization, full IdP
              visibility, and centralized token management.
            </span>
          </p>
        </motion.div>
      )}

    </motion.div>
  )
}
