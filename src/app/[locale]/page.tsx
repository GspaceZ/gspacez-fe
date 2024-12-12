'use client'

import Post from '@/components/common/Post'
import BlankLayout from '@/components/layouts/BlankLayout'
import { Button } from '@nextui-org/button'
import { Image } from '@nextui-org/react'
import { landingPost } from '@/mock/landing'
import { useTranslations } from 'next-intl'
import { ROUTE } from '@/utils/constant/route'
import { POST_VARIANTS } from '@/utils/constant/variants'
import Logo from '@/public/logo.png'
import { FLink } from '@/components/common/FLink'

export default function Home() {
  const t = useTranslations('landing')

  return (
    <BlankLayout>
      <div className="flex h-screen flex-col-reverse justify-end md:flex-col md:justify-start">
        <div className="mt-[80px] flex flex-col gap-4 text-center text-3xl font-bold text-gray-700 md:text-4xl">
          <span>{t('text_1')}</span>
          <span>{t('text_2')}</span>
          <div className="bottom-0 mt-[50px] flex flex-col items-center gap-5 md:hidden">
            <FLink path={ROUTE.auth.signin}>
              <Button color="primary" className="h-[48px] w-[150px] text-xl">
                {t('sign_in')}
              </Button>
            </FLink>
            <FLink path={ROUTE.auth.signup}>
              <Button className="h-[48px] w-[150px] text-xl text-primary">{t('sign_up')}</Button>
            </FLink>
          </div>
        </div>
        <div className="mt-[60px] flex w-full flex-col items-center gap-[200px] md:mt-[150px] md:flex-row md:justify-center">
          <div className="flex w-full flex-col items-center md:w-fit">
            <Image className="w-[240px]" alt="Logo" src={Logo.src} />
            <span className="mt-3 text-4xl font-bold text-gray-500">{t('slogan')}</span>
            <div className="mt-9 hidden flex-row gap-[40px] md:!flex">
              <FLink path={ROUTE.auth.signin}>
                <Button color="primary" className="h-[48px] w-[150px] text-xl">
                  {t('sign_in')}
                </Button>
              </FLink>
              <FLink path={ROUTE.auth.signup}>
                <Button className="h-[48px] w-[150px] text-xl text-primary">{t('sign_up')}</Button>
              </FLink>
            </div>
          </div>
          <Post post={landingPost} variant={POST_VARIANTS.landing} />
        </div>
      </div>
    </BlankLayout>
  )
}
