'use client'

import * as React from 'react'
import TrendingPost, { TrendingPostProps } from '@/components/trending-post/trending-post'
import MaybeYouKnow, { MaybeYouKnowProps } from '@/components/trending-post/maybe-you-know'
import ButtonOption, { ButtonOptionsProps } from '@/components/trending-post/button-option'
import { trendingPostsData, maybeYouKnowData } from '@/utils/constant/trendingPostsData'
import { buttonOptions } from '@/utils/constant/buttonOptions'
import { useTranslations } from 'next-intl'
import { TITLEPOSTS } from '@/utils/constant/index'

interface TrendingPostsProps {
  posts: TrendingPostProps['post'][]
  maybeYouKnows: MaybeYouKnowProps['user'][]
  buttons: ButtonOptionsProps['button'][]
}

const TrendingPosts = ({ posts, maybeYouKnows }: TrendingPostsProps) => {
  const t = useTranslations('trendingPosts')

  return (
    <div className="w-[300px] h-screen fixed top-0 right-0 flex flex-col border-l border-gray-300 shadow-md bg-white z-10">
      <div className="h-[80px] w-full flex justify-between items-center border-b border-gray-300 p-4">
        <span className="text-xl font-bold">{TITLEPOSTS.trendingPosts}</span>
        <a href="#" className="text-blue-500">{TITLEPOSTS.more}</a>
      </div>
      <div className="flex flex-col overflow-y-auto border-b border-gray-300">
        <div className="border-b border-gray-300">
          {posts.map((post, index) => (
            <TrendingPost key={index} post={post} />
          ))}
        </div>
        <div className="flex justify-between items-center border-b border-gray-300 p-4">
          <span className="text-xl font-bold">{TITLEPOSTS.maybeYouKnow}</span>
          <a href="#" className="text-blue-500">{TITLEPOSTS.more}</a>
        </div>
        <div className="border-b border-gray-300">
          {maybeYouKnows.map((user, index) => (
            <MaybeYouKnow key={index} user={user} />
          ))}
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-around">
          {buttonOptions.map((buttonOption, index) => (
            <ButtonOption 
              key={index}
              button={buttonOption}
            />
          ))} 
        </div>
      </div>
    </div>
  )
}

TrendingPosts.defaultProps = {
  posts: trendingPostsData,
  maybeYouKnows: maybeYouKnowData
}

export default TrendingPosts
