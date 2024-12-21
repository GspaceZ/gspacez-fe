import { MediaFile } from '@/types/props/common'

export const checkCloudFile = (file: MediaFile) => {
  if (file.file.name) {
    return false
  }

  return true
}
