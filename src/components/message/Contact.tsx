'use client'

import { IContact } from '@/types/message'
import { Avatar } from '@nextui-org/react'

const Contact = (props: IContact) => {
  return (
    <div className="flex cursor-pointer items-center gap-3 border-b border-gray-200 py-4 pl-4 hover:bg-gray-50">
      <Avatar src={props.avatar} size="md" />
      <div className="flex flex-col justify-center gap-0.5">
        <span className="leading-6">{props.name}</span>
        <span className="text-sm leading-4 text-gray-500">
          {props.ownLastMsg && 'You: '}
          {props.lastMsg}
        </span>
      </div>
    </div>
  )
}

export default Contact
