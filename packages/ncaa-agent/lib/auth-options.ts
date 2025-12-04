import { NextAuthOptions } from 'next-auth'

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    accessToken?: string
    idToken?: string
    user: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    idToken?: string
    refreshToken?: string
    expiresAt?: number // Unix timestamp when access token expires
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: 'okta',
      name: 'Okta',
      type: 'oauth',
      wellKnown: `${process.env.OKTA_ISSUER}/.well-known/openid-configuration`,
      authorization: {
        params: {
          scope: 'openid profile email',
        },
      },
      clientId: process.env.OKTA_CLIENT_ID!,
      clientSecret: process.env.OKTA_CLIENT_SECRET!,
      client: {
        token_endpoint_auth_method: 'client_secret_post',
      },
      idToken: true,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name ?? profile.preferred_username,
          email: profile.email,
          image: null,
        }
      },
    },
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Save tokens on initial sign-in
      if (account) {
        token.accessToken = account.access_token
        token.idToken = account.id_token
        token.refreshToken = account.refresh_token
        // Store when the token expires (account.expires_at is in seconds)
        token.expiresAt = account.expires_at
      }

      // Check if token is expired (with 5 minute buffer)
      const now = Math.floor(Date.now() / 1000)
      const expiresAt = token.expiresAt as number
      const shouldRefresh = expiresAt && now >= expiresAt - 300

      // If token is expired and we have a refresh token, refresh it
      if (shouldRefresh && token.refreshToken) {
        try {
          console.log('🔄 Refreshing expired token...')
          const tokenUrl = process.env.OKTA_ISSUER?.includes('localhost')
            ? `${process.env.OKTA_ISSUER}/token`
            : process.env.OKTA_ISSUER?.includes('/oauth2/')
            ? `${process.env.OKTA_ISSUER}/v1/token`
            : `${process.env.OKTA_ISSUER}/oauth2/v1/token`

          const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              grant_type: 'refresh_token',
              refresh_token: token.refreshToken as string,
              client_id: process.env.OKTA_CLIENT_ID!,
              client_secret: process.env.OKTA_CLIENT_SECRET!,
            }),
          })

          if (response.ok) {
            const refreshedTokens = await response.json()
            console.log('✅ Token refreshed successfully')
            token.accessToken = refreshedTokens.access_token
            token.idToken = refreshedTokens.id_token
            token.expiresAt = Math.floor(Date.now() / 1000) + refreshedTokens.expires_in
            // Update refresh token if a new one was issued
            if (refreshedTokens.refresh_token) {
              token.refreshToken = refreshedTokens.refresh_token
            }
          } else {
            console.error('❌ Token refresh failed:', await response.text())
            // Token refresh failed - user needs to sign in again
            return { ...token, error: 'RefreshTokenError' }
          }
        } catch (error) {
          console.error('❌ Token refresh error:', error)
          return { ...token, error: 'RefreshTokenError' }
        }
      }

      return token
    },
    async session({ session, token }) {
      // Pass tokens to client session
      session.accessToken = token.accessToken as string
      session.idToken = token.idToken as string

      // If there's a refresh error, the user needs to sign in again
      if (token.error) {
        console.log('⚠️ Session has refresh error - user needs to re-authenticate')
      }

      return session
    },
  },
  events: {
    async signOut({ token }) {
      // Perform Okta logout to clear the Okta session
      if (token?.idToken) {
        const issuerUrl = process.env.OKTA_ISSUER
        const postLogoutRedirectUri = encodeURIComponent(`${process.env.NEXTAUTH_URL}/auth/signin`)
        const logoutUrl = `${issuerUrl}/v1/logout?id_token_hint=${token.idToken}&post_logout_redirect_uri=${postLogoutRedirectUri}`

        try {
          // This will redirect the browser to Okta logout
          // Note: In Next.js server-side events, we can't directly redirect
          // The client-side signOut will need to handle this
          console.log('🔓 Okta logout URL:', logoutUrl)
        } catch (error) {
          console.error('❌ Error during Okta logout:', error)
        }
      }
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development',
}
