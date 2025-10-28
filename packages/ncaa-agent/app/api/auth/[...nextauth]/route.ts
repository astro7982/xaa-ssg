import NextAuth, { NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'

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
    async jwt({ token, account, profile }) {
      // Save tokens on initial sign-in
      if (account) {
        token.accessToken = account.access_token
        token.idToken = account.id_token
        token.refreshToken = account.refresh_token
      }
      return token
    },
    async session({ session, token }) {
      // Pass tokens to client session
      session.accessToken = token.accessToken as string
      session.idToken = token.idToken as string
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

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
