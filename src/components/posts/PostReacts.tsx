'use client'

import { Button, Popover, PopoverContent, PopoverTrigger, Tooltip } from '@nextui-org/react'
import { IconThumbUp } from '@tabler/icons-react'

interface Props {
  setReact: (react: string) => void
}

export const PostReacts = ({ setReact }: Props) => {
  const reacts = [
    {
      value: 'LIKE',
      label: 'Like',
      icon: <IconThumbUp />
    },
    {
      value: 'Ha',
      label: 'Like',
      icon: <IconThumbUp />
    },
    {
      value: 'LIKE',
      label: 'Like',
      icon: <IconThumbUp />
    },
    {
      value: 'LIKE',
      label: 'Like',
      icon: <IconThumbUp />
    },
    {
      value: 'LIKE',
      label: 'Like',
      icon: <IconThumbUp />
    },
    {
      value: 'LIKE',
      label: 'Like',
      icon: <IconThumbUp />
    }
  ]

  return (
    <Popover>
      <PopoverTrigger>
        <Button>React</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex items-center gap-2">
          {reacts.map((react) => (
            <Tooltip content={react.label} key={react.value} placement="bottom">
              <Button isIconOnly onPress={() => setReact(react.value)}>
                {react.icon}
              </Button>
            </Tooltip>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
