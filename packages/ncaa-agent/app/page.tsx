'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import ChatInterface from '@/components/ChatInterface'
import XAAFlowVisualizer from '@/components/XAAFlowVisualizer'
import ConsentSimulator from '@/components/ConsentSimulator'
import SessionMetrics from '@/components/SessionMetrics'
import DemoModeToggle from '@/components/DemoModeToggle'
import SessionTimeoutWarning from '@/components/SessionTimeoutWarning'
import { useDemoMode } from '@/lib/demo-mode-context'
import { useSessionTimeout } from '@/lib/use-session-timeout'
import { initializeXAAFlow, storeIDJag, storeAccessToken } from '@/lib/xaa-token-store'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
}

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { mode, setOnModeChange } = useDemoMode()
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [xaaStep, setXaaStep] = useState(0)
  const [isXAAActive, setIsXAAActive] = useState(false)
  const [showConsentSimulator, setShowConsentSimulator] = useState(false)
  const [pendingMessage, setPendingMessage] = useState<string | null>(null)
  const [cachedTokens, setCachedTokens] = useState<{
    idToken?: string
    idJag?: string
    accessToken?: string
    cachedAt?: number
  } | null>(null)

  // Session timeout - auto sign out after 30 minutes of inactivity
  const { showWarning, dismissWarning, remainingMinutes } = useSessionTimeout({
    timeoutMinutes: 30,
    warningMinutes: 2,
  })

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  // When user is authenticated, show Step 1 (User Login) as complete
  useEffect(() => {
    if (status === 'authenticated' && session) {
      setXaaStep(1)
      setIsXAAActive(true)
    }
  }, [status, session])

  // Register callback to clear chat when mode changes
  useEffect(() => {
    setOnModeChange(() => {
      // Clear messages
      setMessages([])
      // Clear cached tokens
      setCachedTokens(null)
      // Reset XAA flow
      setXaaStep(1)
      setIsXAAActive(true)
      // Clear any pending messages
      setPendingMessage(null)
    })
  }, [setOnModeChange])

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="text-6xl mb-4">🏈</div>
          <div className="text-white text-xl">Loading NCAA Agent...</div>
        </div>
      </div>
    )
  }

  // Don't render main content until authenticated
  if (!session) {
    return null
  }

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now()
    }
    setMessages(prev => [...prev, userMessage])

    // In Traditional OAuth mode, show consent screens first
    if (mode === 'traditional') {
      setPendingMessage(content)
      setShowConsentSimulator(true)
      return
    }

    // XAA mode: proceed directly
    await executeQuery(content)
  }

  const handleConsentComplete = async () => {
    setShowConsentSimulator(false)
    if (pendingMessage) {
      await executeQuery(pendingMessage)
      setPendingMessage(null)
    }
  }

  const handleConsentCancel = () => {
    setShowConsentSimulator(false)
    setPendingMessage(null)
    // Add a system message showing the authorization was cancelled
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'system',
      content: '❌ Authorization cancelled by user. Query was not executed.',
      timestamp: Date.now()
    }])
  }

  const executeQuery = async (content: string) => {
    setIsLoading(true)
    setIsXAAActive(true)

    // Real XAA flow with actual Okta calls
    try {
      let xaaData: any

      // Check if we have a cached token (INSECURE - for demo purposes)
      if (cachedTokens?.accessToken && cachedTokens.cachedAt) {
        const tokenAge = Math.floor((Date.now() - cachedTokens.cachedAt) / 1000)

        // Reuse cached token (showing security risk)
        setXaaStep(1)
        await delay(200)
        setXaaStep(2)
        await delay(200)
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'system',
          content: `⚠️ Reusing cached token from browser memory (${tokenAge}s ago)`,
          timestamp: Date.now()
        }])
        setXaaStep(5)
        await delay(300)

        xaaData = { accessToken: cachedTokens.accessToken }
      } else {
        // Step 1: User already authenticated (session exists)
        setXaaStep(1)
        await delay(300)

        // Step 2: ID Token available from session
        setXaaStep(2)
        await delay(300)

        // Step 3: Request ID-JAG from Okta (REAL API CALL)
        setXaaStep(3)
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'system',
          content: mode === 'xaa'
            ? '🔐 Performing Cross-App Access...'
            : '🔑 Requesting OAuth access token...',
          timestamp: Date.now()
        }])

        // Call the real XAA exchange endpoint
        const xaaResponse = await fetch('/api/xaa/exchange', {
          method: 'POST',
        })

        if (!xaaResponse.ok) {
          const errorData = await xaaResponse.json()
          throw new Error(errorData.details || 'XAA exchange failed')
        }

        xaaData = await xaaResponse.json()
        console.log('✅ XAA exchange successful:', xaaData)

        // Cache tokens (INSECURE - stored in browser memory!)
        setCachedTokens({
          idToken: session?.idToken,
          idJag: xaaData.idJag,
          accessToken: xaaData.accessToken,
          cachedAt: Date.now()
        })

        // Store tokens for XAA Inspector
        if (xaaData.idToken && xaaData.userInfo) {
          initializeXAAFlow(xaaData.idToken, xaaData.userInfo)
        }
        if (xaaData.idJag) {
          storeIDJag(xaaData.idJag)
        }
        if (xaaData.accessToken) {
          storeAccessToken(xaaData.accessToken)
        }
      }

      // Step 4: ID-JAG received
      setXaaStep(4)
      await delay(400)

      // Step 5: Access Token received
      setXaaStep(5)
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'system',
        content: mode === 'xaa'
          ? '✅ Enterprise access approved - connecting to NCAA Stats Server...'
          : '✅ OAuth token received - connecting to NCAA Stats Server...',
        timestamp: Date.now()
      }])
      await delay(400)

      // Step 6: Query MCP with access token
      setXaaStep(6)
      await delay(600)

      // Step 7: Data being returned
      setXaaStep(7)

      // Call the API with conversation history (excluding system messages) and access token
      const conversationHistory = messages
        .filter(m => m.role !== 'system')
        .map(m => ({ role: m.role, content: m.content }))

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          history: conversationHistory,
          accessToken: xaaData.accessToken // Pass the XAA access token
        })
      })

      const data = await response.json()

      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'I apologize, but I encountered an issue accessing the NCAA data. Please try again.',
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, assistantMessage])

    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now()
      }])
    } finally {
      setIsLoading(false)
      // Keep XAA flow active when using cached tokens
      if (!cachedTokens?.accessToken) {
        // Only reset on first request (when caching starts)
        setTimeout(() => {
          setIsXAAActive(true)
          setXaaStep(7) // Keep at final step to show completion
        }, 2000)
      } else {
        // Keep showing cached state
        setIsXAAActive(true)
        setXaaStep(7)
      }
    }
  }

  return (
    <main className="h-screen overflow-hidden p-6">
      {/* Session Timeout Warning */}
      <SessionTimeoutWarning
        show={showWarning}
        remainingMinutes={remainingMinutes}
        onDismiss={dismissWarning}
      />

      {/* Consent Simulator Overlay (Traditional OAuth mode only) */}
      {showConsentSimulator && (
        <ConsentSimulator
          onComplete={handleConsentComplete}
          onCancel={handleConsentCancel}
        />
      )}

      <div className="max-w-7xl mx-auto h-full flex flex-col gap-4">
        {/* Demo Mode Toggle - Top */}
        <div className="flex-shrink-0">
          <DemoModeToggle />
        </div>

        {/* Main Content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
          {/* Left Side: Conditional based on mode */}
          <div className="lg:col-span-1 h-full overflow-hidden">
            {mode === 'xaa' ? (
              <XAAFlowVisualizer
                currentStep={xaaStep}
                isActive={isXAAActive}
                cachedTokens={cachedTokens}
              />
            ) : (
              <SessionMetrics />
            )}
          </div>

          {/* Right Side: Chat Interface */}
          <div className="lg:col-span-2 h-full overflow-hidden">
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
