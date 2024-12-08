'use client'

import { Button, Input } from '@nextui-org/react'
import { IconPhotoScan, IconSend2 } from '@tabler/icons-react'

export const BoxFooter = () => {
  return (
    <div className="min-h-[68px] w-full border-t border-gray-300">
      <div className="flex h-full w-full items-center gap-2 px-4">
        <Button isIconOnly variant="light">
          <IconPhotoScan />
        </Button>
        <Input className="grow" placeholder="Type something..." />
        <Button isIconOnly variant="light">
          <IconSend2 />
        </Button>
      </div>
    </div>
  )
}
