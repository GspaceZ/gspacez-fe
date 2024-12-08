'use client'

import { mockMessages } from '@/mock/message'
import { IMessage } from '@/types/message'
import {
  Button,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip
} from '@nextui-org/react'
import { IconDots, IconMessageCircle, IconQuoteOff } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'

export const BoxContainer = () => {
  const [messages, setMessages] = useState<IMessage[]>()
  const [userId, setUserId] = useState<string>()

  const getRepliedMessage = (id: string | null) => {
    if (messages === undefined || !id) {
      return null
    }
    return messages.find((e) => e.id === id) || null
  }

  const messageActions = [
    {
      label: 'Hide',
      value: 'hide',
      icon: <IconQuoteOff size={16} />
    },
    {
      label: 'Reply',
      value: 'reply',
      icon: <IconMessageCircle size={16} />
    }
  ]

  useEffect(() => {
    setMessages(mockMessages)
    setUserId('1')
  }, [])

  const messageTimeTooltip = (date: Date) => {
    const today = new Date()

    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return format(date, 'hh:mm')
    }

    return format(date, 'dd/MM/yyyy, hh:mm')
  }

  return (
    <div className="flex grow flex-col-reverse gap-2 overflow-y-auto px-6 pb-4">
      {messages === undefined ? (
        <span>Start a conversation by send a message</span>
      ) : (
        <>
          {messages.map((message) => {
            const repliedMessage = getRepliedMessage(message.replyId)

            return (
              <div className="flex flex-col" key={message.id}>
                {repliedMessage && (
                  <div
                    className={`w-fit max-w-[20%] text-wrap rounded-t-xl border bg-gray-200 px-3 py-2 text-xs text-gray-800 ${userId && userId === message.from.id ? 'self-end' : 'self-start'}`}
                  >
                    {repliedMessage.content}
                  </div>
                )}
                <div
                  className={`group flex max-w-[60%] items-center gap-4 ${userId && userId === message.from.id ? 'flex-row-reverse self-end' : 'self-start'}`}
                >
                  <Tooltip
                    content={<span>{messageTimeTooltip(message.sentAt)}</span>}
                    placement="top"
                  >
                    <div
                      className={`w-fit text-wrap ${repliedMessage ? 'rounded-b-xl' : 'rounded-xl'} border border-gray-200 px-3 py-2 shadow ${userId && userId === message.from.id ? 'bg-gray-50' : ''}`}
                    >
                      <span>{message.content}</span>
                    </div>
                  </Tooltip>
                  <Popover>
                    <PopoverTrigger className="hidden group-hover:flex">
                      <Button isIconOnly variant="light" size="sm">
                        <IconDots size={16} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Listbox>
                        {messageActions.map((action) => {
                          return (
                            <ListboxItem key={action.value}>
                              <div className="flex items-center gap-2">
                                <span>{action.icon}</span>
                                <span>{action.label}</span>
                              </div>
                            </ListboxItem>
                          )
                        })}
                      </Listbox>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}
