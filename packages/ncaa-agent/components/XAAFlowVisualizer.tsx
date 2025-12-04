'use client'

import { motion } from 'framer-motion'

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
  return (
    <div className="bg-green-900/20 border-2 border-green-500/40 rounded-lg p-3 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">✅</span>
        <h2 className="text-sm font-bold text-green-200 uppercase tracking-wide">
          Cross-App Access Benefits
        </h2>
      </div>

      {/* Architecture Section */}
      <div className="bg-blue-900/30 border border-blue-500/40 rounded-lg p-2 mb-2">
        <div className="text-xs font-bold text-blue-200 mb-2 uppercase tracking-wide">
          📐 Architecture
        </div>
        <div className="space-y-2">
          <div className="bg-blue-600/30 border border-blue-400/40 rounded-md p-2">
            <div className="text-xs font-semibold text-blue-300">🤖 NCAA Stats AI Chatbot</div>
            <div className="text-xs text-blue-200">(Requesting Application - Agent0)</div>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-gray-400 text-xs">↓ requests ID-JAG from ↓</div>
          </div>

          <div className="bg-okta-blue/30 border-2 border-okta-blue rounded-md p-2">
            <div className="text-xs font-bold text-white">🔐 Okta Identity Provider</div>
            <div className="text-xs text-gray-300">Issues cryptographically signed ID-JAG</div>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-gray-400 text-xs">↓ exchanges ID-JAG ↓</div>
          </div>

          <div className="bg-purple-600/30 border border-purple-400/40 rounded-md p-2">
            <div className="text-xs font-semibold text-purple-300">🔑 Custom Authorization Server</div>
            <div className="text-xs text-purple-200">(Protects Resource Application)</div>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-gray-400 text-xs">↓ via MCP Protocol ↓</div>
          </div>

          <div className="bg-orange-600/30 border border-orange-400/40 rounded-md p-2">
            <div className="text-xs font-semibold text-orange-300">📊 NCAA Stats MCP Server</div>
            <div className="text-xs text-orange-200">(Protected Resource)</div>
          </div>
        </div>
      </div>

      {/* Why No Consent Screens */}
      <div className="bg-purple-900/20 border border-purple-500/30 rounded-md p-2 mb-2">
        <div className="flex items-start gap-2">
          <span className="text-sm">💡</span>
          <div>
            <h3 className="text-xs font-bold text-purple-200 mb-1">Why No Consent Screens?</h3>
            <p className="text-xs text-purple-200/90">
              IT pre-configures trusted connections in Okta. The IdP validates enterprise policies
              and issues signed ID-JAGs—no user intervention needed.
            </p>
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="bg-green-900/20 border border-green-500/30 rounded-md p-2 mb-2">
        <div className="text-xs font-bold text-green-200 mb-2">🎯 Key Benefits</div>
        <div className="space-y-1.5">
          <div className="flex items-start gap-2 text-xs text-green-200/90">
            <span className="text-green-400">✓</span>
            <span><strong>Zero User Friction:</strong> No consent screens</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-green-200/90">
            <span className="text-green-400">✓</span>
            <span><strong>Full IdP Visibility:</strong> All access via Okta</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-green-200/90">
            <span className="text-green-400">✓</span>
            <span><strong>Centralized Control:</strong> IT manages everything</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-green-200/90">
            <span className="text-green-400">✓</span>
            <span><strong>AI Agent Ready:</strong> Works in background</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-green-200/90">
            <span className="text-green-400">✓</span>
            <span><strong>Scales Infinitely:</strong> 50 apps = 0 popups</span>
          </div>
        </div>
      </div>

      {/* The Difference */}
      <div className="bg-gray-900/40 border border-gray-500/30 rounded-md p-2">
        <div className="text-xs font-bold text-gray-200 mb-1.5">⚖️ The Difference</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <div className="font-semibold text-red-300 mb-1">Traditional OAuth</div>
            <div className="space-y-0.5 text-red-200/80">
              <div>❌ Manual consent screens</div>
              <div>❌ No IdP visibility</div>
              <div>❌ Token sprawl</div>
              <div>❌ Breaks for AI agents</div>
            </div>
          </div>
          <div>
            <div className="font-semibold text-green-300 mb-1">Cross-App Access</div>
            <div className="space-y-0.5 text-green-200/80">
              <div>✅ Zero consent screens</div>
              <div>✅ Full IdP control</div>
              <div>✅ Centralized tokens</div>
              <div>✅ Perfect for AI agents</div>
            </div>
          </div>
        </div>
      </div>

      {isActive && (
        <div className="mt-2 pt-2 border-t border-green-500/30">
          <div className="flex items-center gap-2 text-xs text-green-300">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Active - Secured by Okta Cross-App Access</span>
          </div>
        </div>
      )}
    </div>
  )
}
