/**
 * XAA (Cross-App Access) Token Exchange Client
 *
 * Based on:
 * - RFC 8693 (OAuth 2.0 Token Exchange)
 * - RFC 7523 (JSON Web Token Bearer Token Grant Type)
 * - Okta's Identity Assertion Authorization Grant
 *
 * Flow:
 * 1. requestIdJag: Exchange ID Token → ID-JAG (Identity Assertion JWT)
 * 2. exchangeIdJag: Exchange ID-JAG → Access Token for resource server
 */

export interface IdJagResponse {
  access_token: string
  issued_token_type: string
  token_type: string
  expires_in?: number
}

export interface AccessTokenResponse {
  access_token: string
  token_type: string
  expires_in?: number
  refresh_token?: string
  scope?: string
}

export interface XAAError {
  error: string
  error_description?: string
}

/**
 * Step 1: Request ID-JAG (Identity Assertion Authorization Grant)
 * Exchanges an ID token for an ID-JAG that can be used to request access tokens
 */
export async function requestIdJag(params: {
  tokenUrl: string
  idToken: string
  audience: string
  clientId: string
  clientSecret: string
  scopes?: string[]
}): Promise<IdJagResponse | XAAError> {
  const { tokenUrl, idToken, audience, clientId, clientSecret, scopes = [] } = params

  const body = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
    requested_token_type: 'urn:ietf:params:oauth:token-type:id-jag',
    subject_token: idToken,
    subject_token_type: 'urn:ietf:params:oauth:token-type:id_token',
    audience,
    scope: scopes.join(' '),
    client_id: clientId,
    client_secret: clientSecret,
  })

  console.log('🔐 XAA Step 1: Requesting ID-JAG from Okta...')
  console.log('   Token URL:', tokenUrl)
  console.log('   Audience:', audience)
  console.log('   Scopes:', scopes.join(' '))

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },
    body: body.toString(),
  })

  console.log('   Response status:', response.status, response.statusText)

  // Check if response has content
  const responseText = await response.text()
  console.log('   Response body:', responseText.substring(0, 200))

  if (!response.ok) {
    try {
      const data = JSON.parse(responseText)
      console.error('❌ ID-JAG request failed:', data)
      return data as XAAError
    } catch {
      console.error('❌ ID-JAG request failed (non-JSON response):', responseText)
      return { error: 'invalid_request', error_description: responseText || 'Unknown error' }
    }
  }

  const data = JSON.parse(responseText)
  console.log('✅ ID-JAG received successfully')
  return data as IdJagResponse
}

/**
 * Step 2: Exchange ID-JAG for Access Token
 * Uses the ID-JAG to obtain an access token for the target resource server
 */
export async function exchangeIdJag(params: {
  tokenUrl: string
  idJag: string
  clientId: string
  clientSecret?: string
  scopes?: string[]
}): Promise<AccessTokenResponse | XAAError> {
  const { tokenUrl, idJag, clientId, clientSecret, scopes = [] } = params

  const body = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: idJag,
    scope: scopes.join(' '),
    client_id: clientId,
  })

  if (clientSecret) {
    body.append('client_secret', clientSecret)
  }

  console.log('🔐 XAA Step 2: Exchanging ID-JAG for Access Token...')
  console.log('   Token URL:', tokenUrl)
  console.log('   Scopes:', scopes.join(' '))

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
    },
    body: body.toString(),
  })

  console.log('   Response status:', response.status, response.statusText)

  // Check if response has content
  const responseText = await response.text()
  console.log('   Response body:', responseText.substring(0, 200))

  if (!response.ok) {
    try {
      const data = JSON.parse(responseText)
      console.error('❌ Access token exchange failed:', data)
      return data as XAAError
    } catch {
      console.error('❌ Access token exchange failed (non-JSON response):', responseText)
      return { error: 'invalid_request', error_description: responseText || 'Unknown error' }
    }
  }

  const data = JSON.parse(responseText)
  console.log('✅ Access Token received successfully')
  return data as AccessTokenResponse
}

/**
 * Complete XAA Flow: ID Token → ID-JAG → Access Token
 * Convenience function that performs both steps
 */
export async function performXAAFlow(params: {
  tokenUrl: string
  idToken: string
  audience: string
  resourceTokenUrl: string
  requestingClientId: string
  requestingClientSecret: string
  resourceClientId: string
  resourceClientSecret?: string
  scopes?: string[]
}): Promise<{ accessToken: string; idJag: string; expiresIn?: number } | { error: string }> {
  const {
    tokenUrl,
    idToken,
    audience,
    resourceTokenUrl,
    requestingClientId,
    requestingClientSecret,
    resourceClientId,
    resourceClientSecret,
    scopes = [],
  } = params

  console.log('🚀 Starting complete XAA flow...')

  // Step 1: Get ID-JAG
  const idJagResult = await requestIdJag({
    tokenUrl,
    idToken,
    audience,
    clientId: requestingClientId,
    clientSecret: requestingClientSecret,
    scopes,
  })

  if ('error' in idJagResult) {
    return {
      error: `ID-JAG request failed: ${idJagResult.error} - ${idJagResult.error_description}`,
    }
  }

  // Step 2: Exchange ID-JAG for access token
  const accessTokenResult = await exchangeIdJag({
    tokenUrl: resourceTokenUrl,
    idJag: idJagResult.access_token,
    clientId: resourceClientId,
    clientSecret: resourceClientSecret,
    scopes,
  })

  if ('error' in accessTokenResult) {
    return {
      error: `Access token exchange failed: ${accessTokenResult.error} - ${accessTokenResult.error_description}`,
    }
  }

  console.log('🎉 XAA flow completed successfully!')

  return {
    accessToken: accessTokenResult.access_token,
    idJag: idJagResult.access_token,
    expiresIn: accessTokenResult.expires_in,
  }
}
