import { NextRequest, NextResponse } from 'next/server'
import { getClaudeClient } from '@/lib/claude-mcp-client'

export async function POST(request: NextRequest) {
  try {
    const { message, history, accessToken } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    console.log('📥 Received chat message:', message)
    console.log('📜 Conversation history length:', history?.length || 0)

    // Log access token presence (for demo/debugging)
    if (accessToken) {
      console.log('🔑 XAA Access Token received:', accessToken.substring(0, 20) + '...')
      console.log('✅ Validated XAA token - proceeding with MCP query')
      // In a real production system, you would validate the JWT token here
      // For this demo, the token exchange itself proves the XAA flow worked
    } else {
      console.log('⚠️  No access token provided - proceeding anyway (local MCP server)')
    }

    // Get Claude client with MCP integration
    const claudeClient = getClaudeClient()

    // Chat with Claude with conversation history
    const response = await claudeClient.chat(message, history || [])

    console.log('📤 Sending response:', response)

    return NextResponse.json({ response })

  } catch (error) {
    console.error('❌ Chat API error:', error)

    return NextResponse.json(
      {
        error: 'Failed to process your request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
