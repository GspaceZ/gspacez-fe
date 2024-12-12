'use client'

import { IProfile } from '@/types/profile'
import MessageLayout from '@/components/layouts/MessageLayout'
import { useEffect, useState } from 'react'
import { landingProfile } from '@/mock/landing'
import MessageContacts from '@/components/message/MessageContacts'
import { MessageBox } from '@/components/message/MessageBox'

const Page = () => {
  const [profile, setProfile] = useState<IProfile>()

  useEffect(() => {
    setProfile(landingProfile)
  }, [])

  return (
    <MessageLayout profile={profile}>
      <div className="flex w-full gap-4 overflow-y-auto">
        <div className="hidden lg:block">
          <MessageContacts />
        </div>
        <MessageBox />
      </div>
    </MessageLayout>
  )
}

export default Page
