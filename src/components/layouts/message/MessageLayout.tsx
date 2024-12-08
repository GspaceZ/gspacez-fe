'use client'

import { MessageLayoutProps } from '@/types/props/layouts'
import MessageHeader from './MessageHeader'

const MessageLayout = (props: MessageLayoutProps) => {
  return (
    <div className="flex h-screen w-screen flex-col gap-4 bg-gray-50">
      <MessageHeader avatar={props.profile?.avtUrl} />
      {props.children}
    </div>
  )
}

export default MessageLayout
