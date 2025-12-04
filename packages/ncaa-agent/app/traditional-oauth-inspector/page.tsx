'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import TraditionalOAuthVisualizer from '@/components/TraditionalOAuthVisualizer'

/**
 * Traditional OAuth Inspector - Technical Details Visualizer
 * Shows the messy reality of Traditional OAuth with multiple consent screens and token sprawl
 */

export default function TraditionalOAuthInspector() {
  const router = useRouter()
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'consent1': true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Simulated OAuth token (would come from actual OAuth flow in production)
  const ncaaAccessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDEiLCJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIiwiYXVkIjoibmNhYS1zdGF0cy1hcGkiLCJleHAiOjE3MzIwNTcyMDAsInNjb3BlIjoicmVhZDp0ZWFtcyByZWFkOnN0YW5kaW5ncyByZWFkOmFuYWx5dGljcyJ9..."

  const ncaaTokenDecoded = {
    header: {
      alg: "RS256",
      typ: "JWT"
    },
    payload: {
      iss: "http://localhost:5001",
      sub: "user@example.com",
      aud: "ncaa-stats-api",
      exp: 1732057200,
      iat: 1732053600,
      scope: "read:teams read:standings read:analytics",
      client_id: "ncaa-ai-agent"
    }
  }

  return (
    <div className="min-h-screen bg-field-green p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between bg-scoreboard px-6 py-4 rounded-lg border-2 border-red-500/40">
          <div className="flex items-center gap-3">
            <div className="text-3xl">⚠️</div>
            <div>
              <h1 className="text-2xl font-athletic text-white uppercase tracking-wide">
                Traditional OAuth Inspector
              </h1>
              <p className="text-xs text-gray-400 font-scoreboard">
                Multiple Consent Screens • Token Sprawl • No IdP Visibility
              </p>
            </div>
          </div>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-field-green hover:bg-field-green/80
              text-white text-sm rounded-md border border-yard-line/30
              transition-all font-scoreboard"
          >
            ← Back to Chat
          </button>
        </div>

        {/* Architecture Section */}
        <div className="bg-gradient-to-br from-blue-900/40 via-blue-800/40 to-blue-900/40 rounded-lg border-4 border-blue-500 p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📐</span>
            <h2 className="text-xl font-bold text-blue-200 uppercase tracking-wide">Architecture</h2>
          </div>

          <div className="flex flex-col items-center space-y-3 max-w-xl mx-auto">
            {/* NCAA Chatbot */}
            <div className="bg-blue-600/30 border-2 border-blue-400 rounded-lg p-4 w-full">
              <div className="text-center">
                <div className="text-4xl mb-2">🤖</div>
                <div className="text-lg font-bold text-blue-200 mb-1">NCAA Stats AI Chatbot</div>
                <div className="text-sm text-blue-300 font-semibold">(Requesting Application)</div>
                <div className="text-xs text-gray-400 mt-2">Needs access to proprietary stats data</div>
              </div>
            </div>

            {/* Arrow + User Consent */}
            <div className="flex flex-col items-center">
              <div className="text-blue-300 text-3xl">↓</div>
              <div className="text-xs text-red-300 font-bold bg-red-900/50 px-3 py-1 rounded-full border-2 border-red-500/60">
                ❌ OAuth Flow (Manual Consent Screen Required)
              </div>
              <div className="text-blue-300 text-3xl">↓</div>
            </div>

            {/* Custom Authorization Server */}
            <div className="bg-purple-600/30 border-2 border-purple-400 rounded-lg p-4 w-full">
              <div className="text-center">
                <div className="text-4xl mb-2">🔑</div>
                <div className="text-lg font-bold text-purple-200 mb-1">Custom Authorization Server</div>
                <div className="text-sm text-purple-300 font-semibold">(Protects Resource Application)</div>
                <div className="text-xs text-gray-400 mt-2">Issues access token after user consent</div>
              </div>
            </div>

            {/* Arrow + MCP Protocol */}
            <div className="flex flex-col items-center">
              <div className="text-blue-300 text-3xl">↓</div>
              <div className="text-xs text-blue-200 font-semibold bg-blue-900/50 px-3 py-1 rounded-full border border-blue-500/40">
                Model Context Protocol (MCP) with access token
              </div>
              <div className="text-blue-300 text-3xl">↓</div>
            </div>

            {/* Stats Server */}
            <div className="bg-orange-600/30 border-2 border-orange-400 rounded-lg p-4 w-full">
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <div className="text-lg font-bold text-orange-200 mb-1">Proprietary Stats Server</div>
                <div className="text-sm text-orange-300 font-semibold">(Protected Resource - MCP Protocol)</div>
                <div className="text-xs text-gray-400 mt-2">Validates access token, returns data</div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-amber-900/30 border border-amber-500/40 rounded-md">
            <p className="text-xs text-amber-200 flex items-start gap-2">
              <span>💡</span>
              <span>
                <strong>Key Point:</strong> The stats data is <strong>owned by the enterprise</strong>, not individual users.
                IT should control access centrally via IdP, but Traditional OAuth bypasses this control with direct consent screens.
              </span>
            </p>
          </div>
        </div>

        {/* User Impact Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-red-900/30 border-2 border-red-500/40 rounded-lg p-4 text-center">
            <div className="text-4xl font-bold text-red-400">1+</div>
            <div className="text-xs text-red-200 mt-1">Consent Screen Per Integration</div>
            <div className="text-xs text-gray-400 mt-2">
              Imagine this repeated for every API integration...
            </div>
          </div>
          <div className="bg-yellow-900/30 border-2 border-yellow-500/40 rounded-lg p-4 text-center">
            <div className="text-4xl font-bold text-yellow-400">10-30s</div>
            <div className="text-xs text-yellow-200 mt-1">Delay Per Consent Screen</div>
            <div className="text-xs text-gray-400 mt-2">
              OAuth redirects + user interaction
            </div>
          </div>
          <div className="bg-red-900/30 border-2 border-red-500/40 rounded-lg p-4 text-center">
            <div className="text-4xl font-bold text-red-400">ZERO</div>
            <div className="text-xs text-red-200 mt-1">IT Visibility & Control</div>
            <div className="text-xs text-gray-400 mt-2">
              Tokens stored directly in apps
            </div>
          </div>
        </div>

        {/* Flow Visualization */}
        <TraditionalOAuthVisualizer />

        {/* The Problem at Scale */}
        <div className="bg-gradient-to-br from-red-900/40 via-red-800/40 to-red-900/40 rounded-lg border-4 border-red-500 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-4xl">🚨</div>
            <div>
              <h2 className="text-2xl font-athletic text-white uppercase tracking-wide">
                The Agent Automation Problem
              </h2>
              <p className="text-sm text-red-200">
                Why Traditional OAuth Fails for AI Agents
              </p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-gray-300">
            <div className="bg-red-900/30 rounded-lg border border-red-500/40 p-4">
              <div className="font-bold text-red-200 mb-2 flex items-center gap-2">
                <span>❌</span>
                <span>Scenario: AI Agent needs to analyze 50 NCAA teams</span>
              </div>
              <div className="space-y-2 text-xs text-gray-300 ml-6">
                <div className="flex items-start gap-2">
                  <span className="text-red-400">1.</span>
                  <span>Agent makes first API call → <strong className="text-red-300">User must manually approve consent screen</strong></span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-400">2.</span>
                  <span>Agent needs another integration → <strong className="text-red-300">Yet another consent screen required</strong></span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-400">3.</span>
                  <span>Scale this to 10+ integrations → <strong className="text-red-300">10+ separate consent screens!</strong></span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-400">4.</span>
                  <span>Agent runs in background/server → <strong className="text-red-300">IMPOSSIBLE - Can't show consent screens!</strong></span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-400">5.</span>
                  <span>IT wants to revoke access → <strong className="text-red-300">Must find and revoke tokens in each app individually</strong></span>
                </div>
              </div>
            </div>

            <div className="text-center text-red-200 font-bold text-lg py-2">
              🛑 Traditional OAuth was designed for USER-FACING apps, not AGENT AUTOMATION
            </div>
          </div>
        </div>

        {/* OAuth Access Token */}
        <TokenSection
          title="OAuth Access Token: NCAA Stats API"
          subtitle="Issued after consent screen - Stored outside IdP control"
          icon="🏈"
          color="red"
          expanded={expandedSections['consent1']}
          onToggle={() => toggleSection('consent1')}
        >
          <div className="space-y-4">
            {/* Consent Screen Details */}
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
              <div className="text-sm text-yellow-200 font-bold mb-2">📋 Consent Screen:</div>
              <div className="text-xs text-yellow-100 space-y-1">
                <div>• <strong>App:</strong> NCAA Stats API</div>
                <div>• <strong>Permissions Requested:</strong> Read team standings, Access game statistics, View playoff projections, Process analytical data</div>
                <div className="text-red-300 mt-2">🔓 <strong>No IdP Visibility:</strong> Your IT admin cannot see or revoke this authorization</div>
                <div className="text-purple-300 mt-2">🤖 <strong>Agent Problem:</strong> Every integration requires a consent screen - impossible for automated workflows</div>
              </div>
            </div>

            {/* Raw Token */}
            <div>
              <div className="text-sm text-red-200 mb-2 font-bold">🔐 Access Token (stored in app):</div>
              <div className="bg-field-green rounded p-3 text-xs font-mono text-white break-all">
                {ncaaAccessToken}
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Token stored in browser memory or app storage - vulnerable to XSS attacks
              </div>
            </div>

            {/* Decoded Token */}
            <div>
              <div className="text-sm text-red-200 mb-2 font-bold">📋 Decoded Header:</div>
              <pre className="bg-field-green rounded p-3 text-xs text-white overflow-x-auto">
                {JSON.stringify(ncaaTokenDecoded.header, null, 2)}
              </pre>
            </div>

            <div>
              <div className="text-sm text-red-200 mb-2 font-bold">📦 Decoded Payload:</div>
              <pre className="bg-field-green rounded p-3 text-xs text-white overflow-x-auto">
                {JSON.stringify(ncaaTokenDecoded.payload, null, 2)}
              </pre>
            </div>

            {/* Problems */}
            <div className="bg-red-900/30 rounded-lg border border-red-500/40 p-4">
              <div className="text-sm text-red-200 font-bold mb-2">⚠️ Problems with This Token:</div>
              <div className="space-y-2 text-xs text-red-100">
                <div className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span><strong>Direct Token Grant:</strong> Bypasses IdP completely after initial OAuth flow</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span><strong>No Centralized Revocation:</strong> IT cannot revoke this from Okta</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span><strong>Token Sprawl:</strong> Stored in the app, outside enterprise control</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span><strong>User Friction:</strong> Required user to manually click "Allow"</span>
                </div>
              </div>
            </div>
          </div>
        </TokenSection>

        {/* The Scaling Problem */}
        <div className="bg-gradient-to-br from-orange-900/40 via-red-800/40 to-orange-900/40 rounded-lg border-4 border-orange-500 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-4xl">📈</div>
            <div>
              <h2 className="text-2xl font-athletic text-white uppercase tracking-wide">
                The Scaling Problem
              </h2>
              <p className="text-sm text-orange-200">
                Multiply this by every API integration
              </p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-gray-300">
            <div className="bg-orange-900/30 rounded-lg border border-orange-500/40 p-4">
              <div className="text-sm text-orange-200 font-bold mb-3">🔢 The Reality:</div>
              <div className="space-y-2 text-xs text-orange-100">
                <div className="flex items-start gap-2">
                  <span className="text-orange-400">•</span>
                  <span><strong>1 Integration = 1 Consent Screen:</strong> We just saw this with NCAA Stats API</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-400">•</span>
                  <span><strong>10 Integrations = 10 Consent Screens:</strong> CRM, Analytics, HR, Finance, etc.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-400">•</span>
                  <span><strong>50 Integrations = 50 Consent Screens:</strong> Typical enterprise AI agent</span>
                </div>
                <div className="flex items-start gap-2 mt-3">
                  <span className="text-red-400 text-lg">⚠️</span>
                  <span className="text-red-300"><strong>Result:</strong> Agent automation becomes IMPOSSIBLE. Users spend hours clicking "Allow" buttons.</span>
                </div>
              </div>
            </div>

            <div className="text-center text-orange-200 font-bold text-lg py-2 bg-orange-900/20 rounded-lg border border-orange-500/40">
              🚫 Traditional OAuth doesn't scale for modern AI workflows
            </div>
          </div>
        </div>

        {/* Cross App Access Solution */}
        <div className="bg-gradient-to-br from-green-900/40 via-green-800/40 to-green-900/40 rounded-lg border-4 border-green-500 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-4xl">✅</div>
            <div>
              <h2 className="text-2xl font-athletic text-white uppercase tracking-wide">
                The Cross App Access Solution
              </h2>
              <p className="text-sm text-green-200">
                How XAA Solves All of These Problems
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-900/30 rounded-lg border border-green-500/40 p-4">
              <div className="text-sm text-green-200 font-bold mb-3 flex items-center gap-2">
                <span>🎯</span>
                <span>Zero User Consent</span>
              </div>
              <div className="text-xs text-green-100">
                JWT Assertion replaces consent screens through enterprise-level trust.
                Perfect for agent automation!
              </div>
            </div>

            <div className="bg-green-900/30 rounded-lg border border-green-500/40 p-4">
              <div className="text-sm text-green-200 font-bold mb-3 flex items-center gap-2">
                <span>👁️</span>
                <span>Full IdP Visibility</span>
              </div>
              <div className="text-xs text-green-100">
                All token exchanges flow through the IdP. IT sees everything in one dashboard.
              </div>
            </div>

            <div className="bg-green-900/30 rounded-lg border border-green-500/40 p-4">
              <div className="text-sm text-green-200 font-bold mb-3 flex items-center gap-2">
                <span>🔒</span>
                <span>Centralized Control</span>
              </div>
              <div className="text-xs text-green-100">
                Revoke access from one place (the IdP) and it's immediately revoked everywhere.
              </div>
            </div>

            <div className="bg-green-900/30 rounded-lg border border-green-500/40 p-4">
              <div className="text-sm text-green-200 font-bold mb-3 flex items-center gap-2">
                <span>⚡</span>
                <span>Instant Authorization</span>
              </div>
              <div className="text-xs text-green-100">
                No redirects, no waiting, no user interaction. Perfect for server-side agents.
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/xaa-inspector')}
              className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg
                shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <span>🔍</span>
              <span>View Cross App Access Flow</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

// Helper component for collapsible token sections
interface TokenSectionProps {
  title: string
  subtitle: string
  icon: string
  color: 'red' | 'orange' | 'yellow'
  expanded: boolean
  onToggle: () => void
  children: React.ReactNode
}

function TokenSection({ title, subtitle, icon, color, expanded, onToggle, children }: TokenSectionProps) {
  const borderColors = {
    red: 'border-red-500/40',
    orange: 'border-orange-500/40',
    yellow: 'border-yellow-500/40'
  }

  const hoverColors = {
    red: 'hover:bg-red-900/10',
    orange: 'hover:bg-orange-900/10',
    yellow: 'hover:bg-yellow-900/10'
  }

  return (
    <div className={`bg-scoreboard rounded-lg border-2 ${borderColors[color]} overflow-hidden`}>
      <button
        onClick={onToggle}
        className={`w-full px-6 py-4 flex items-center justify-between ${hoverColors[color]} transition-colors`}
      >
        <div className="flex items-center gap-3">
          <div className="text-2xl">{icon}</div>
          <div className="text-left">
            <div className="text-lg font-athletic text-white uppercase tracking-wide">
              {title}
            </div>
            <div className="text-xs text-gray-400">{subtitle}</div>
          </div>
        </div>
        <div className="text-white text-xl">
          {expanded ? '▼' : '▶'}
        </div>
      </button>
      {expanded && (
        <div className="px-6 py-4 border-t border-yard-line/20">
          {children}
        </div>
      )}
    </div>
  )
}
