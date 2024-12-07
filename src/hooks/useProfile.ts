import callApi from '@/axios'
import { fToast } from '@/helpers/toast'
import {
  UploadAvatarResponse,
  UpdateProfileResponse,
  GetProfileResponse,
  UpdateProfileRequest,
  UploadAvatarRequest
} from '@/types/response/profile'
import axios from 'axios'

export const useProfile = () => {
  const uploadImage = async (file: File | null) => {
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string
    const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME as string

    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', uploadPreset)
      formData.append('api_key', apiKey)

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
      return data
    } else {
      fToast('No file selected', 'danger')
    }
  }

  const uploadAvatar = async (avatarUrl: string, token: string) => {
    const response = await callApi<UploadAvatarRequest, UploadAvatarResponse>(
      '/profile/users/avatar',
      'POST',
      {
        avatarUrl
      },
      token
    )

    const data = response.data
    return data
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
    const response = await callApi<UpdateProfileRequest, UpdateProfileResponse>(
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
  }

  const getProfile = async (token: string) => {
    const response = await callApi<never, GetProfileResponse>(
      '/profile/users',
      'GET',
      {} as never,
      token
    )

    const data = response.data
    return data
  }

  return { uploadImage, uploadAvatar, updateProfile, getProfile }
}
