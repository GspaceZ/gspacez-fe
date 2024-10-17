'use client'

import { Button } from '@nextui-org/react'
import { IconCheck } from '@tabler/icons-react'

interface FriendButtonProps {
  status: string
}

const FriendButton = (props: FriendButtonProps) => {
  return (
    <>
      {props.status === 'No friend' ? (
        <Button size="sm" color="primary" className="font-bold">
          Add friend
        </Button>
      ) : props.status === 'Sent' ? (
        <Button size="sm" className="font-bold">
          Sent request
        </Button>
      ) : props.status === 'Pending' ? (
        <Button size="sm" color="primary" className="font-bold">
          Accept request
        </Button>
      ) : (
        <Button
          size="sm"
          variant="bordered"
          color="primary"
          className="flex items-center gap-2 font-bold"
        >
          <IconCheck size="14" />
          <span>Friend</span>
        </Button>
      )}
    </>
  )
}

export default FriendButton
