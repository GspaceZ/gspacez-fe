'use client'

import Post from '@/components/common/Post'
import BlankLayout from '@/components/layouts/BlankLayout'
import { Button } from '@nextui-org/button'
import { Image } from '@nextui-org/react'
import { landingPost } from '@/mock/landing'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { pathWithLocale } from '@/helpers/url/path-with-locale'
import { ROUTE } from '@/utils/constant/route'
import { POST_VARIANTS } from '@/utils/constant/variants'
import Logo from '@/public/logo.png'

export default function Home() {
  const t = useTranslations('landing')

  const pathname = usePathname()
  const router = useRouter()

  const handleRedirect = (path: string) => {
    const destinationPath = pathWithLocale(pathname, path)
    router.push(destinationPath)
  }

  const handleSelectedPost = () => {
    // handle landing post
  }

  const setPrivacyModal = () => {
    // set privacy modal
  }

  return (
    <BlankLayout>
      <div className="flex h-screen flex-col-reverse justify-end md:flex-col md:justify-start">
        <div className="mt-[80px] flex flex-col gap-4 text-center text-3xl font-bold text-gray-700 md:text-4xl">
          <span>{t('text_1')}</span>
          <span>{t('text_2')}</span>
          <div className="bottom-0 mt-[50px] flex flex-col items-center gap-5 md:hidden">
            <Button
              color="primary"
              className="h-[48px] w-[150px] text-xl"
              onPress={() => handleRedirect(ROUTE.auth.signin)}
            >
              {t('sign_in')}
            </Button>
            <Button
              className="h-[48px] w-[150px] text-xl text-primary"
              onPress={() => handleRedirect(ROUTE.auth.signup)}
            >
              {t('sign_up')}
            </Button>
          </div>
        </div>
        <div className="mt-[60px] flex w-full flex-col items-center gap-[200px] md:mt-[150px] md:flex-row md:justify-center">
          <div className="flex w-full flex-col items-center md:w-fit">
            <Image className="w-[240px]" alt="Logo" src={Logo.src} />
            <span className="mt-3 text-4xl font-bold text-gray-500">{t('slogan')}</span>
            <div className="bottom-0 mt-9 hidden flex-row gap-[40px] md:flex">
              <Button
                color="primary"
                className="h-[48px] w-[150px] text-xl"
                onPress={() => handleRedirect(ROUTE.auth.signin)}
              >
                {t('sign_in')}
              </Button>
              <Button
                className="h-[48px] w-[150px] text-xl text-primary"
                onPress={() => handleRedirect(ROUTE.auth.signup)}
              >
                {t('sign_up')}
              </Button>
            </div>
          </div>
          <Post post={landingPost} variant={POST_VARIANTS.landing} />
        </div>
      </div>
    </BlankLayout>
  )
}
