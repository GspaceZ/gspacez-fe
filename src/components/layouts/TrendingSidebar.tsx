'use client'

import * as React from 'react'
import TrendingPost, { TrendingPostProps } from '@/components/trending-post/trending-post'
import TrendingPeople, { TrendingPeopleProps } from '@/components/trending-post/trending-people'
import ButtonOption, { ButtonOptionsProps } from '@/components/trending-post/button-option'
import { useTranslations } from 'next-intl'

interface TrendingSidebarProps {
  posts: TrendingPostProps['post'][]
  trendingPeople: TrendingPeopleProps['user'][]
  buttons: ButtonOptionsProps['button'][]
  isVisible: boolean
}

const TrendingSidebar = ({ posts, trendingPeople, buttons, isVisible }: TrendingSidebarProps) => {
  const t = useTranslations('trending_posts')

  return (
    <div
      className={`fixed bottom-0 right-0 h-full w-[300px] bg-white shadow-md transform 
        transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        } md:translate-x-0 md:w-[300px] md:h-screen md:top-0 md:right-0 md:flex 
        md:flex-col md:border-l md:border-gray-300 md:shadow-md md:bg-white`}
    >
      <div className="h-[80px] w-full flex justify-between items-center border-b border-gray-300 p-4">
        <span className="text-xl font-bold">{t('trending_post')}</span>
        <a href="#" className="text-blue-500">
          {t('more')}
        </a>
      </div>
      <div className="flex flex-col overflow-y-auto h-full border-b border-gray-300">
        <div className="border-b border-gray-300">
          {posts.map((post, index) => (
            <TrendingPost key={index} post={post} />
          ))}
        </div>
        <div className="flex justify-between items-center border-b border-gray-300 p-4">
          <span className="text-xl font-bold">{t('trending_people')}</span>
          <a href="#" className="text-blue-500">
            {t('more')}
          </a>
        </div>
        <div className="border-b border-gray-300">
          {trendingPeople.map((user, index) => (
            <TrendingPeople key={index} user={user} />
          ))}
        </div>
      </div>
      <div className="hidden md:flex bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-around w-full space-x-1">
          {buttons.map((buttonOption, index) => (
            <ButtonOption key={index} button={buttonOption} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TrendingSidebar
