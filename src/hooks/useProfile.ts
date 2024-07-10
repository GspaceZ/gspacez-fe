import callApi from '@/axios'
import { UploadAvatarResponse } from '@/types/response/profile'

export const useProfile = () => {
  const uploadImage = async (file: File | null) => {
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', uploadPreset)
      formData.append('api_key', apiKey)

      try {
        const response = await callApi<{ secure_url: string }>(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
          'POST',
          formData
        )
        const data = response.data
        return data
      } catch (error) {
        console.error('Error uploading image:', error)
      }
    } else {
      console.log('No file selected')
    }
  }

  const uploadAvatar = async (avatarUrl: string) => {
    try {
      const response = await callApi<UploadAvatarResponse>('profile/users/avatar', 'POST', {
        avatarUrl
      })

      const data = response.data
      return data
    } catch (error) {
      console.log('Error uploading avatar: ', error)
    }
  }

  return { uploadImage, uploadAvatar }
}
