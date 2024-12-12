'use client'

import { FLink } from '@/components/common/FLink'
import AuthLayout from '@/components/layouts/AuthLayout'
import { ROUTE } from '@/utils/constant/route'
import { Button } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import * as React from 'react'

const Page: React.FC = () => {
  const t = useTranslations('auth')

  return (
    <AuthLayout>
      <div className="my-[4px] mt-[60px] flex h-[136px] w-[450px] flex-col items-center justify-between rounded-[30px] border border-gray-200 shadow-md">
        <span className="mt-[20px] text-4xl font-extrabold">{t('activate.success')}</span>
        <span className="mb-[20px] text-lg">
          <FLink path={ROUTE.auth.signin}>
            <Button className="h-fit w-fit text-lg font-bold" color="primary">
              {t('sign_in')}
            </Button>
          </FLink>{' '}
          {t('activate.and_start_now')}
        </span>
      </div>
    </AuthLayout>
  )
}

export default Page
