'use client'

import { Avatar } from '@nextui-org/react'

interface AvatarContactProps {
  avatar: string
  firstName: string
  lastName: string
}

const AvatarContact = (props: AvatarContactProps) => {
  return (
    <div className="flex w-max cursor-pointer flex-col items-center gap-1">
      <Avatar src={props.avatar} size="md" />
      <span className="whitespace-nowrap text-xs">{props.firstName}</span>
    </div>
  )
}

export default AvatarContact
