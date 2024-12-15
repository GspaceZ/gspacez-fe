'use client'

import { MessageLayoutProps } from '@/types/props/layouts'
import MessageHeader from '../message/MessageHeader'
import { AuthGuard } from './AuthGuard'

const MessageLayout = (props: MessageLayoutProps) => {
  return (
    <AuthGuard>
      <div className="flex h-screen w-screen flex-col gap-4 bg-gray-50">
        <MessageHeader avatar={props.profile?.avtUrl} />
        {props.children}
      </div>
    </AuthGuard>
  )
}

export default MessageLayout
