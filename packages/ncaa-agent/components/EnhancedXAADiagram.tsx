'use client'

import { motion } from 'framer-motion'

export default function EnhancedXAADiagram() {
  return (
    <div className="space-y-6">
      {/* 🏗️ ARCHITECTURE SECTION - NEW! */}
      <div className="bg-gradient-to-br from-blue-900/40 via-gray-900 to-blue-900/40 rounded-lg border-2 border-blue-500/40 p-6">
        <h2 className="text-lg font-athletic text-blue-200 uppercase tracking-wide mb-4 flex items-center gap-2">
          <span className="text-2xl">🏗️</span>
          <span>Architecture</span>
        </h2>

        <div className="space-y-4">
          {/* NCAA Chatbot - Requesting Application */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-blue-600/30 border-2 border-blue-400 rounded-lg p-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">🤖</span>
              <div>
                <div className="text-white font-bold text-base">NCAA Stats AI Chatbot</div>
                <div className="text-blue-200 text-sm">(Requesting Application - Agent0)</div>
                <div className="text-blue-300 text-xs mt-1">You are using this app</div>
              </div>
            </div>
          </motion.div>

          {/* Arrow + Label */}
          <div className="flex flex-col items-center">
            <div className="text-gray-400 text-sm font-semibold">↓ requests ID-JAG from ↓</div>
          </div>

          {/* Okta IdP */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-green-600/30 border-2 border-green-400 rounded-lg p-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔐</span>
              <div>
                <div className="text-white font-bold text-base">Okta Identity Provider</div>
                <div className="text-green-200 text-sm">Issues cryptographically signed ID-JAG</div>
                <div className="text-green-300 text-xs mt-1">Enterprise trust anchor</div>
              </div>
            </div>
          </motion.div>

          {/* Arrow + Label */}
          <div className="flex flex-col items-center">
            <div className="text-gray-400 text-sm font-semibold">↓ exchanges ID-JAG for access token ↓</div>
          </div>

          {/* Custom Authorization Server */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-purple-600/30 border-2 border-purple-400 rounded-lg p-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">🔑</span>
              <div>
                <div className="text-white font-bold text-base">Custom Authorization Server</div>
                <div className="text-purple-200 text-sm">(XAA-enabled, protects Resource Application)</div>
                <div className="text-purple-300 text-xs mt-1">Validates ID-JAG, issues access tokens</div>
              </div>
            </div>
          </motion.div>

          {/* Arrow + Label */}
          <div className="flex flex-col items-center">
            <div className="text-gray-400 text-sm font-semibold">↓ issues access tokens for ↓</div>
          </div>

          {/* NCAA Stats MCP Server - Protected Resource */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-orange-600/30 border-2 border-orange-400 rounded-lg p-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">📊</span>
              <div>
                <div className="text-white font-bold text-base">NCAA Stats MCP Server</div>
                <div className="text-orange-200 text-sm">(Protected Resource - MCP Protocol)</div>
                <div className="text-orange-300 text-xs mt-1">Protected by Custom Authorization Server</div>
              </div>
            </div>
          </motion.div>

          {/* Info Box */}
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3 mt-2">
            <div className="text-blue-200 text-xs">
              <strong className="text-white">Note:</strong> The MCP server is a separate Node.js process spawned by the chatbot.
              It validates access tokens from the Custom Authorization Server before returning NCAA data.
            </div>
          </div>
        </div>
      </div>

      {/* 🏢 ENTERPRISE DATA CONTEXT - NEW! */}
      <div className="bg-gradient-to-br from-amber-900/40 via-gray-900 to-amber-900/40 rounded-lg border-2 border-amber-500/40 p-6">
        <h2 className="text-lg font-athletic text-amber-200 uppercase tracking-wide mb-4 flex items-center gap-2">
          <span className="text-2xl">🏢</span>
          <span>Enterprise Data Access</span>
        </h2>

        <div className="space-y-4 text-sm">
          {/* What's Being Accessed */}
          <div>
            <div className="text-amber-200 font-bold mb-2">What's Being Accessed:</div>
            <ul className="space-y-1.5 text-amber-100">
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span>Proprietary NCAA statistics and analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span><strong className="text-white">COMPANY-OWNED data</strong> (not your personal data)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span>Managed by IT department</span>
              </li>
            </ul>
          </div>

          {/* Why No User Consent */}
          <div>
            <div className="text-amber-200 font-bold mb-2">Why No User Consent:</div>
            <ul className="space-y-1.5 text-amber-100">
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span>IT pre-configured this connection in Okta</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span>You're <strong className="text-white">authenticated</strong>, but IT controls access</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span>Your identity is verified, not your permission</span>
              </li>
            </ul>
          </div>

          {/* Your Role */}
          <div className="bg-amber-900/40 rounded-lg border border-amber-700 p-3 mt-3">
            <div className="text-amber-100 text-xs">
              <strong className="text-amber-200">Your Role:</strong> Authenticated employee accessing enterprise resources
            </div>
          </div>
        </div>
      </div>

      {/* XAA FLOW DIAGRAM */}
      <div className="bg-gradient-to-br from-scoreboard via-gray-900 to-scoreboard rounded-lg border-2 border-green-500/30 p-8 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-500 animate-pulse" />
        </div>

        <h2 className="relative text-xl font-athletic text-white uppercase tracking-wide mb-8 text-center">
          <span className="text-green-400">XAA Flow:</span> Enterprise-Orchestrated Trust
        </h2>

        <div className="relative">
          {/* SVG for connecting arrows */}
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
                    <div className="text-white font-bold text-sm">1. User Authentication to NCAA Chatbot</div>
                    <div className="text-blue-200 text-xs">SSO with Okta IdP → ID Token issued</div>
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
                    <div className="text-white font-bold text-sm">2. Chatbot Requests Access</div>
                    <div className="text-orange-200 text-xs">Token Exchange at Okta: ID Token → ID-JAG</div>
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
                  <div className="text-green-100 text-xs">IT-Managed Connection in Okta</div>
                  <div className="text-green-200 text-xs mt-1">No User Consent Required</div>
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
                    <div className="text-white font-bold text-sm">3. NCAA Stats Server Validates ID-JAG</div>
                    <div className="text-orange-200 text-xs">JWT Bearer Grant: ID-JAG → Access Token</div>
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
                    <div className="text-white font-bold text-sm">4. Chatbot Accesses NCAA Data</div>
                    <div className="text-blue-200 text-xs">MCP Server calls with validated Access Token</div>
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
              <span><strong>Works for AI agents</strong> - No user interaction needed</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 🔌 MCP PROTOCOL CALLOUT - NEW! */}
      <div className="bg-gradient-to-br from-purple-900/40 via-gray-900 to-purple-900/40 rounded-lg border-2 border-purple-500/40 p-6">
        <h2 className="text-lg font-athletic text-purple-200 uppercase tracking-wide mb-4 flex items-center gap-2">
          <span className="text-2xl">🔌</span>
          <span>Model Context Protocol (MCP)</span>
        </h2>

        <div className="space-y-3 text-sm text-purple-100">
          <p>
            The NCAA Chatbot communicates with the Stats Server using the <strong className="text-white">Model Context Protocol (MCP)</strong>.
          </p>
          <p>
            <strong className="text-purple-200">A Custom Authorization Server protects the MCP server</strong> by validating ID-JAG assertions from Okta and issuing access tokens.
            The MCP server requires these access tokens for all data requests—no token, no access.
          </p>
          <div className="bg-purple-900/50 border border-purple-600 rounded p-2 mt-2">
            <div className="text-purple-200 text-xs font-bold">🔒 Security Layer:</div>
            <div className="text-purple-100 text-xs mt-1">
              The Custom Authorization Server acts as a gatekeeper between the chatbot and MCP server, ensuring only authorized requests with valid XAA tokens reach the proprietary NCAA data.
            </div>
          </div>
          <div className="bg-purple-900/40 rounded-lg border border-purple-700 p-3 mt-3">
            <div className="text-purple-200 text-xs font-bold mb-2">How It Works:</div>
            <ul className="space-y-1 text-xs text-purple-100">
              <li className="flex items-start gap-2">
                <span>1.</span>
                <span>Chatbot receives your query: "Who's leading the Big Ten?"</span>
              </li>
              <li className="flex items-start gap-2">
                <span>2.</span>
                <span>Uses ID-JAG to request access token from <strong className="text-white">Custom Authorization Server</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span>3.</span>
                <span>Custom Authorization Server validates ID-JAG signature & issues access token</span>
              </li>
              <li className="flex items-start gap-2">
                <span>4.</span>
                <span>Chatbot uses access token to call NCAA Stats MCP Server (protected by authorization server)</span>
              </li>
              <li className="flex items-start gap-2">
                <span>5.</span>
                <span>MCP Server validates access token & returns data</span>
              </li>
              <li className="flex items-start gap-2">
                <span>6.</span>
                <span>Chatbot formats response for you</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
