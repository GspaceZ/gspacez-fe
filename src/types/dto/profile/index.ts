import { IProfile } from '@/types/profile'

export type UploadAvatarRequest = {
  avatarUrl: string
}

export type UploadAvatarResponse = {
  code: number
  result: IProfile
}

export type UpdateProfileRequest = {
  firstName: string
  lastName: string
  dob: Date
  phone: string
  country: string
  city: string
  address: string
}

export type UpdateProfileResponse = {
  code: number
  result: IProfile
}

export type GetProfileResponse = {
  code: number
  result: IProfile
}
