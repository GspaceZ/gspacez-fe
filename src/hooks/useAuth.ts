import callApi from '@/axios'
import { EncodedUrlResponse } from '@/types/response/auth/EncodedUrlResponse'
import { SignUpResponse } from '@/types/response/auth/SignUpResponse'

export const useAuth = () => {
  const getEncodedUrl = async (email: string, url: string) => {
    try {
      const response = await callApi<EncodedUrlResponse>('/identity/auth/encodeUrl', 'POST', {
        email,
        url
      })

      const data = response.data
      console.log(data)
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
      console.log(data)
      return data
    } catch (error) {
      console.log('Error signing up: ', error)
    }
  }

  return { getEncodedUrl, signUp }
}
