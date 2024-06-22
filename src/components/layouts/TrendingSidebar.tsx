'use client'

import * as React from 'react'
import TrendingPost from '@/components/trending-post/trending-post'
import TrendingPeople from '@/components/trending-post/trending-people'
import ButtonOption from '@/components/trending-post/button-option'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Button } from '@nextui-org/react'
import { TrendingSidebarProps } from '@/types/props/layouts'

const TrendingSidebar = ({ posts, trendingPeople, buttons, isVisible }: TrendingSidebarProps) => {
  const t = useTranslations('trending_posts')
  const router = useRouter()

  const handleRedirect = () => {
    router.push('/')
  }

  return (
    <div
      className={`fixed bottom-0 right-0 h-[88vh] w-[100vw] overflow-y-auto pb-[12vh] border-l border-gray-300 bg-white shadow-md transform border-none
        transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        } md:pb-0 md:translate-y-0 md:translate-x-0 md:h-full md:w-[300px] md:h-screen md:border-l md:border-gray-300 md:flex md:flex-col`}
    >
      <div className="flex flex-col m-0 h-full overflow-y-auto md:border md:border-gray-300">
        <div className="flex justify-between md:border-l md:border-gray-300 px-4 py-5">
          <span className="text-xl font-bold p-1">{t('trending_post')}</span>
          <Button
            onPress={() => handleRedirect()}
            className="text-lg text-blue-500 bg-transparent border-none cursor-pointer -mx-3"
          >
            {t('more')}
          </Button>
        </div>
        <div>
          {posts.map((post, index) => (
            <TrendingPost key={index} post={post} />
          ))}
        </div>
        <div className="flex justify-between md:border md:border-gray-300 px-4 py-5 mt-[50px]">
          <span className="text-xl font-bold p-1">{t('trending_people')}</span>
          <Button
            onPress={() => handleRedirect()}
            className="text-lg text-blue-500 bg-transparent border-none cursor-pointer -mx-3"
          >
            {t('more')}
          </Button>
        </div>
        <div>
          {trendingPeople.map((user, index) => (
            <TrendingPeople key={index} user={user} />
          ))}
        </div>
      </div>
      <div className="hidden md:flex md:border-l md:border-gray-300 bg-white shadow-md">
        <div className="flex items-center rounded-xl justify-around w-full space-x-1">
          {buttons.map((buttonOption, index) => (
            <ButtonOption key={index} button={buttonOption} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TrendingSidebar
