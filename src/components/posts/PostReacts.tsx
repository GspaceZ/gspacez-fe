'use client'

import { POST_VARIANTS } from '@/utils/constant/variants'
import { Button, Popover, PopoverContent, PopoverTrigger, Tooltip } from '@nextui-org/react'
import {
  IconHeart,
  IconMoodAngry,
  IconMoodCry,
  IconMoodHappy,
  IconMoodSurprised,
  IconThumbUp
} from '@tabler/icons-react'
import { ReactNode, useState } from 'react'

type ReactButton = {
  value: string
  label: string
  icon: ReactNode
  color: string
  bgColor: string
}

interface Props {
  variant: POST_VARIANTS | undefined
}

export const PostReacts = ({ variant }: Props) => {
  const [react, setReact] = useState<ReactButton | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const reacts: Record<string, ReactButton> = {
    LIKE: {
      value: 'LIKE',
      label: 'Like',
      icon: <IconThumbUp />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 hover:!bg-blue-100'
    },
    LOVE: {
      value: 'LOVE',
      label: 'Love',
      icon: <IconHeart />,
      color: 'text-red-400',
      bgColor: 'bg-red-50 hover:!bg-red-100'
    },
    HAHA: {
      value: 'HAHA',
      label: 'Haha',
      icon: <IconMoodHappy />,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 hover:!bg-yellow-100'
    },
    WOW: {
      value: 'WOW',
      label: 'Wow',
      icon: <IconMoodSurprised />,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 hover:!bg-yellow-100'
    },
    SAD: {
      value: 'SAD',
      label: 'Sad',
      icon: <IconMoodCry />,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 hover:!bg-yellow-100'
    },
    ANGRY: {
      value: 'ANGRY',
      label: 'Angry',
      icon: <IconMoodAngry />,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 hover:!bg-orange-100'
    }
  }

  const handleClickReact = () => {
    if (react) {
      setReact(null)
    } else {
      setReact(reacts.LIKE)
    }
  }

  const handleReact = (value: string) => {
    setReact(reacts[value])
  }

  const handleEnterMouse = () => {
    setTimeout(() => {
      setIsOpen(true)
    }, 300)
  }

  const handleLeaveMouse = () => {
    setTimeout(() => {
      setIsOpen(false)
    }, 300)
  }

  const ReactsBox = () => {
    return (
      <div className="flex items-center gap-2" onMouseLeave={handleLeaveMouse}>
        {Object.values(reacts).map((reactItem) => (
          <Tooltip content={reactItem.label} key={reactItem.value} placement="bottom">
            <Button
              isIconOnly
              variant="light"
              onPress={() => handleReact(reactItem.value)}
              className={`${reactItem.bgColor} ${reactItem.color}`}
            >
              {reactItem.icon}
            </Button>
          </Tooltip>
        ))}
      </div>
    )
  }

  return (
    <Popover placement="top" isOpen={isOpen}>
      <PopoverTrigger>
        <Button
          onPress={handleClickReact}
          onMouseEnter={handleEnterMouse}
          onMouseLeave={handleLeaveMouse}
          variant="light"
          className={`flex items-center gap-1 font-semibold text-gray-700 ${react ? react.color : ''} ${variant === POST_VARIANTS.feed ? 'md:ml-10' : ''}`}
          startContent={react ? react.icon : <IconThumbUp />}
        >
          {react ? react.label : 'Like'}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <ReactsBox />
      </PopoverContent>
    </Popover>
  )
}
