import callApi from '@/axios'
import {
  EncodedUrlResponse,
  SignInResponse,
  SignUpResponse,
  ForgotPasswordResponse,
  VerifyOTPResponse,
  ResetPasswordResponse,
  EncodedUrlRequest,
  SignUpRequest,
  SignInRequest,
  ForgotPasswordRequest,
  VerifyOTPRequest,
  ResetPasswordRequest
} from '@/types/response/auth'

export const useAuth = () => {
  const getEncodedUrl = async (email: string, url: string) => {
    const response = await callApi<EncodedUrlRequest, EncodedUrlResponse>(
      '/identity/auth/send-active',
      'POST',
      {
        email,
        url
      }
    )

    const data = response.data
    return data
  }

  const signUp = async (email: string, firstName: string, lastName: string, password: string) => {
    const response = await callApi<SignUpRequest, SignUpResponse>(
      '/identity/users/register',
      'POST',
      {
        email,
        firstName,
        lastName,
        password
      }
    )

    const data = response.data
    return data
  }

  const signIn = async (email: string, password: string) => {
    const response = await callApi<SignInRequest, SignInResponse>('/identity/auth/login', 'POST', {
      email,
      password
    })

    const data = response.data
    return data
  }

  const forgotPassword = async (email: string) => {
    const response = await callApi<ForgotPasswordRequest, ForgotPasswordResponse>(
      '/identity/auth/forget-password',
      'POST',
      {
        email
      }
    )

    const data = response.data
    return data
  }

  const verifyOTP = async (email: string, otp: string) => {
    const response = await callApi<VerifyOTPRequest, VerifyOTPResponse>(
      '/identity/auth/verify-otp',
      'POST',
      {
        email,
        otp
      }
    )

    const data = response.data
    return data
  }

  const resetPassword = async (email: string, newPassword: string) => {
    const response = await callApi<ResetPasswordRequest, ResetPasswordResponse>(
      '/identity/auth/reset-password',
      'POST',
      {
        email,
        newPassword
      }
    )

    const data = response.data
    return data
  }

  return { getEncodedUrl, signUp, signIn, forgotPassword, verifyOTP, resetPassword }
}
