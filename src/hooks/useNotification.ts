import callApi from '@/axios'
import { GetNotificationsResponseDto } from '@/types/dto/notification'

export const useNotification = () => {
  const getNotifications = async (profileId: string, token: string) => {
    return await callApi<never, GetNotificationsResponseDto>(
      `/notification/get-notification/${profileId}`,
      'GET',
      undefined,
      token
    )
  }

  return { getNotifications }
}
