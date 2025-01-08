'use client'

import { useNotification } from '@/hooks/useNotification'
import { RootState } from '@/utils/store'
import { IconLoader } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { NotiItem } from './NotiItem'
import { Button } from '@nextui-org/react'

export const Notifications = () => {
  const { getNotifications } = useNotification()
  const token = useSelector((state: RootState) => state.auth.token)
  const profileId = useSelector((state: RootState) => state.user.id)

  const { data: notificationsData, isLoading: isNotificationsLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotifications(profileId, token)
  })

  if (isNotificationsLoading) {
    return (
      <div className="flex w-[400px] items-center justify-center p-2">
        <span className="font-semibold">
          <IconLoader />
        </span>
      </div>
    )
  }

  return (
    <div className="w-[400px] p-2">
      <div className="flex items-center justify-between">
        <span className="font-semibold">Notification</span>
        <Button variant="light" size="sm">
          Mark all as read
        </Button>
      </div>
      {notificationsData ? (
        <div className="mt-2 flex h-[500px] flex-col items-center gap-1 overflow-y-auto">
          {notificationsData.data.result.map((notification) => (
            <div key={notification.id} className="flex w-full">
              <NotiItem item={notification} />
            </div>
          ))}
        </div>
      ) : (
        <span className="mt-2 text-center">No notifications now</span>
      )}
    </div>
  )
}
