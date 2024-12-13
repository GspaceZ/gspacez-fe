import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

/**
 * @deprecated should not be used in future, just to maintain and compare to new method
 */
export async function callApi<D, T>(
  url: string,
  method: AxiosRequestConfig['method'],
  data?: D,
  token?: string
): Promise<AxiosResponse<T>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
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
