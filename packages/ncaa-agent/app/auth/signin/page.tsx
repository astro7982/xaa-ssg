'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function SignInContent() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const error = searchParams.get('error')

  const handleSignIn = () => {
    signIn('okta', { callbackUrl })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-md w-full mx-4">
        {/* NCAA Branding */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-4">
            <div className="text-6xl">🏈</div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">NCAA Agent</h1>
          <p className="text-slate-300">Powered by Cross-App Access (XAA)</p>
        </div>

        {/* Sign In Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-slate-300 mb-6">
            Sign in with your Okta account to access NCAA football stats and insights.
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-200 text-sm">
                {error === 'OAuthCallback' ? 'Error signing in. Please try again.' : 'Authentication error occurred.'}
              </p>
            </div>
          )}

          <button
            onClick={handleSignIn}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Sign in with Okta
            </span>
          </button>

          {/* XAA Info */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-sm text-slate-400 text-center">
              This demo uses Okta&apos;s Cross-App Access (XAA) to securely access NCAA data across applications.
            </p>
          </div>
        </div>

        {/* Tech Stack Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-slate-400">
            <span>Built with</span>
            <span className="px-2 py-1 bg-white/10 rounded">Next.js</span>
            <span className="px-2 py-1 bg-white/10 rounded">AI</span>
            <span className="px-2 py-1 bg-white/10 rounded">MCP</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-900"><div className="text-white">Loading...</div></div>}>
      <SignInContent />
    </Suspense>
  )
}
