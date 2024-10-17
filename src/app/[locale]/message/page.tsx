'use client'

import { IProfile } from '@/types/profile'
import MessageLayout from '../../../components/layouts/message/MessageLayout'
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
      <div className="flex w-full grow">
        <MessageContacts />
        Message
      </div>
    </MessageLayout>
  )
}

export default Page
