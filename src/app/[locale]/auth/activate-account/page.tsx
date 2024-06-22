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
      <div className="w-[450px] h-[136px] mt-[60px] flex flex-col items-center my-[4px] border border-gray-200 rounded-[30px] justify-between shadow-md">
        <span className="text-4xl font-extrabold mt-[20px]">{t('activate.success')}</span>
        <span className="text-lg mb-[20px]">
          <Button
            className="text-lg w-fit h-fit font-bold"
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
