'use client'

import { IProfile } from '@/types/profile'
import MessageLayout from '@/components/layouts/MessageLayout'
import { useEffect, useState } from 'react'
import { landingProfile } from '@/mock/landing'
import MessageContacts from '@/components/message/MessageContacts'
import { useTranslations } from 'next-intl'

const Page = () => {
  const t = useTranslations('message.page.box')
  const [profile, setProfile] = useState<IProfile>()

  useEffect(() => {
    setProfile(landingProfile)
  }, [])

  return (
    <MessageLayout profile={profile}>
      <div className="flex w-full grow overflow-y-auto px-4 lg:px-0">
        <MessageContacts />
        <div className="hidden h-full grow lg:flex">
          <span className="mx-auto my-auto">{t('no_conversation')}</span>
        </div>
      </div>
    </MessageLayout>
  )
}

export default Page
