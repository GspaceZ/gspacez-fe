'use client'

import { pathWithLocale } from '@/helpers/url/path-with-locale'
import { ROUTE } from '@/utils/constant/route'
import { Avatar, Button } from '@nextui-org/react'
import { IconArrowLeft } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { LocaleButton } from '../layouts/LocaleButton'

interface MessageHeaderProps {
  avatar?: string
}

const MessageHeader = (props: MessageHeaderProps) => {
  const t = useTranslations('message.header')

  const pathname = usePathname()
  const router = useRouter()

  const handleRedirect = (path: string) => {
    const destinationPath = pathWithLocale(pathname, path)
    router.push(destinationPath)
  }

  return (
    <div className="sticky top-0 z-10 flex min-h-[80px] items-center justify-between border-b border-gray-200 bg-white shadow-md">
      <div className="ml-4 flex items-center gap-4">
        <Avatar src={props.avatar} className="cursor-pointer border border-gray-300" />
        <Button onClick={() => handleRedirect(ROUTE.pages.home)} variant="light">
          <IconArrowLeft />
          {t('back_home')}
        </Button>
      </div>
      <span className="mx-auto my-auto text-3xl font-extrabold">{t('title')}</span>
      <div className="mr-4">
        <LocaleButton />
      </div>
    </div>
  )
}

export default MessageHeader
