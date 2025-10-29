import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { performXAAFlow } from '@/lib/xaa-client'

/**
 * XAA Token Exchange Endpoint
 *
 * This performs the Cross-App Access (XAA) token exchange flow:
 * 1. Takes the user's ID token from Agent0 (obtained via NextAuth)
 * 2. Exchanges it for an ID-JAG (Identity Assertion Grant) from Okta
 * 3. Uses the ID-JAG to request an access token for NCAA Stats Server (Todo0)
 *
 * This is the core XAA functionality that appears in Okta logs.
 *
 * Configuration:
 * - Agent0 (requesting app): OKTA_CLIENT_ID / OKTA_CLIENT_SECRET
 * - Todo0 (resource server): TODO0_ISSUER
 * - Scopes: openid, profile, plus any custom scopes for NCAA data
 */
export async function POST(request: NextRequest) {
  try {
    // Get the user's session (contains ID token from OAuth login)
    const session = await getServerSession(authOptions)

    if (!session || !session.idToken) {
      return NextResponse.json(
        { error: 'Not authenticated - please sign in first' },
        { status: 401 }
      )
    }

    console.log('🔐 Starting XAA token exchange flow...')
    console.log('   User:', session.user?.email)

    // Verify required environment variables
    if (!process.env.OKTA_ISSUER || !process.env.OKTA_CLIENT_ID || !process.env.OKTA_CLIENT_SECRET) {
      console.error('❌ Missing Agent0 (Okta) configuration')
      return NextResponse.json(
        { error: 'Server configuration error - missing Agent0 credentials' },
        { status: 500 }
      )
    }

    if (!process.env.TODO0_ISSUER || !process.env.TODO0_CLIENT_ID || !process.env.TODO0_CLIENT_SECRET) {
      console.error('❌ Missing Todo0 (NCAA Stats) configuration')
      return NextResponse.json(
        { error: 'Server configuration error - missing NCAA Stats server credentials' },
        { status: 500 }
      )
    }

    // Construct token URLs based on issuer
    // For local auth servers (localhost), use /token
    // For Okta servers, use /oauth2/v1/token or /v1/token
    const agentTokenUrl = process.env.OKTA_ISSUER.includes('localhost')
      ? `${process.env.OKTA_ISSUER}/token`
      : process.env.OKTA_ISSUER.includes('/oauth2/')
      ? `${process.env.OKTA_ISSUER}/v1/token`
      : `${process.env.OKTA_ISSUER}/oauth2/v1/token`

    const todoTokenUrl = process.env.TODO0_ISSUER.includes('localhost')
      ? `${process.env.TODO0_ISSUER}/token`
      : process.env.TODO0_ISSUER.includes('/oauth2/')
      ? `${process.env.TODO0_ISSUER}/v1/token`
      : `${process.env.TODO0_ISSUER}/oauth2/v1/token`

    console.log('🔗 Agent Token URL:', agentTokenUrl)
    console.log('🔗 Todo Token URL:', todoTokenUrl)

    // Perform the complete XAA flow
    const result = await performXAAFlow({
      // Step 1: Request ID-JAG from Agent0's authorization server
      tokenUrl: agentTokenUrl,
      idToken: session.idToken,
      audience: process.env.TODO0_OKTA_AUDIENCE || process.env.TODO0_ISSUER, // NCAA Stats Server Okta app identifier
      requestingClientId: process.env.OKTA_CLIENT_ID,
      requestingClientSecret: process.env.OKTA_CLIENT_SECRET,

      // Step 2: Exchange ID-JAG for access token at Todo0's authorization server
      resourceTokenUrl: todoTokenUrl,
      resourceClientId: process.env.TODO0_CLIENT_ID, // Todo0's client ID
      resourceClientSecret: process.env.TODO0_CLIENT_SECRET, // Todo0's client secret

      // Scopes for NCAA data access
      scopes: ['openid', 'profile'],
    })

    if ('error' in result) {
      console.error('❌ XAA flow failed:', result.error)
      return NextResponse.json(
        {
          error: 'XAA token exchange failed',
          details: result.error
        },
        { status: 500 }
      )
    }

    console.log('🎉 XAA flow completed successfully!')
    console.log('   Access token obtained for NCAA Stats API')

    return NextResponse.json({
      success: true,
      accessToken: result.accessToken,
      idJag: result.idJag,
      idToken: session.idToken, // Include for XAA Inspector
      expiresIn: result.expiresIn,
      userInfo: {
        sub: session.user?.id,
        email: session.user?.email,
        name: session.user?.name,
      },
    })

  } catch (error) {
    console.error('❌ XAA token exchange error:', error)
    return NextResponse.json(
      {
        error: 'Token exchange failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
