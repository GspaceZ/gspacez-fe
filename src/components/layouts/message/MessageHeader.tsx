'use client'

import { pathWithLocale } from '@/helpers/url/path-with-locale'
import { ROUTE } from '@/utils/constant/route'
import { Avatar, Button } from '@nextui-org/react'
import { IconArrowLeft } from '@tabler/icons-react'
import { usePathname, useRouter } from 'next/navigation'

interface MessageHeaderProps {
  avatar?: string
}

const MessageHeader = (props: MessageHeaderProps) => {
  const pathname = usePathname()
  const router = useRouter()

  const handleRedirect = (path: string) => {
    const destinationPath = pathWithLocale(pathname, path)
    router.push(destinationPath)
  }

  return (
    <div className="sticky top-0 z-10 flex min-h-[80px] border-b border-gray-200 bg-white shadow-md">
      <div className="fixed left-0 ml-4 mt-5 flex items-center gap-4">
        <Avatar src={props.avatar} className="cursor-pointer border border-gray-300" />
        <Button onClick={() => handleRedirect(ROUTE.pages.home)} variant="light">
          <IconArrowLeft />
          Back to home
        </Button>
      </div>
      <span className="mx-auto my-auto text-3xl font-extrabold">Message</span>
    </div>
  )
}

export default MessageHeader
