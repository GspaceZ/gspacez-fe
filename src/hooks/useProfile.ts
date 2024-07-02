import callApi from '@/axios'

export const useProfile = () => {
  const uploadImage = async (file: File | null) => {
    console.log(process.env)
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

  return { uploadImage }
}
