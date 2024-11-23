'use client'

import MainLayout from "@/components/layouts/MainLayout"
import { PageForm } from "@/components/pages/PageForm"
import { useTranslations } from "next-intl"

const Page: React.FC = () => {
  const t = useTranslations('pages')

  return <MainLayout title={t('page')}>
    <div className="mx-auto min-h-screen w-screen max-w-[600px] border border-gray-200">
      <PageForm />
    </div>
  </MainLayout>
}

export default Page