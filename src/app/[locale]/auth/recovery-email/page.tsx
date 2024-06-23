'use client'

import * as React from 'react'
import AuthLayout from '@/components/layouts/AuthLayout'
import { useTranslations } from 'next-intl'

const Page: React.FC = () => {
  const t = useTranslations('auth.recovery_email')

  return (
    <AuthLayout>
      <div className="mt-[50px] flex flex-col w-[308px] md:w-[400px] min-h-[152px] md:min-h-[140px] rounded-[20px] border border-gray-200 justify-between shadow-md">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-extrabold mt-[24px]">{t('forgot_password')}</span>
          <span className="text-center text-base md:text-lg font-medium mt-[28px] w-[304px] md:w-full">
            {t('recovery_notification')}
          </span>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Page
