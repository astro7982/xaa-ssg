'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { signOut, useSession } from 'next-auth/react'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
}

interface Props {
  onSendMessage: (message: string) => void
  messages: Message[]
  isLoading?: boolean
}

export default function ChatInterface({ onSendMessage, messages, isLoading = false }: Props) {
  const [input, setInput] = useState('')
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { data: session } = useSession()

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [messages, isLoading])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim())
      setInput('')
    }
  }

  const handleSignOut = async () => {
    // Clear NextAuth session first
    await signOut({ redirect: false })

    // Use Okta's simple logout endpoint that doesn't require pre-configured URIs
    const oktaIssuer = process.env.NEXT_PUBLIC_OKTA_ISSUER || 'https://integrator-9464660.okta.com'
    const returnTo = encodeURIComponent(`${window.location.origin}/auth/signin`)

    // Okta's /login/signout accepts a fromURI parameter for redirect
    window.location.href = `${oktaIssuer}/login/signout?fromURI=${returnTo}`
  }

  const exampleQuestions = [
    "Who's leading the Big Ten?",
    "Show me the top 10 teams",
    "Compare Oregon and Ohio State",
    "What are Penn State's playoff odds?"
  ]

  return (
    <div className="flex flex-col h-full bg-field-green rounded-lg border-2 border-yard-line/20 overflow-hidden">
      {/* Header */}
      <div className="bg-scoreboard px-6 py-4 border-b-4 border-scoreboard-orange">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🏈</div>
            <div>
              <h1 className="text-2xl font-athletic text-white uppercase tracking-wide">
                NCAA Stats AI
              </h1>
              <p className="text-xs text-gray-400 font-scoreboard">
                Secured with Cross-App Access
              </p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300
              text-sm rounded-md border border-red-600/40 hover:border-red-600/60
              transition-all font-scoreboard"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4 field-pattern">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏈</div>
            <h2 className="text-xl text-white font-athletic mb-2">
              Ask me anything about NCAA Football!
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              I have access to live NCAA standings, rankings, and projections
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-2xl mx-auto">
              {exampleQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => onSendMessage(q)}
                  className="px-4 py-2 bg-scoreboard hover:bg-scoreboard-orange/20
                    text-white text-sm rounded-md border border-gray-700
                    hover:border-scoreboard-orange transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  max-w-[80%] rounded-lg px-4 py-3
                  ${message.role === 'user'
                    ? 'bg-team-blue text-white'
                    : message.role === 'system'
                    ? 'bg-scoreboard-orange/20 text-orange-200 text-sm border border-scoreboard-orange/40'
                    : 'bg-scoreboard text-white'
                  }
                `}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2 text-xs text-gray-400">
                    <span>🤖 AI Assistant</span>
                    <span className="text-green-400">● Connected via XAA</span>
                  </div>
                )}
                <div className="whitespace-pre-wrap">{message.content}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-scoreboard text-white rounded-lg px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-scoreboard-orange rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-scoreboard-orange rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-scoreboard-orange rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-sm text-gray-400">AI is thinking...</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 bg-scoreboard border-t-2 border-yard-line/20">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about NCAA teams, standings, rankings..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-field-green text-white rounded-lg
              border-2 border-yard-line/30 focus:border-scoreboard-orange
              focus:outline-none placeholder-gray-400 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-6 py-3 bg-scoreboard-orange hover:bg-scoreboard-orange/80
              text-white font-athletic rounded-lg uppercase tracking-wide
              disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
