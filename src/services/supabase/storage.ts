import { fileToDataUrl } from '@/utils/fileToDataUrl'
import { createId } from '@/utils/id'
import { getStorageBucket, getSupabaseClient } from './client'

type CompressPreset = {
  maxEdge: number
  quality: number
}

/** Gallery / product pages — aggressive enough for thumbs and detail grids. */
const DEFAULT_PRESET: CompressPreset = {
  maxEdge: 1280,
  quality: 0.72,
}

/**
 * Homepage hero + discount CTA banners show large and detailed art.
 * Keep more resolution and softer WebP so fine type/maps stay crisp,
 * without uploading full camera originals.
 */
const SLIDER_PRESET: CompressPreset = {
  maxEdge: 1920,
  quality: 0.86,
}

const SLIDER_FOLDERS = new Set(['hero-slides', 'cta-slides'])

function presetForFolder(folder: string): CompressPreset {
  return SLIDER_FOLDERS.has(folder) ? SLIDER_PRESET : DEFAULT_PRESET
}

async function compressImageForUpload(file: File, preset: CompressPreset): Promise<File> {
  if (typeof createImageBitmap !== 'function' || typeof document === 'undefined') {
    return file
  }

  try {
    const bitmap = await createImageBitmap(file)
    let { width, height } = bitmap
    const { maxEdge, quality } = preset

    if (Math.max(width, height) > maxEdge) {
      if (width >= height) {
        height = Math.round((height * maxEdge) / width)
        width = maxEdge
      } else {
        width = Math.round((width * maxEdge) / height)
        height = maxEdge
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
      canvas.toBlob(resolve, 'image/webp', quality)
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
  const optimized = await compressImageForUpload(file, presetForFolder(folder))
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
