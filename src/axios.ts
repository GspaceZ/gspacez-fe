import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export async function callApi<T>(
  url: string,
  method: AxiosRequestConfig['method'],
  data?: any,
  token?: string
): Promise<AxiosResponse<T>> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await axios({
      url: process.env.NEXT_PUBLIC_BACKEND_URL + url,
      method,
      data,
      headers
    })
    return response
  } catch (error) {
    throw error
  }
}

export default callApi
