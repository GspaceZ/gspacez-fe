'use client'

import { useRedirect } from '@/app/providers'
import { useProfile } from '@/hooks/useProfile'
import { RootState } from '@/utils/store'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Page = () => {
  const { getProfile } = useProfile()
  const token = useSelector((state: RootState) => state.auth.token)
  const { redirect } = useRedirect()

  const { data: profileData } = useQuery({
    queryKey: ['profile'],
    queryFn: () => {
      return getProfile(token)
    }
  })

  useEffect(() => {
    if (profileData) {
      redirect('/home')
    } else {
      redirect('/main-profile')
    }
  }, [profileData, redirect])

  return <></>
}

export default Page
