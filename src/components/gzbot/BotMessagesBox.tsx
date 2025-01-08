'use client'

import { BotMessage } from '@/types/gzbot'

interface Props {
  messages: BotMessage[]
}

export const BotMessagesBox = ({ messages }: Props) => {
  return (
    <div className="mt-4 flex max-h-full w-full max-w-[600px] grow flex-col gap-2 overflow-y-scroll rounded-md bg-white px-2">
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
        <div className="flex grow items-end justify-center pb-6">
          <span className="mb-4 text-center">Start a conversation...</span>
        </div>
      )}
    </div>
  )
}
