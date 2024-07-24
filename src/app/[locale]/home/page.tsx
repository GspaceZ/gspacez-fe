'use client'

import FImage from '@/components/common/FImage'
import NewPost from '@/components/posts/NewPost'
import Posts from '@/components/home/Posts'
import MainLayout from '@/components/layouts/MainLayout'
import { fakePosts } from '@/mock/posts'
import { useAppSelector } from '@/utils/store'
import { Button } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'

const Page = () => {
  const t = useTranslations('title')
  const tPost = useTranslations('post')
  const [isNewPostOpen, setIsNewPostOpen] = useState(false)
  const user = useAppSelector((state) => state.user)

  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    setImageUrl(
      user.avtUrl ||
        'https://res.cloudinary.com/dszkt92jr/image/upload/v1719943637/vcbhui3dxeusphkgvycg.png'
    )
  }, [user.avtUrl])

  return (
    <MainLayout title={t('home')}>
      <div className="w-full flex flex-col items-center">
        <div className="mx-auto w-full max-w-[632px] bg-gray-50 rounded-lg">
          <div className="flex mt-4 p-4 items-center">
            {imageUrl && <FImage src={imageUrl} alt="Avatar" className="w-12 h-12" />}
            <Button
              className="ml-4 grow bg-gray-200 text-gray-700"
              onClick={() => setIsNewPostOpen(!isNewPostOpen)}
            >
              {tPost('create_placeholder')}
            </Button>
          </div>
          <div className="pb-[80px]">
            <Posts posts={fakePosts} />
          </div>
        </div>
        {isNewPostOpen && (
          <NewPost
            user={user}
            closePost={() => {
              setIsNewPostOpen(false)
            }}
          />
        )}
      </div>
    </MainLayout>
  )
}

export default Page
