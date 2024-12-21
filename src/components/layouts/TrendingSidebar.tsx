'use client'

import * as React from 'react'
import ButtonOption from '@/components/trending-post/button-option'
import { useTranslations } from 'next-intl'
import { Button, User } from '@nextui-org/react'
import { TrendingSidebarProps } from '@/types/props/layouts'
import Post from '../common/Post'
import { fullName } from '@/helpers/user/full-name'
import { POST_VARIANTS } from '@/utils/constant/variants'
import { IconBell, IconSend, IconSettings, IconTrendingUp } from '@tabler/icons-react'
import { FLink } from '../common/FLink'
import { useQuery } from '@tanstack/react-query'
import PostSkeleton from '../posts/PostSkeleton'
import { usePost } from '@/hooks/usePost'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/store'

const TrendingSidebar = ({ trendingPeople, isVisible }: TrendingSidebarProps) => {
  const t = useTranslations('trending_posts')
  const token = useSelector((state: RootState) => state.auth.token)
  const { getTrendingPosts } = usePost()

  const handleSelectedPost = () => {
    // handle
  }

  const setPrivacy = () => {
    // handle
  }

  const buttonOptions = [
    {
      name: 'send',
      icon: <IconSend />,
      path: 'home',
      count: 5
    },
    {
      name: 'notifications',
      icon: <IconBell />,
      path: 'home',
      count: 5
    },
    {
      name: 'settings',
      icon: <IconSettings />,
      path: 'home',
      count: 0
    },
    {
      name: 'messages',
      icon: <IconTrendingUp />,
      path: 'home',
      count: 0
    }
  ]

  const { data: trendingPostsData, isLoading: isTrendingPostsLoading } = useQuery({
    queryKey: ['trending-posts'],
    queryFn: () => getTrendingPosts(token)
  })

  return (
    <div
      className={`fixed bottom-0 right-0 h-[88vh] w-[100vw] transform overflow-y-auto border-l border-none border-gray-300 bg-white pb-[12vh] shadow-lg transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      } lg:flex lg:h-full lg:h-screen lg:w-[300px] lg:translate-x-0 lg:translate-y-0 lg:flex-col lg:border-l lg:border-gray-300 lg:pb-0`}
    >
      <div className="m-0 flex h-full flex-col overflow-y-auto lg:border lg:border-gray-300">
        <div className="z-10 flex justify-between px-4 py-5 lg:border-l lg:border-gray-300">
          <span className="p-1 text-xl font-bold">{t('trending_post')}</span>
          <FLink path="/">
            <Button className="-mx-3 cursor-pointer border-none bg-transparent text-lg text-blue-500">
              {t('more')}
            </Button>
          </FLink>
        </div>
        <div>
          {isTrendingPostsLoading ? (
            <PostSkeleton variant={POST_VARIANTS.sidebar} />
          ) : (
            trendingPostsData?.data.result.map((post, index) => (
              <Post
                key={index}
                post={post}
                variant={POST_VARIANTS.sidebar}
                toggleEditModal={() => handleSelectedPost}
                togglePrivacyModal={() => setPrivacy}
              />
            ))
          )}
        </div>
        <div className="mt-[50px] flex justify-between px-4 py-5 lg:border lg:border-gray-300">
          <span className="p-1 text-xl font-bold">{t('trending_people')}</span>
          <FLink path="/">
            <Button className="-mx-3 cursor-pointer border-none bg-transparent text-lg text-blue-500">
              {t('more')}
            </Button>
          </FLink>
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
      <div className="hidden bg-white shadow-lg lg:flex lg:border-l lg:border-gray-300">
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
