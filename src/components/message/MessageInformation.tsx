'use client'

import { mockUser } from '@/mock/message'
import { IMessageBaseInfo } from '@/types/message'
import { Avatar, Button, Listbox, ListboxItem } from '@nextui-org/react'
import { IconBan, IconUser } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

interface Props {
  show: boolean
}

export const MessageInformation = ({ show }: Props) => {
  const [messageUser, setMessageUser] = useState<IMessageBaseInfo>()

  useEffect(() => {
    setMessageUser(mockUser)
  }, [])

  const userActions = [
    {
      label: 'Profile',
      value: 'profile',
      icon: <IconUser size={20} />
    },
    {
      label: 'Block',
      value: 'block',
      icon: <IconBan size={20} />
    }
  ]

  const messageActions = [
    {
      label: 'Change nickname',
      value: 'change-nickname'
    },
    {
      label: 'Media',
      value: 'media'
    },
    {
      label: 'Notification',
      value: 'notification'
    },
    {
      label: 'Report',
      value: 'report'
    }
  ]

  return (
    <div
      className={`flex h-full ${show ? 'w-[360px]' : 'w-0'} flex-col items-center rounded-lg border-l border-t border-gray-200 bg-white transition-all`}
    >
      {show && (
        <>
          <div className="mt-10 flex items-center gap-4">
            <Avatar src={messageUser?.avatar} alt="Avatar" className="border border-gray-200" />
            <span className="text-lg">{messageUser?.name}</span>
          </div>
          <div className="mt-4 flex items-center gap-8">
            {userActions.map((action) => (
              <div key={action.value} className="flex flex-col items-center">
                <div>
                  <Button variant="light" isIconOnly>
                    {action.icon}
                  </Button>
                </div>
                <span>{action.label}</span>
              </div>
            ))}
          </div>
          <Listbox className="mt-6">
            {messageActions.map((action) => {
              return (
                <ListboxItem key={action.value} className="border-t border-gray-100">
                  <div className="flex h-10 w-full items-center">
                    <span className="ml-4">{action.label}</span>
                  </div>
                </ListboxItem>
              )
            })}
          </Listbox>
        </>
      )}
    </div>
  )
}
