'use client'

import { Avatar } from '@nextui-org/react'

interface MessageHeaderProps {
  avatar?: string
}

const MessageHeader = (props: MessageHeaderProps) => {
  return (
    <div className="sticky top-0 z-10 flex min-h-[80px] border-b border-gray-200 bg-white shadow-md">
      <Avatar src={props.avatar} className="fixed left-0 ml-4 mt-5" />
      <span className="mx-auto my-auto text-3xl font-extrabold">Message</span>
    </div>
  )
}

export default MessageHeader
