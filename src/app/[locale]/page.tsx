import Post from '@/components/common/Post'
import BlankLayout from '@/components/layouts/BlankLayout'
import { Button } from '@nextui-org/button'
import { Image } from '@nextui-org/react'
import { landingProfile, landingPost } from '@/utils/constant/landing'
import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('landing')

  return (
    <BlankLayout>
      <div className="h-screen flex flex-col-reverse md:flex-col justify-end md:justify-start">
        <div className="text-center mt-[150px] md:mt-[80px] flex flex-col text-3xl md:text-4xl font-bold gap-4 text-gray-700">
          <span>{t('text_1')}</span>
          <span>{t('text_2')}</span>
        </div>
        <div className="mt-[60px] md:mt-[150px] gap-[200px] md:justify-center flex flex-col md:flex-row items-center w-full">
          <div className="flex flex-col items-center w-full md:w-fit">
            <Image className="w-[240px]" alt="Logo" src="/logo.png" />
            <span className="font-bold text-gray-500 text-4xl mt-3">
              {t('slogan')}
            </span>
            <div className="flex flex-col md:flex-row mt-9 gap-[20px] md:gap-[40px] fixed md:relative bottom-[40px] md:bottom-0">
              <Button color="primary" className="text-xl w-[150px] h-[48px]">
                {t('sign_in')}
              </Button>
              <Button className="text-primary text-xl w-[150px] h-[48px]">
                {t('sign_up')}
              </Button>
            </div>
          </div>
          <Post profile={landingProfile} post={landingPost} />
        </div>
      </div>
    </BlankLayout>
  )
}
