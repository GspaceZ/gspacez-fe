'use client'

import { BotMessage } from '@/types/gzbot'
import { useEffect } from 'react'

interface Props {
  messages: BotMessage[]
}

export const BotMessagesBox = ({ messages }: Props) => {
  useEffect(() => {
    console.log(messages)
  }, [messages])
  return (
    <div className="mt-4 flex max-h-full w-full max-w-[600px] flex-col gap-2 overflow-y-scroll px-2">
      {messages.length !== 0 ? (
        messages.map((message, index) => {
          return (
            <div
              key={index}
              className={`${message.fromUser ? 'self-end bg-gray-50' : 'self-start bg-gray-900 text-white'} max-w-[60%] rounded-md px-2 py-3`}
            >
              {message.message}
            </div>
          )
        })
      ) : (
        <span className="text-center">Start a conversation...</span>
      )}
    </div>
  )
}
