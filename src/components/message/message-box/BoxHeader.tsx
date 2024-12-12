'use client'

import { Avatar, Button } from '@nextui-org/react'
import { mockUser } from '@/mock/message'
import { useEffect, useState } from 'react'
import { IMessageBaseInfo } from '@/types/message'
import { IconArrowLeft, IconInfoCircle, IconPhoneCall, IconVideo } from '@tabler/icons-react'
import { ROUTE } from '@/utils/constant/route'
import { FLink } from '@/components/common/FLink'

interface Props {
  setShowInfo: () => void
}

export const BoxHeader = ({ setShowInfo }: Props) => {
  const [messageUser, setMessageUser] = useState<IMessageBaseInfo>()

  useEffect(() => {
    setMessageUser(mockUser)
  }, [])

  return (
    <div className="min-h-[60px] w-full border-b border-gray-200">
      <div className="flex h-full w-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <FLink path={ROUTE.pages.message}>
            <Button isIconOnly variant="light" className="flex md:hidden">
              <IconArrowLeft size={28} />
            </Button>
          </FLink>
          <Avatar src={messageUser?.avatar} alt="Avatar" className="border border-gray-300" />
          <span>{messageUser?.name}</span>
        </div>
        <div className="flex items-center gap-4">
          <Button isIconOnly variant="light">
            <IconPhoneCall />
          </Button>
          <Button isIconOnly variant="light">
            <IconVideo />
          </Button>
          <Button isIconOnly variant="light" onClick={setShowInfo}>
            <IconInfoCircle />
          </Button>
        </div>
      </div>
    </div>
  )
}
