'use client'

import * as React from 'react'
import { Image } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { TrendingPostProps } from '@/types/props/layouts'

const TrendingPost = ({ post }: TrendingPostProps) => {
  const t = useTranslations('trending_posts')

  return (
    <div className="m-4 flex cursor-pointer items-center rounded-2xl border border-gray-300 p-4 hover:bg-gray-200 md:m-0 md:rounded-none">
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
            <span className="block text-sm text-gray-500">{t('time')}</span>
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
