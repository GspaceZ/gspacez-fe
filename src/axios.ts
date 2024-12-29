import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export async function callApi<D, T>(
  url: string,
  method: AxiosRequestConfig['method'],
  data?: D,
  token?: string,
  headerOptions?: Record<string, string>
): Promise<AxiosResponse<T>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...headerOptions
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await axios({
    url: process.env.NEXT_PUBLIC_BACKEND_URL + url,
    method,
    data,
    headers
  })
  return response
}

export default callApi
