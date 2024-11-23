import AuthLayout from '@/components/layouts/AuthLayout'
import { useTranslations } from 'next-intl'
import * as React from 'react'

const Page: React.FC = () => {
  const t = useTranslations('auth.activate')

  return (
    <AuthLayout>
      <div className="my-[4px] mt-[60px] flex h-[136px] w-[450px] flex-col items-center justify-between rounded-[30px] border border-gray-200 shadow-md">
        <span className="mt-[20px] text-4xl font-extrabold">{t('welcome')}</span>
        <span className="mb-[20px] text-lg">{t('mail_sent')}</span>
      </div>
    </AuthLayout>
  )
}

export default Page
