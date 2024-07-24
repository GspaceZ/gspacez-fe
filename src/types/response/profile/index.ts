import { IProfile } from '@/types/profile'

export type UploadAvatarResponse = {
  code: number
  result: IProfile
}

export type UpdateProfileResponse = {
  code: number
  result: IProfile
}

export type GetProfileResponse = {
  code: number
  result: IProfile
}
