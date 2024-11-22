'use client'

import { Button } from '@nextui-org/react'

interface FollowButtonProps {
  status: string
}

export const FollowButton = (props: FollowButtonProps) => {
  const buttonVariant = () => {
    switch (props.status) {
      case 'followed':
        return 'default'
      default:
        return 'primary'
    }
  }

  return (
    <Button color={buttonVariant()} className="font-bold capitalize" size="sm">
      {props.status}
    </Button>
  )
}
