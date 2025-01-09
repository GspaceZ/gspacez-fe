'use client'

import { Avatar, Button } from '@nextui-org/react'
import { LocaleButton } from '../layouts/LocaleButton'
import { IconHome } from '@tabler/icons-react'
import { FLink } from '../common/FLink'
import { ROUTE } from '@/utils/constant/route'

interface MessageHeaderProps {
  avatar?: string
}

const MessageHeader = (props: MessageHeaderProps) => {
  return (
    <div className="sticky top-0 z-10 flex min-h-[50px] items-center justify-between border-b border-gray-200 bg-white shadow-md">
      <div className="ml-4 flex items-center gap-4">
        <Avatar src={props.avatar} size="sm" className="cursor-pointer border border-gray-300" />
      </div>
      <div className="mr-4 flex items-center gap-2">
        <LocaleButton />
        <FLink path={ROUTE.pages.home}>
          <Button
            isIconOnly
            variant="light"
            size="sm"
            startContent={<IconHome size={20} />}
          ></Button>
        </FLink>
      </div>
    </div>
  )
}

export default MessageHeader
