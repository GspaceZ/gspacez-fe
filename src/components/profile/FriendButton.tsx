'use client'

import { Button } from '@nextui-org/react'
import { IconCheck } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

interface FriendButtonProps {
  status: string
}

const FriendButton = (props: FriendButtonProps) => {
  const tFriend = useTranslations('profile.friend')

  return (
    <>
      {props.status === 'No friend' ? (
        <Button size="sm" color="primary" className="font-bold">
          {tFriend('add')}
        </Button>
      ) : props.status === 'Sent' ? (
        <Button size="sm" className="font-bold">
          {tFriend('sent')}
        </Button>
      ) : props.status === 'Pending' ? (
        <Button size="sm" color="primary" className="font-bold">
          {tFriend('pending')}
        </Button>
      ) : (
        <Button
          size="sm"
          variant="bordered"
          color="primary"
          className="flex items-center gap-2 font-bold"
        >
          <IconCheck size="14" />
          <span>{tFriend('friend')}</span>
        </Button>
      )}
    </>
  )
}

export default FriendButton
