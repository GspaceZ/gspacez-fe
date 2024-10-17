'use client'

import { MessageLayoutProps } from '@/types/props/layouts'
import MessageHeader from './MessageHeader'

const MessageLayout = (props: MessageLayoutProps) => {
  return (
    <div className="h-screen w-screen">
      <MessageHeader avatar={props.profile?.avtUrl} />
      {props.children}
    </div>
  )
}

export default MessageLayout
