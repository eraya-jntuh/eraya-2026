import { createServerClient } from '@/lib/supabase/server'

export interface IdempotencyRecord {
  id: string
  idempotency_key: string
  request_hash: string // Hash of request body to detect duplicate requests
  response_status: number
  response_body: string // JSON stringified response
  created_at: string
  expires_at: string
}

/**
 * Check if an idempotency key already exists and return the cached response
 */
export async function getIdempotencyRecord(idempotencyKey: string) {
  const supabase = await createServerClient()
  const { data, error } = await supabase
    .from('idempotency_keys')
    .select('*')
    .eq('idempotency_key', idempotencyKey)
    .gt('expires_at', new Date().toISOString()) // Only return non-expired records
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
    return { data: null, error }
  }

  return { data: data as IdempotencyRecord | null, error: null }
}

/**
 * Store an idempotency record with response
 */
export async function storeIdempotencyRecord(
  idempotencyKey: string,
  requestHash: string,
  responseStatus: number,
  responseBody: string,
  ttlSeconds: number = 86400 // Default 24 hours
) {
  const supabase = await createServerClient()
  const expiresAt = new Date(Date.now() + ttlSeconds * 1000).toISOString()

  const { data, error } = await supabase
    .from('idempotency_keys')
    .insert({
      idempotency_key: idempotencyKey,
      request_hash: requestHash,
      response_status: responseStatus,
      response_body: responseBody,
      expires_at: expiresAt,
    })
    .select()
    .single()

  return { data: data as IdempotencyRecord | null, error }
}

/**
 * Create a hash of the request body for duplicate detection
 */
export function hashRequest(body: Record<string, any>): string {
  // Simple hash function - in production, consider using crypto.createHash
  const str = JSON.stringify(body)
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36)
}

