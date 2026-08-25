import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient {
  if (client) {
    return client
  }

  const url = import.meta.env.VITE_SUPABASE_URL
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error('Supabase is not configured. Fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
  }

  client = createClient(url, anonKey)
  return client
}

export function getStorageBucket(): string {
  return import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || 'product-images'
}
