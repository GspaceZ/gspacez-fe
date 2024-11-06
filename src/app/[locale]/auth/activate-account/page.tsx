'use client'

import AuthLayout from '@/components/layouts/AuthLayout'
import { decodeActivationLinkEmail } from '@/helpers/activation/decode-activation-link'
import { pathWithLocale } from '@/helpers/url/path-with-locale'
import { ROUTE } from '@/utils/constant/route'
import { Button } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'

const Page: React.FC = () => {
  const params = useSearchParams()
  const token = params.get('token') || ''
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('auth')

  const email = decodeActivationLinkEmail(token)
  console.log(email)

  const handleRedirect = (path: string) => {
    const destinationPath = pathWithLocale(pathname, path)
    router.push(destinationPath)
  }

  return (
    <AuthLayout>
      <div className="my-[4px] mt-[60px] flex h-[136px] w-[450px] flex-col items-center justify-between rounded-[30px] border border-gray-200 shadow-md">
        <span className="mt-[20px] text-4xl font-extrabold">{t('activate.success')}</span>
        <span className="mb-[20px] text-lg">
          <Button
            className="h-fit w-fit text-lg font-bold"
            color="primary"
            onPress={() => handleRedirect(ROUTE.auth.signin)}
          >
            {t('sign_in')}
          </Button>{' '}
          {t('activate.and_start_now')}
        </span>
      </div>
    </AuthLayout>
  )
}

export default Page
