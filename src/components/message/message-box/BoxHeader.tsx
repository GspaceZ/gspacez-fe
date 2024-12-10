'use client'

import { Avatar, Button } from '@nextui-org/react'
import { mockUser } from '@/mock/message'
import { useEffect, useState } from 'react'
import { IMessageBaseInfo } from '@/types/message'
import { IconArrowLeft, IconInfoCircle, IconPhoneCall, IconVideo } from '@tabler/icons-react'
import { pathWithLocale } from '@/helpers/url/path-with-locale'
import { usePathname, useRouter } from 'next/navigation'
import { ROUTE } from '@/utils/constant/route'

interface Props {
  setShowInfo: () => void
}

export const BoxHeader = ({ setShowInfo }: Props) => {
  const [messageUser, setMessageUser] = useState<IMessageBaseInfo>()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setMessageUser(mockUser)
  }, [])

  const handleRedirect = (path: string) => {
    const destinationPath = pathWithLocale(pathname, path)
    router.push(destinationPath)
  }

  return (
    <div className="min-h-[60px] w-full border-b border-gray-200">
      <div className="flex h-full w-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button
            isIconOnly
            variant="light"
            className="flex md:hidden"
            onClick={() => handleRedirect(ROUTE.pages.message)}
          >
            <IconArrowLeft size={28} />
          </Button>
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
