'use client'

import { NotificationItem } from '@/types/dto/notification'
import { NotiComment } from './NotiComment'
import { FActionIcon } from '../common/FActionIcon'
import { IconDots } from '@tabler/icons-react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { useMemo } from 'react'

interface Props {
  item: NotificationItem
}

export const NotiItem = ({ item }: Props) => {
  const notiContents: Record<string, string> = {
    COMMENT: 'commented on your post'
  }

  const menuItems = useMemo(
    () => [
      {
        label: item.isRead ? 'Mark as unread' : 'Mark as read',
        action: undefined
      },
      {
        label: 'Delete notification',
        action: undefined
      }
    ],
    [item.isRead]
  )

  return (
    <div
      className={`flex grow cursor-pointer items-center gap-1 rounded-md border border-gray-200 p-2 hover:bg-gray-50 ${item.isRead ? '' : 'bg-gray-100'}`}
    >
      <div className="grow">
        <span className="text-wrap text-sm font-semibold">
          {item.entity.sender.profileName} {notiContents[item.type]}
        </span>
        <NotiComment noti={item.entity} />
      </div>
      <div className="">
        <Dropdown>
          <DropdownTrigger>
            <FActionIcon icon={<IconDots size={12} />} />
          </DropdownTrigger>
          <DropdownMenu>
            {menuItems.map((item) => (
              <DropdownItem key={item.label} onPress={item.action}>
                {item.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  )
}
