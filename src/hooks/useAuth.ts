import callApi from '@/axios'
import { EncodedUrlResponse, SignInResponse, SignUpResponse } from '@/types/response/auth'

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

  return { getEncodedUrl, signUp, signIn }
}
