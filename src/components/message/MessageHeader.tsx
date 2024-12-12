'use client'

import { ROUTE } from '@/utils/constant/route'
import { Avatar, Button } from '@nextui-org/react'
import { IconArrowLeft } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { LocaleButton } from '../layouts/LocaleButton'
import { FLink } from '../common/FLink'

interface MessageHeaderProps {
  avatar?: string
}

const MessageHeader = (props: MessageHeaderProps) => {
  const t = useTranslations('message.header')

  return (
    <div className="sticky top-0 z-10 flex min-h-[80px] items-center justify-between border-b border-gray-200 bg-white shadow-md">
      <div className="ml-4 flex items-center gap-4">
        <Avatar src={props.avatar} className="cursor-pointer border border-gray-300" />
        <FLink path={ROUTE.pages.home}>
          <Button variant="light">
            <IconArrowLeft />
            {t('back_home')}
          </Button>
        </FLink>
      </div>
      <span className="mx-auto my-auto text-3xl font-extrabold">{t('title')}</span>
      <div className="mr-4">
        <LocaleButton />
      </div>
    </div>
  )
}

export default MessageHeader
