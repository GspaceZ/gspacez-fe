'use client'

import * as React from 'react'
import TrendingPost from '@/components/trending-post/trending-post'
import TrendingPeople from '@/components/trending-post/trending-people'
import ButtonOption from '@/components/trending-post/button-option'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Button, User } from '@nextui-org/react'
import { TrendingSidebarProps } from '@/types/props/layouts'
import Post from '../common/Post'
import { buttonOptions } from '@/utils/constant/buttonOptions'
import { fullName } from '@/helpers/user/full-name'
import { POST_VARIANTS } from '@/utils/constant/variants'

const TrendingSidebar = ({ posts, trendingPeople, isVisible }: TrendingSidebarProps) => {
  const t = useTranslations('trending_posts')
  const router = useRouter()

  const handleRedirect = () => {
    router.push('/')
  }

  const handleSelectedPost = () => {
    // handle
  }

  return (
    <div
      className={`fixed bottom-0 right-0 h-[88vh] w-[100vw] transform overflow-y-auto border-l border-none border-gray-300 bg-white pb-[12vh] shadow-md transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      } md:flex md:h-full md:h-screen md:w-[300px] md:translate-x-0 md:translate-y-0 md:flex-col md:border-l md:border-gray-300 md:pb-0`}
    >
      <div className="m-0 flex h-full flex-col overflow-y-auto md:border md:border-gray-300">
        <div className="z-10 flex justify-between px-4 py-5 md:border-l md:border-gray-300">
          <span className="p-1 text-xl font-bold">{t('trending_post')}</span>
          <Button
            onPress={() => handleRedirect()}
            className="-mx-3 cursor-pointer border-none bg-transparent text-lg text-blue-500"
          >
            {t('more')}
          </Button>
        </div>
        <div>
          {posts.map((post, index) => (
            <Post
              key={index}
              post={post}
              variant={POST_VARIANTS.sidebar}
              toggleEditModal={() => handleSelectedPost}
            />
          ))}
        </div>
        <div className="mt-[50px] flex justify-between px-4 py-5 md:border md:border-gray-300">
          <span className="p-1 text-xl font-bold">{t('trending_people')}</span>
          <Button
            onPress={() => handleRedirect()}
            className="-mx-3 cursor-pointer border-none bg-transparent text-lg text-blue-500"
          >
            {t('more')}
          </Button>
        </div>
        <div className="flex w-full flex-col">
          {trendingPeople.map((user, index) => (
            <div
              className="w-full cursor-pointer border border-gray-100 py-2 pl-4 hover:bg-gray-50"
              key={index}
            >
              <User name={fullName(user.firstName, user.firstName)} />
            </div>
          ))}
        </div>
      </div>
      <div className="hidden bg-white shadow-md md:flex md:border-l md:border-gray-300">
        <div className="flex w-full items-center justify-around space-x-1 rounded-xl">
          {buttonOptions.map((buttonOption, index) => (
            <ButtonOption key={index} button={buttonOption} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TrendingSidebar
