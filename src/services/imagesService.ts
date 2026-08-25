import { isSupabaseConfigured } from './config'
import * as mockStorage from './mock/storage'
import * as supabaseStorage from './supabase/storage'

export async function uploadProductImage(file: File, folder = 'products'): Promise<string> {
  if (isSupabaseConfigured()) {
    return supabaseStorage.uploadImage(file, folder)
  }

  return mockStorage.uploadImage(file)
}

export { isSupabaseConfigured }
