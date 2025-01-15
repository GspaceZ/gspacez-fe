'use client'

import MainLayout from '@/components/layouts/MainLayout'
import { PageForm } from '@/components/pages/PageForm'

const Page: React.FC = () => {
  return (
    <MainLayout>
      <div className="mx-auto min-h-screen w-screen max-w-[600px] border border-gray-200">
        <PageForm />
      </div>
    </MainLayout>
  )
}

export default Page
