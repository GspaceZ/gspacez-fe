import callApi from '@/axios'
import { UploadAvatarResponse, UpdateProfileResponse } from '@/types/response/profile'
import axios from 'axios'

export const useProfile = () => {
  const uploadImage = async (file: File | null) => {
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string
    const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME as string

    if (file) {
      console.log('File to be uploaded:', file)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', uploadPreset)
      formData.append('api_key', apiKey)

      try {
        const response = await axios({
          url: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          method: 'POST',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        })

        const data = response.data
        console.log('Cloudinary response:', data)
        return data
      } catch (error) {
        console.error('Error uploading image:', error)
      }
    } else {
      console.log('No file selected')
    }
  }

  const uploadAvatar = async (avatarUrl: string, token: string) => {
    try {
      const response = await callApi<UploadAvatarResponse>(
        '/profile/users/avatar',
        'POST',
        {
          avatarUrl
        },
        token
      )

      const data = response.data
      return data
    } catch (error) {
      console.log('Error uploading avatar: ', error)
    }
  }

  const updateProfile = async (
    firstName: string,
    lastName: string,
    dob: Date,
    phone: string,
    country: string,
    city: string,
    address: string,
    token: string
  ) => {
    try {
      const response = await callApi<UpdateProfileResponse>(
        '/profile/users',
        'PUT',
        {
          firstName,
          lastName,
          dob,
          phone,
          country,
          city,
          address
        },
        token
      )

      const data = response.data
      return data
    } catch (error) {
      console.log('Error update profile: ', error)
    }
  }

  return { uploadImage, uploadAvatar, updateProfile }
}
