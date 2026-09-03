import { fileToDataUrl } from '@/utils/fileToDataUrl'
import { createId } from '@/utils/id'
import { getStorageBucket, getSupabaseClient } from './client'

export async function uploadImage(file: File, folder: string): Promise<string> {
  const bucket = getStorageBucket()
  const extension = file.name.split('.').pop() || 'jpg'
  const path = `${folder}/${createId()}.${extension}`

  const { error } = await getSupabaseClient().storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    contentType: file.type || undefined,
    upsert: false,
  })

  if (error) {
    throw error
  }

  const { data } = getSupabaseClient().storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export async function uploadLocalFallback(file: File): Promise<string> {
  return fileToDataUrl(file)
}
