'use client'

import MainLayout from '@/components/layouts/MainLayout'
import { useParams } from 'next/navigation'

const Page = () => {
  const params = useParams()
  console.log(params)

  return <MainLayout>{'abc'}</MainLayout>
}

export default Page
