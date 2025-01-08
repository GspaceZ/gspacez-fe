'use client'

import { usePost } from '@/hooks/usePost'
import { ReactPostRequestDto } from '@/types/dto/post'
import { POST_VARIANTS } from '@/utils/constant/variants'
import { RootState } from '@/utils/store'
import { Button, Popover, PopoverContent, PopoverTrigger, Tooltip } from '@nextui-org/react'
import {
  IconHeart,
  IconMoodAngry,
  IconMoodCry,
  IconMoodHappy,
  IconMoodSurprised,
  IconThumbUp
} from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { useSelector } from 'react-redux'

type ReactButton = {
  value: string
  label: string
  icon: ReactNode
  color: string
  bgColor: string
}

interface Props {
  variant: POST_VARIANTS | undefined
  id: string
}

export const PostReacts = ({ variant, id }: Props) => {
  const [react, setReact] = useState<ReactButton | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { reactPost } = usePost()
  const token = useSelector((state: RootState) => state.auth.token)

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

  const { mutate: mutateReact } = useMutation({
    mutationFn: ({ dto }: { dto: ReactPostRequestDto | never }) => reactPost(id, dto, token),
    onSuccess: (data) => {
      const currentReact = data.data.result.currentReact
      if (!currentReact) {
        setReact(null)
      } else {
        setReact(reacts[currentReact.reactType])
      }
    }
  })

  const handleClickReact = () => {
    if (react) {
      mutateReact({ dto: undefined as never })
    } else {
      mutateReact({ dto: { reactType: 'LIKE' } })
    }
  }

  const handleReact = (value: string) => {
    mutateReact({ dto: { reactType: value } })
  }

  const handleEnterMouse = (delay: number) => {
    setTimeout(() => {
      setIsOpen(true)
    }, delay)
  }

  const handleLeaveMouse = (delay: number) => {
    setTimeout(() => {
      setIsOpen(false)
    }, delay)
  }

  const ReactsBox = () => {
    return (
      <div
        className="flex items-center gap-2"
        onMouseLeave={() => handleLeaveMouse(0)}
        onMouseEnter={() => handleEnterMouse(0)}
      >
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
          // ignore deprecated onClick
          onClick={() => handleClickReact()}
          onMouseEnter={() => handleEnterMouse(0)}
          onMouseLeave={() => handleLeaveMouse(0)}
          variant="light"
          className={`mx-auto flex grow items-center gap-1 font-semibold text-gray-700 ${react ? react.color : ''} ${variant === POST_VARIANTS.feed ? 'md:ml-10' : ''}`}
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
