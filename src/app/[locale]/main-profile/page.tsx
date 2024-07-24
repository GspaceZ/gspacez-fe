'use client'

import MainLayout from '@/components/layouts/MainLayout'
import MainProfileForm from '@/components/main-profile/MainProfileForm'
import { useTranslations } from 'next-intl'

const Page: React.FC = () => {
  const t = useTranslations('title')

  return (
    <MainLayout title="Profile">
      <div className="w-screen max-w-[600px] min-h-screen mx-auto border border-gray-200">
        <MainProfileForm />
      </div>
    </MainLayout>
  )
}

export default Page
