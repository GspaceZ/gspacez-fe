import { IUser } from '@/types/user'

export type SignUpResponse = {
  code: number
  result: IUser
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

export type ForgotPasswordResponse = {
  code: number
  result: {
    message: string
  }
}

export type VerifyOTPResponse = {
  code: number
  result: {
    message: string
  }
}

export type ResetPasswordResponse = {
  code: number
  result: {
    message: string
  }
}
