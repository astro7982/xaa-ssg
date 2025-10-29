/**
 * XAA Token Storage - Captures and persists tokens during the XAA flow
 * Stores in sessionStorage for post-hoc visualization
 */

export interface XAATokenData {
  // Step 1: User Authentication
  idToken?: string
  idTokenDecoded?: any
  userInfo?: {
    sub: string
    email?: string
    name?: string
  }

  // Step 2-3: Token Exchange at Okta (ID Token → ID-JAG)
  idJag?: string  // The JWT Assertion - HERO OF THE SHOW!
  idJagDecoded?: any
  oktaTokenExchangeTimestamp?: number

  // Step 4-6: Token Exchange at NCAA Stats Server Auth (ID-JAG → Access Token)
  accessToken?: string
  accessTokenDecoded?: any
  ncaaAuthTokenExchangeTimestamp?: number

  // Metadata
  flowStartTimestamp?: number
  flowCompleteTimestamp?: number
}

const STORAGE_KEY = 'xaa_token_data'

/**
 * Decode a JWT token (simple base64 decode, no validation)
 */
function decodeJWT(token: string): any {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null

    const payload = parts[1]
    // Handle URL-safe base64
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const decoded = JSON.parse(atob(base64))

    return {
      header: JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/'))),
      payload: decoded,
      signature: parts[2] // Keep as-is, we don't decode signatures
    }
  } catch (error) {
    console.error('Error decoding JWT:', error)
    return null
  }
}

/**
 * Redact sensitive information from tokens
 */
function redactToken(token: string): string {
  if (!token || token.length < 20) return token

  // Show first 15 and last 10 characters, redact the middle
  const start = token.substring(0, 15)
  const end = token.substring(token.length - 10)
  return `${start}...${end}`
}

/**
 * Initialize token storage when XAA flow starts
 */
export function initializeXAAFlow(idToken: string, userInfo: any): void {
  const data: XAATokenData = {
    idToken,
    idTokenDecoded: decodeJWT(idToken),
    userInfo: {
      sub: userInfo.sub || userInfo.id,
      email: userInfo.email,
      name: userInfo.name
    },
    flowStartTimestamp: Date.now()
  }

  if (typeof window !== 'undefined') {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }
}

/**
 * Store the ID-JAG (JWT Assertion) from Okta token exchange
 */
export function storeIDJag(idJag: string): void {
  if (typeof window === 'undefined') return

  const existing = getXAATokenData()
  const updated: XAATokenData = {
    ...existing,
    idJag,
    idJagDecoded: decodeJWT(idJag),
    oktaTokenExchangeTimestamp: Date.now()
  }

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

/**
 * Store the Access Token from NCAA Stats Server Auth token exchange
 */
export function storeAccessToken(accessToken: string): void {
  if (typeof window === 'undefined') return

  const existing = getXAATokenData()
  const updated: XAATokenData = {
    ...existing,
    accessToken,
    accessTokenDecoded: decodeJWT(accessToken),
    ncaaAuthTokenExchangeTimestamp: Date.now(),
    flowCompleteTimestamp: Date.now()
  }

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

/**
 * Get all stored XAA token data
 */
export function getXAATokenData(): XAATokenData {
  if (typeof window === 'undefined') return {}

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (!stored) return {}
    return JSON.parse(stored)
  } catch (error) {
    console.error('Error reading XAA token data:', error)
    return {}
  }
}

/**
 * Clear all XAA token data
 */
export function clearXAATokenData(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(STORAGE_KEY)
  }
}

/**
 * Check if XAA flow data is available
 */
export function hasXAAData(): boolean {
  const data = getXAATokenData()
  return !!(data.idToken && data.idJag && data.accessToken)
}

/**
 * Get redacted version of tokens for display
 */
export function getRedactedTokens(): {
  idToken?: string
  idJag?: string
  accessToken?: string
} {
  const data = getXAATokenData()
  return {
    idToken: data.idToken ? redactToken(data.idToken) : undefined,
    idJag: data.idJag ? redactToken(data.idJag) : undefined,
    accessToken: data.accessToken ? redactToken(data.accessToken) : undefined
  }
}

/**
 * Calculate timing information for the flow
 */
export function getFlowTiming(): {
  totalDuration?: number
  oktaExchangeDuration?: number
  ncaaExchangeDuration?: number
} {
  const data = getXAATokenData()

  if (!data.flowStartTimestamp) return {}

  const result: any = {}

  if (data.flowCompleteTimestamp) {
    result.totalDuration = data.flowCompleteTimestamp - data.flowStartTimestamp
  }

  if (data.oktaTokenExchangeTimestamp) {
    result.oktaExchangeDuration = data.oktaTokenExchangeTimestamp - data.flowStartTimestamp
  }

  if (data.ncaaAuthTokenExchangeTimestamp && data.oktaTokenExchangeTimestamp) {
    result.ncaaExchangeDuration = data.ncaaAuthTokenExchangeTimestamp - data.oktaTokenExchangeTimestamp
  }

  return result
}
