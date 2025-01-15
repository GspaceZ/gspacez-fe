'use client'

import MainLayout from '@/components/layouts/MainLayout'
import MainProfileForm from '@/components/main-profile/MainProfileForm'

const Page: React.FC = () => {
  return (
    <MainLayout>
      <div className="mx-auto min-h-screen w-screen max-w-[600px] border border-gray-200">
        <MainProfileForm />
      </div>
    </MainLayout>
  )
}

export default Page
