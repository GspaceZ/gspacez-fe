'use client'

import { IProfile } from '@/types/profile'
import MessageLayout from '@/components/layouts/message/MessageLayout'
import { useEffect, useState } from 'react'
import { landingProfile } from '@/mock/landing'
import MessageContacts from '@/components/message/MessageContacts'

const Page = () => {
  const [profile, setProfile] = useState<IProfile>()

  useEffect(() => {
    setProfile(landingProfile)
  }, [])

  return (
    <MessageLayout profile={profile}>
      <div className="flex w-full grow overflow-y-auto">
        <MessageContacts />
        <div className="hidden h-full grow lg:flex">
          <span className="mx-auto my-auto">Choose a conversation to start</span>
        </div>
      </div>
    </MessageLayout>
  )
}

export default Page
