import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export async function callApi<T>(
  url: string,
  method: AxiosRequestConfig['method'],
  data?: any,
  token?: string
): Promise<AxiosResponse<T>> {
  try {
    console.log(token)
    const response = await axios({
      url: process.env.NEXT_PUBLIC_BACKEND_URL + url,
      method,
      data,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

export default callApi