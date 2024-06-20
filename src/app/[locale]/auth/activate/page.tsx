import AuthLayout from '@/components/layouts/AuthLayout'
import { useTranslations } from 'next-intl'
import * as React from 'react'

const Page: React.FC = () => {
  const t = useTranslations('auth.activate')

  return (
    <AuthLayout>
      <div className="w-[450px] h-[136px] mt-[60px] flex flex-col items-center my-[4px] border border-gray-200 rounded-[30px] justify-between shadow-md">
        <span className="text-4xl font-extrabold mt-[20px]">{t('welcome')}</span>
        <span className="text-lg mb-[20px]">{t('mail_sent')}</span>
      </div>
    </AuthLayout>
  )
}

export default Page
