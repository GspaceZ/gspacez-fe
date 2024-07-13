import callApi from '@/axios'
import {
  EncodedUrlResponse,
  SignInResponse,
  SignUpResponse,
  ForgotPasswordResponse,
  VerifyOTPResponse,
  ResetPasswordResponse
} from '@/types/response/auth'

export const useAuth = () => {
  const getEncodedUrl = async (email: string, url: string) => {
    try {
      const response = await callApi<EncodedUrlResponse>('/identity/auth/encodeUrl', 'POST', {
        email,
        url
      })

      const data = response.data
      return data
    } catch (error) {
      console.log('Error encoding image: ', error)
    }
  }

  const signUp = async (email: string, firstName: string, lastName: string, password: string) => {
    try {
      const response = await callApi<SignUpResponse>('/identity/users/register', 'POST', {
        email,
        firstName,
        lastName,
        password
      })

      const data = response.data
      return data
    } catch (error) {
      console.log('Error signing up: ', error)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const response = await callApi<SignInResponse>('/identity/auth/login', 'POST', {
        email,
        password
      })

      const data = response.data
      return data
    } catch (error) {
      console.log('Error signing in: ', error)
    }
  }

  const forgotPassword = async (email: string) => {
    try {
      const response = await callApi<ForgotPasswordResponse>(
        '/identity/auth/forget-password',
        'POST',
        {
          email
        }
      )

      const data = response.data
      return data
    } catch (error) {
      console.log('Error forgot password: ', error)
    }
  }

  const verifyOTP = async (email: string, otp: string) => {
    try {
      const response = await callApi<VerifyOTPResponse>('/identity/auth/verify-otp', 'POST', {
        email,
        otp
      })

      const data = response.data
      return data
    } catch (error) {
      console.log('Error forgot password: ', error)
    }
  }

  const resetPassword = async (email: string, newPassword: string) => {
    try {
      const response = await callApi<ResetPasswordResponse>(
        '/identity/auth/reset-password',
        'POST',
        {
          email,
          newPassword
        }
      )

      const data = response.data
      return data
    } catch (error) {
      console.log('Error reset password: ', error)
    }
  }

  return { getEncodedUrl, signUp, signIn, forgotPassword, verifyOTP, resetPassword }
}
