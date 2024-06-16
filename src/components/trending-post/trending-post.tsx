'use client'

import * as React from 'react'
import { Image } from '@nextui-org/react'
import { useTranslations } from 'next-intl'

export interface TrendingPostProps {
  post: {
    name: string
    time: string
    profileImage: string
    content: string
  }
}

const TrendingPost = ({ post }: TrendingPostProps) => {
  const t = useTranslations('trending_posts')

  return (
    <div className="flex items-start p-4 border-b border-gray-300">
      <div className="flex flex-col">
        <div className="flex">
          <Image
            src={post.profileImage}
            alt={post.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="ml-4">
            <span className="text-sm font-bold">{post.name}</span>
            <span className="text-sm text-gray-500 block">{t('time')}</span>
          </div>
        </div>
        <div className="mt-2 flex-1">
          <p className="text-2xl">{post.content}</p>
        </div>
      </div>
    </div>
  )
}

export default TrendingPost
