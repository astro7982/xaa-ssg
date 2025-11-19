'use client'

import { motion } from 'framer-motion'

export default function EnhancedXAADiagram() {
  return (
    <div className="bg-gradient-to-br from-scoreboard via-gray-900 to-scoreboard rounded-lg border-2 border-green-500/30 p-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-500 animate-pulse" />
      </div>

      <h2 className="relative text-xl font-athletic text-white uppercase tracking-wide mb-8 text-center">
        <span className="text-green-400">XAA Flow:</span> Enterprise-Orchestrated Trust
      </h2>

      <div className="relative">
        {/* SVG for connecting arrows - now going straight down! */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          <defs>
            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" fill="#10b981" />
            </marker>
          </defs>

          {/* Straight vertical line through center */}
          <motion.line
            x1="50%"
            y1="15%"
            x2="50%"
            y2="85%"
            stroke="url(#greenGradient)"
            strokeWidth="4"
            strokeDasharray="10,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>

        {/* Flow Steps - Vertically Arranged */}
        <div className="relative space-y-6" style={{ zIndex: 2 }}>
          {/* Step 1: User + Okta */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <div className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg border-2 border-blue-400 p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <span className="text-3xl">👤</span>
                <div className="flex-1">
                  <div className="text-white font-bold text-sm">1. User Authentication</div>
                  <div className="text-blue-200 text-xs">SSO with Okta IdP</div>
                </div>
              </div>
            </div>
            <div className="text-2xl">↓</div>
          </motion.div>

          {/* Step 2: Request ID-JAG */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4"
          >
            <div className="text-2xl">↓</div>
            <div className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg border-2 border-orange-400 p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🔐</span>
                <div className="flex-1">
                  <div className="text-white font-bold text-sm">2. Token Exchange (Okta)</div>
                  <div className="text-orange-200 text-xs">ID Token → ID-JAG</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step 3: Enterprise Trust */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center"
          >
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl border-3 border-green-400 px-8 py-5 shadow-2xl max-w-md">
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <div className="text-green-200 font-bold text-base mb-1">ENTERPRISE TRUST</div>
                <div className="text-green-100 text-xs">Okta-to-Okta Managed Connection</div>
              </div>
            </div>
          </motion.div>

          {/* Step 4: NCAA Auth Exchange */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-4"
          >
            <div className="flex-1 bg-gradient-to-r from-orange-700 to-orange-800 rounded-lg border-2 border-orange-400 p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🔑</span>
                <div className="flex-1">
                  <div className="text-white font-bold text-sm">3. JWT Bearer Grant</div>
                  <div className="text-orange-200 text-xs">ID-JAG → Access Token (NCAA Auth)</div>
                </div>
              </div>
            </div>
            <div className="text-2xl">↓</div>
          </motion.div>

          {/* Step 5: Access Resource */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="flex items-center gap-4"
          >
            <div className="text-2xl">↓</div>
            <div className="flex-1 bg-gradient-to-r from-blue-700 to-blue-800 rounded-lg border-2 border-blue-400 p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🏈</span>
                <div className="flex-1">
                  <div className="text-white font-bold text-sm">4. Access NCAA Data</div>
                  <div className="text-blue-200 text-xs">Authorized API calls with Access Token</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="relative mt-8 bg-green-900/20 border-2 border-green-500/60 rounded-lg p-5"
      >
        <h3 className="text-sm font-bold text-green-200 mb-3 flex items-center gap-2">
          <span>✅</span>
          <span>Why This Works:</span>
        </h3>
        <div className="grid grid-cols-2 gap-3 text-xs text-green-100/90">
          <div className="flex items-start gap-2">
            <span className="text-green-400">•</span>
            <span><strong>Zero user consent</strong> - IdP handles everything</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400">•</span>
            <span><strong>Full visibility</strong> - IT sees all connections</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400">•</span>
            <span><strong>Centralized control</strong> - Revoke from one place</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400">•</span>
            <span><strong>Works for automation</strong> - No user interaction needed</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
