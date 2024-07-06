import { User } from '@/types/user'

export type SignUpResponse = {
  code: number
  result: User
}

export type EncodedUrlResponse = {
  code: number
  result: {
    urlEncoded: string
  }
}

export type SignInResponse = {
  code: number
  result: {
    token: string
    refreshToken: string
  }
}
