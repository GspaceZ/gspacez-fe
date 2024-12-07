import { IUser } from '@/types/user'

export type SignUpRequest = {
  email: string
  firstName: string
  lastName: string
  password: string
}

export type SignUpResponse = {
  code: number
  result: IUser
}

export type EncodedUrlRequest = {
  email: string
  url: string
}

export type EncodedUrlResponse = {
  code: number
  result: {
    urlEncoded: string
  }
}

export type SignInRequest = {
  email: string
  password: string
}

export type SignInResponse = {
  code: number
  result: {
    token: string
    refreshToken: string
  }
}

export type ForgotPasswordRequest = {
  email: string
}

export type ForgotPasswordResponse = {
  code: number
  result: {
    message: string
  }
}

export type VerifyOTPRequest = {
  email: string
  otp: string
}

export type VerifyOTPResponse = {
  code: number
  result: {
    message: string
  }
}

export type ResetPasswordRequest = {
  email: string
  newPassword: string
}

export type ResetPasswordResponse = {
  code: number
  result: {
    message: string
  }
}
