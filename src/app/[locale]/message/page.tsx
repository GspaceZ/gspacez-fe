'use client'

import { IProfile } from '@/types/profile'
import MessageLayout from '../../../components/layouts/MessageLayout'
import { useEffect, useState } from 'react'
import { landingProfile } from '@/mock/landing'

const Page = () => {
  const [profile, setProfile] = useState<IProfile>()

  useEffect(() => {
    setProfile(landingProfile)
  }, [])

  return <MessageLayout profile={profile}>Hello</MessageLayout>
}

export default Page
