import { fileToDataUrl } from '@/utils/fileToDataUrl'

export async function uploadImage(file: File): Promise<string> {
  return fileToDataUrl(file)
}
