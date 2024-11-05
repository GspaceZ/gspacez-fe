'use client'

import { Avatar } from '@nextui-org/react'

interface AvatarContactProps {
  avatar: string
  firstName: string
  lastName: string
}

const AvatarContact = (props: AvatarContactProps) => {
  return (
    <div className="overflow flex cursor-pointer flex-col items-center gap-1 rounded-lg px-2 pt-2 hover:bg-gray-100">
      <Avatar src={props.avatar} size="md" />
      <span className="whitespace-nowrap pb-2 text-xs">{props.firstName}</span>
    </div>
  )
}

export default AvatarContact
