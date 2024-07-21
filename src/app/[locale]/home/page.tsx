'use client'

import FImage from '@/components/common/FImage'
import Posts from '@/components/home/Posts'
import MainLayout from '@/components/layouts/MainLayout'
import { fakePosts } from '@/mock/posts'
import { useAppSelector } from '@/utils/store'
import { Button } from '@nextui-org/react'
import { useTranslations } from 'next-intl'

const Page = () => {
  const t = useTranslations('title')
  const tPost = useTranslations('post')

  const initialUrl = useAppSelector((state) => state.user.avtUrl)

  const imageUrl =
    initialUrl ||
    'https://res.cloudinary.com/dszkt92jr/image/upload/v1719943637/vcbhui3dxeusphkgvycg.png'

  return (
    <MainLayout title={t('home')}>
      <div className="w-full flex flex-col items-center">
        <div className="mx-auto w-full max-w-[632px] bg-gray-50 rounded-lg">
          <div className="flex mt-4 p-4 items-center">
            <FImage src={imageUrl} alt="Avatar" className="w-12 h-12" />
            <Button className="ml-4 grow bg-gray-200 text-gray-700">
              {tPost('create_placeholder')}
            </Button>
          </div>
          <div>
            <Posts posts={fakePosts} />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Page
