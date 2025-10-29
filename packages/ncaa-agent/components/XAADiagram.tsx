'use client'

/**
 * XAA Architecture Diagram
 * Shows the trust relationship between two authorization servers
 */

export default function XAADiagram() {
  return (
    <div className="bg-scoreboard rounded-lg border-2 border-yard-line/30 p-6">
      <h2 className="text-xl font-athletic text-white uppercase tracking-wide mb-6 text-center">
        Two Authorization Servers, One Trust Relationship
      </h2>

      <div className="relative">
        {/* Triangle Container */}
        <div className="flex flex-col items-center space-y-8">

          {/* Top: Requesting App + Auth Server #1 */}
          <div className="flex items-center justify-center gap-8 w-full">
            {/* Requesting App */}
            <div className="flex-1 max-w-xs">
              <div className="bg-team-blue rounded-lg border-2 border-blue-400 p-4 text-center">
                <div className="text-3xl mb-2">🤖</div>
                <div className="text-white font-scoreboard text-sm mb-1">REQUESTING APP</div>
                <div className="text-blue-200 text-xs font-bold">NCAA AI Chat Bot</div>
                <div className="text-blue-300 text-xs mt-1 font-mono">
                  0oawt8k583lfobdg3697
                </div>
              </div>
            </div>

            {/* Auth Server #1 */}
            <div className="flex-1 max-w-xs">
              <div className="bg-scoreboard-orange/30 rounded-lg border-2 border-scoreboard-orange p-4 text-center">
                <div className="text-3xl mb-2">🔐</div>
                <div className="text-orange-200 font-scoreboard text-sm mb-1">AUTH SERVER #1</div>
                <div className="text-white text-xs font-bold">Okta</div>
                <div className="text-orange-300 text-xs mt-1">
                  integrator-9464660.okta.com
                </div>
                <div className="mt-2 text-xs text-orange-200">
                  Issues: ID Tokens, ID-JAG
                </div>
              </div>
            </div>
          </div>

          {/* Middle: Trust Relationship */}
          <div className="relative">
            {/* Trust Arrow */}
            <div className="flex items-center justify-center">
              <div className="bg-field-green border-2 border-green-500 rounded-lg px-6 py-3">
                <div className="text-center">
                  <div className="text-green-400 font-scoreboard text-sm mb-1">
                    ⚡ ENTERPRISE TRUST ⚡
                  </div>
                  <div className="text-green-200 text-xs">
                    Managed Connection (Okta-to-Okta)
                  </div>
                  <div className="text-green-300 text-xs mt-1">
                    JWT Cryptographic Validation
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: Resource App + Auth Server #2 */}
          <div className="flex items-center justify-center gap-8 w-full">
            {/* Resource App */}
            <div className="flex-1 max-w-xs">
              <div className="bg-team-blue/70 rounded-lg border-2 border-blue-400/70 p-4 text-center">
                <div className="text-3xl mb-2">🏈</div>
                <div className="text-white font-scoreboard text-sm mb-1">RESOURCE APP</div>
                <div className="text-blue-200 text-xs font-bold">NCAA Stats Server</div>
                <div className="text-blue-300 text-xs mt-1 font-mono">
                  0oawt8psi2PI2rjBA697
                </div>
              </div>
            </div>

            {/* Auth Server #2 */}
            <div className="flex-1 max-w-xs">
              <div className="bg-scoreboard-orange/30 rounded-lg border-2 border-scoreboard-orange p-4 text-center">
                <div className="text-3xl mb-2">🔐</div>
                <div className="text-orange-200 font-scoreboard text-sm mb-1">AUTH SERVER #2</div>
                <div className="text-white text-xs font-bold">NCAA Stats Server Auth</div>
                <div className="text-orange-300 text-xs mt-1">
                  localhost:5001
                </div>
                <div className="mt-2 text-xs text-orange-200">
                  Issues: Access Tokens
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connecting Lines - Visual Enhancement */}
        <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
          {/* Line from Requesting App to Auth #1 */}
          <line x1="25%" y1="15%" x2="75%" y2="15%"
            stroke="#60a5fa" strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />

          {/* Line from Auth #1 to Auth #2 (vertical through trust) */}
          <line x1="50%" y1="30%" x2="50%" y2="70%"
            stroke="#10b981" strokeWidth="3" opacity="0.5" />

          {/* Line from Auth #2 to Resource App */}
          <line x1="25%" y1="85%" x2="75%" y2="85%"
            stroke="#60a5fa" strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
        </svg>
      </div>

      {/* Key Points */}
      <div className="mt-6 space-y-2">
        <div className="text-xs text-gray-300">
          <span className="text-green-400">✓</span> <strong>Enterprise Trust:</strong> Auth servers trust each other via managed connection
        </div>
        <div className="text-xs text-gray-300">
          <span className="text-green-400">✓</span> <strong>No User Consent:</strong> JWT assertion replaces OAuth consent screens
        </div>
        <div className="text-xs text-gray-300">
          <span className="text-green-400">✓</span> <strong>Cryptographic Validation:</strong> Resource app validates JWT using IdP's public key
        </div>
      </div>
    </div>
  )
}
