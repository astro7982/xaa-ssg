'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import EnhancedXAADiagram from './EnhancedXAADiagram'
import { getXAATokenData, hasXAAData, getFlowTiming, type XAATokenData } from '@/lib/xaa-token-store'

/**
 * XAA Flow Inspector - Technical Details Visualizer
 * Shows the complete Cross-App Access flow with actual tokens
 */

export default function XAAInspector() {
  const router = useRouter()
  const [tokenData, setTokenData] = useState<XAATokenData>({})
  const [hasData, setHasData] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'id-jag': true // JWT Assertion expanded by default - it's the hero!
  })

  useEffect(() => {
    // Load token data from sessionStorage
    const data = getXAATokenData()
    setTokenData(data)
    setHasData(hasXAAData())
  }, [])

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const timing = getFlowTiming()

  // Helper to format milliseconds
  const formatMs = (ms?: number) => {
    if (!ms) return 'N/A'
    return `${ms}ms`
  }

  // Helper to redact middle of a token
  const redactToken = (token?: string) => {
    if (!token) return 'Not available'
    if (token.length < 20) return token
    const start = token.substring(0, 20)
    const end = token.substring(token.length - 15)
    return `${start}...${end}`
  }

  if (!hasData) {
    return (
      <div className="min-h-screen bg-field-green p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-scoreboard rounded-lg border-2 border-yard-line/30 p-8 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-2xl font-athletic text-white uppercase tracking-wide mb-4">
              No XAA Flow Data Available
            </h1>
            <p className="text-gray-300 mb-6">
              Please complete a query in the NCAA AI Chat Bot first to capture the token exchange flow.
            </p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-scoreboard-orange hover:bg-scoreboard-orange/80
                text-white font-athletic rounded-lg uppercase tracking-wide transition-all"
            >
              Return to Chat
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-field-green p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between bg-scoreboard px-6 py-4 rounded-lg border-2 border-yard-line/30">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🔍</div>
            <div>
              <h1 className="text-2xl font-athletic text-white uppercase tracking-wide">
                XAA Flow Inspector
              </h1>
              <p className="text-xs text-gray-400 font-scoreboard">
                Cross-App Access Technical Details
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

        {/* Timing Summary - only show if we have actual timing data */}
        {timing.totalDuration !== undefined && timing.totalDuration > 0 && (
          <div className="bg-scoreboard rounded-lg border-2 border-yard-line/30 p-4">
            <div className="flex items-center justify-around text-center">
              <div>
                <div className="text-2xl font-bold text-scoreboard-orange">
                  {formatMs(timing.totalDuration)}
                </div>
                <div className="text-xs text-gray-400">Total Flow Duration</div>
              </div>
              <div className="text-gray-600">|</div>
              <div>
                <div className="text-xl font-bold text-green-400">
                  {formatMs(timing.oktaExchangeDuration)}
                </div>
                <div className="text-xs text-gray-400">Okta Exchange</div>
              </div>
              <div className="text-gray-600">|</div>
              <div>
                <div className="text-xl font-bold text-green-400">
                  {formatMs(timing.ncaaExchangeDuration)}
                </div>
                <div className="text-xs text-gray-400">NCAA Auth Exchange</div>
              </div>
            </div>
          </div>
        )}

        {/* Architecture Diagram */}
        <EnhancedXAADiagram />

        {/* Why No User Consent Required - ENHANCED */}
        <div className="bg-green-900/30 rounded-lg border-2 border-green-500 p-6">
          <h2 className="text-lg font-athletic text-green-400 uppercase tracking-wide mb-4 flex items-center gap-2">
            <span>💡</span> Why No User Consent Required
          </h2>

          <div className="space-y-4 text-sm">
            {/* Traditional OAuth - Personal Data Scenario */}
            <div className="bg-red-900/30 border border-red-500/40 rounded-lg p-4">
              <div className="text-red-200 font-bold mb-2 flex items-center gap-2">
                <span>❌</span>
                <span>Traditional OAuth (Personal Data Scenario)</span>
              </div>
              <ul className="space-y-2 text-red-100 text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span><strong className="text-white">User owns the data</strong> (e.g., your Google Photos)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>User must grant permission: "Allow App X to access your photos?"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>Makes sense for personal data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span className="text-red-200 font-semibold">Problem: Doesn't work for enterprise/proprietary data!</span>
                </li>
              </ul>
            </div>

            {/* Cross-App Access - Enterprise Data Scenario */}
            <div className="bg-green-900/30 border border-green-500/40 rounded-lg p-4">
              <div className="text-green-200 font-bold mb-2 flex items-center gap-2">
                <span>✅</span>
                <span>Cross-App Access (Enterprise Data Scenario)</span>
              </div>
              <ul className="space-y-2 text-green-100 text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span><strong className="text-white">Company owns the data</strong> (NCAA stats are enterprise assets)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>IT pre-configures: "NCAA Chatbot is allowed to access Stats Server"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>User is <strong className="text-white">authenticated</strong> (proven identity), not <strong className="text-white">consenting</strong> (granting permission)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>The JWT Assertion (ID-JAG) is <strong className="text-white">cryptographically signed by Okta</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Stats Server trusts Okta's signature = <strong className="text-green-200">Enterprise-level trust</strong></span>
                </li>
              </ul>
            </div>

            {/* Key Difference Callout */}
            <div className="bg-gradient-to-r from-amber-900/40 to-amber-800/40 border-2 border-amber-500/60 rounded-lg p-4">
              <div className="text-amber-200 font-bold mb-2 text-center">🎯 Key Difference</div>
              <div className="space-y-1 text-xs text-amber-100">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-red-300 font-semibold">Personal Data</span>
                  <span className="text-amber-400">→</span>
                  <span className="text-white">User consent required</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-green-300 font-semibold">Enterprise Data</span>
                  <span className="text-amber-400">→</span>
                  <span className="text-white">IT policy enforced by IdP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 1: User Authentication */}
        <TokenSection
          title="Step 1: User Authentication"
          subtitle="User logs in via Okta → ID Token issued"
          icon="👤"
          expanded={expandedSections['step1']}
          onToggle={() => toggleSection('step1')}
        >
          <div className="space-y-3">
            <div>
              <div className="text-xs text-gray-400 mb-1">User Info:</div>
              <div className="bg-field-green rounded p-2 text-xs font-mono text-white">
                <div>Email: {tokenData.userInfo?.email || 'N/A'}</div>
                <div>Name: {tokenData.userInfo?.name || 'N/A'}</div>
                <div>Subject: {tokenData.userInfo?.sub || 'N/A'}</div>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">ID Token (from Okta):</div>
              <div className="bg-field-green rounded p-2 text-xs font-mono text-white break-all">
                {redactToken(tokenData.idToken)}
              </div>
            </div>
            {tokenData.idTokenDecoded && (
              <div>
                <div className="text-xs text-gray-400 mb-1">Decoded Payload:</div>
                <pre className="bg-field-green rounded p-2 text-xs text-white overflow-x-auto">
                  {JSON.stringify(tokenData.idTokenDecoded.payload, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </TokenSection>

        {/* Step 2-3: Token Exchange at Okta */}
        <TokenSection
          title="Step 2-3: Token Exchange at Okta"
          subtitle="ID Token → ID-JAG (JWT Assertion)"
          icon="🔄"
          expanded={expandedSections['step2']}
          onToggle={() => toggleSection('step2')}
        >
          <div className="space-y-3 text-sm text-gray-300">
            <div className="bg-field-green rounded p-3">
              <div className="font-bold text-white mb-2">Request to Okta:</div>
              <div className="space-y-1 text-xs font-mono">
                <div>POST {process.env.NEXT_PUBLIC_OKTA_ISSUER}/oauth2/v1/token</div>
                <div>grant_type: urn:ietf:params:oauth:grant-type:token-exchange</div>
                <div>requested_token_type: urn:ietf:params:oauth:token-type:id-jag</div>
                <div>subject_token: [ID Token]</div>
                <div>audience: {tokenData.idJagDecoded?.payload?.aud || 'http://localhost:5001'}</div>
              </div>
            </div>
            <div className="text-green-400">
              ✓ Okta validates the ID Token and issues an ID-JAG for the target audience
            </div>
          </div>
        </TokenSection>

        {/* ⭐ JWT ASSERTION - THE HERO! ⭐ */}
        <div className="bg-gradient-to-br from-yellow-900/40 via-scoreboard-orange/40 to-yellow-900/40
                        rounded-lg border-4 border-scoreboard-orange p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-4xl">⭐</div>
              <div>
                <h2 className="text-2xl font-athletic text-white uppercase tracking-wide">
                  JWT Assertion (ID-JAG)
                </h2>
                <p className="text-sm text-orange-200">
                  This token REPLACES user consent!
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleSection('id-jag')}
              className="text-white hover:text-orange-200 transition-colors"
            >
              {expandedSections['id-jag'] ? '▼' : '▶'}
            </button>
          </div>

          {expandedSections['id-jag'] && (
            <div className="space-y-4">
              {/* Raw Token */}
              <div>
                <div className="text-sm text-orange-200 mb-2 font-bold">🔐 ID-JAG Token:</div>
                <div className="bg-field-green rounded p-3 text-xs font-mono text-white break-all">
                  {redactToken(tokenData.idJag)}
                </div>
              </div>

              {/* Decoded JWT */}
              {tokenData.idJagDecoded && (
                <>
                  <div>
                    <div className="text-sm text-orange-200 mb-2 font-bold">📋 Header:</div>
                    <pre className="bg-field-green rounded p-3 text-xs text-white overflow-x-auto">
                      {JSON.stringify(tokenData.idJagDecoded.header, null, 2)}
                    </pre>
                  </div>

                  <div>
                    <div className="text-sm text-orange-200 mb-2 font-bold">📦 Payload (Claims):</div>
                    <pre className="bg-field-green rounded p-3 text-xs text-white overflow-x-auto">
                      {JSON.stringify(tokenData.idJagDecoded.payload, null, 2)}
                    </pre>
                  </div>

                  <div>
                    <div className="text-sm text-orange-200 mb-2 font-bold">🔏 Signature:</div>
                    <div className="bg-field-green rounded p-3 text-xs font-mono text-white break-all">
                      {tokenData.idJagDecoded.signature}
                    </div>
                    <div className="text-xs text-orange-300 mt-2">
                      Signature verified by NCAA Stats Server Auth using Okta's public key
                    </div>
                  </div>
                </>
              )}

              {/* Key Claims Explanation */}
              <div className="bg-yellow-900/30 rounded-lg border border-yellow-700 p-4">
                <div className="text-sm text-yellow-200 font-bold mb-2">🎯 Key Claims:</div>
                <div className="space-y-2 text-xs text-yellow-100">
                  <div>
                    <strong>iss (Issuer):</strong> {tokenData.idJagDecoded?.payload?.iss || 'N/A'}
                    <div className="text-yellow-300 ml-4">→ Identifies Okta as the trusted IdP</div>
                  </div>
                  <div>
                    <strong>sub (Subject):</strong> {tokenData.idJagDecoded?.payload?.sub || 'N/A'}
                    <div className="text-yellow-300 ml-4">→ User's unique identifier</div>
                  </div>
                  <div>
                    <strong>aud (Audience):</strong> {tokenData.idJagDecoded?.payload?.aud || 'N/A'}
                    <div className="text-yellow-300 ml-4">→ Target resource server (NCAA Stats Server Auth)</div>
                  </div>
                  <div>
                    <strong>exp (Expiration):</strong> {tokenData.idJagDecoded?.payload?.exp
                      ? new Date(tokenData.idJagDecoded.payload.exp * 1000).toLocaleString()
                      : 'N/A'}
                    <div className="text-yellow-300 ml-4">→ Token validity period</div>
                  </div>
                </div>
              </div>

              {/* Why This Works */}
              <div className="bg-green-900/30 rounded-lg border border-green-700 p-4">
                <div className="text-sm text-green-200 font-bold mb-2">✅ Why This Replaces User Consent:</div>
                <div className="space-y-2 text-xs text-green-100">
                  <div>
                    1. <strong>Enterprise Trust:</strong> NCAA Stats Server Auth trusts Okta (managed connection)
                  </div>
                  <div>
                    2. <strong>Cryptographic Signature:</strong> JWT signature proves authenticity (can't be forged)
                  </div>
                  <div>
                    3. <strong>Claims Verification:</strong> Resource app validates iss, aud, exp, and signature
                  </div>
                  <div>
                    4. <strong>No User Action Needed:</strong> Trust is established at the enterprise level, not per-user
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Step 4-6: Token Exchange at NCAA Stats Server Auth */}
        <TokenSection
          title="Step 4-6: Token Exchange at NCAA Stats Server Auth"
          subtitle="ID-JAG → Access Token"
          icon="🏈"
          expanded={expandedSections['step4']}
          onToggle={() => toggleSection('step4')}
        >
          <div className="space-y-3 text-sm text-gray-300">
            <div className="bg-field-green rounded p-3">
              <div className="font-bold text-white mb-2">Request to NCAA Stats Server Auth:</div>
              <div className="space-y-1 text-xs font-mono">
                <div>POST http://localhost:5001/token</div>
                <div>grant_type: urn:ietf:params:oauth:grant-type:jwt-bearer</div>
                <div>assertion: [ID-JAG]</div>
                <div>scope: openid profile</div>
              </div>
            </div>
            <div className="text-green-400">
              ✓ NCAA Stats Server Auth validates the ID-JAG signature and issues an Access Token
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Access Token:</div>
              <div className="bg-field-green rounded p-2 text-xs font-mono text-white break-all">
                {redactToken(tokenData.accessToken)}
              </div>
            </div>
            {tokenData.accessTokenDecoded && (
              <div>
                <div className="text-xs text-gray-400 mb-1">Decoded Payload:</div>
                <pre className="bg-field-green rounded p-2 text-xs text-white overflow-x-auto">
                  {JSON.stringify(tokenData.accessTokenDecoded.payload, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </TokenSection>

        {/* Step 7: API Call */}
        <TokenSection
          title="Step 7: Query NCAA Data"
          subtitle="Access Token used to call MCP Server"
          icon="📊"
          expanded={expandedSections['step7']}
          onToggle={() => toggleSection('step7')}
        >
          <div className="space-y-3 text-sm text-gray-300">
            <div className="bg-field-green rounded p-3">
              <div className="font-bold text-white mb-2">API Request:</div>
              <div className="space-y-1 text-xs font-mono">
                <div>POST /api/chat</div>
                <div>Authorization: Bearer [Access Token]</div>
                <div>→ Forwards to MCP Server with validated token</div>
              </div>
            </div>
            <div className="text-green-400">
              ✓ MCP Server validates the Access Token and returns NCAA statistics
            </div>
          </div>
        </TokenSection>

        {/* Key Takeaways */}
        <div className="bg-scoreboard rounded-lg border-2 border-scoreboard-orange p-6">
          <h2 className="text-xl font-athletic text-white uppercase tracking-wide mb-4 flex items-center gap-2">
            <span>🎯</span> Key Takeaways
          </h2>
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-start gap-2">
              <span className="text-green-400 flex-shrink-0">✓</span>
              <div>
                <strong className="text-white">No User Consent Screens:</strong> The JWT Assertion (ID-JAG)
                replaces traditional OAuth consent through cryptographic validation
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400 flex-shrink-0">✓</span>
              <div>
                <strong className="text-white">Enterprise-Level Trust:</strong> Authorization servers establish
                trust through managed connections, not per-user permissions
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400 flex-shrink-0">✓</span>
              <div>
                <strong className="text-white">Secure Token Exchange:</strong> Each token is cryptographically
                signed and validated, ensuring authenticity at every step
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400 flex-shrink-0">✓</span>
              <div>
                <strong className="text-white">Seamless User Experience:</strong> Users authenticate once and
                access multiple apps without repeated consent prompts
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

// Helper component for collapsible sections
interface TokenSectionProps {
  title: string
  subtitle: string
  icon: string
  expanded: boolean
  onToggle: () => void
  children: React.ReactNode
}

function TokenSection({ title, subtitle, icon, expanded, onToggle, children }: TokenSectionProps) {
  return (
    <div className="bg-scoreboard rounded-lg border-2 border-yard-line/30 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-field-green/20 transition-colors"
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
