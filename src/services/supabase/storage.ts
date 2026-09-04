import { fileToDataUrl } from '@/utils/fileToDataUrl'
import { createId } from '@/utils/id'
import { getStorageBucket, getSupabaseClient } from './client'

const MAX_EDGE = 1280
const WEBP_QUALITY = 0.72

async function compressImageForUpload(file: File): Promise<File> {
  if (typeof createImageBitmap !== 'function' || typeof document === 'undefined') {
    return file
  }

  try {
    const bitmap = await createImageBitmap(file)
    let { width, height } = bitmap
    if (Math.max(width, height) > MAX_EDGE) {
      if (width >= height) {
        height = Math.round((height * MAX_EDGE) / width)
        width = MAX_EDGE
      } else {
        width = Math.round((width * MAX_EDGE) / height)
        height = MAX_EDGE
      }
    }

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')
    if (!context) {
      bitmap.close()
      return file
    }

    context.drawImage(bitmap, 0, 0, width, height)
    bitmap.close()

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/webp', WEBP_QUALITY)
    })
    if (!blob || blob.size >= file.size) {
      return file
    }

    const baseName = file.name.replace(/\.[^.]+$/, '') || 'image'
    return new File([blob], `${baseName}.webp`, { type: 'image/webp' })
  } catch {
    return file
  }
}

export async function uploadImage(file: File, folder: string): Promise<string> {
  const optimized = await compressImageForUpload(file)
  const bucket = getStorageBucket()
  const extension = optimized.name.split('.').pop() || 'jpg'
  const path = `${folder}/${createId()}.${extension}`

  const { error } = await getSupabaseClient().storage.from(bucket).upload(path, optimized, {
    cacheControl: '3600',
    contentType: optimized.type || undefined,
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
