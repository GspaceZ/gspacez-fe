'use client'

import { PostType } from '@/types/post'
import { Profile } from '@/types/profile'
import { fullName } from '@/helpers/user/full-name'
import { postTime } from '@/helpers/post/post-time'
import { User } from '@nextui-org/user'
import * as React from 'react'
import { formattedContent } from '@/helpers/post/formatted-content'
import { Button } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { GoComment, GoPaperAirplane, GoStar } from 'react-icons/go'
import { CiCircleMore } from 'react-icons/ci'
import { useState } from 'react'

interface PostProps {
  profile: Profile
  post: PostType
}

const Post = ({ profile, post }: PostProps) => {
  const t = useTranslations('post')

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const content = formattedContent(post)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div
      className="max-w-[460px] w-full min-h-[220px] drop-shadow-md border
    border-gray-200 flex-col justify-between rounded-[20px] hidden md:flex"
    >
      <div className="mx-3 md:mx-6 mt-4 flex flex-col items-start gap-[20px]">
        <div className="flex justify-between w-full items-start">
          <User
            name={fullName(profile.firstName, profile.lastName)}
            description={postTime(post)}
            avatarProps={{ src: profile.avtUrl }}
            className="text-xl font-bold"
          />
          <div className="flex flex-col items-end">
            <Button isIconOnly className="text-2xl" variant="light" onPress={() => toggleMenu()}>
              <CiCircleMore />
            </Button>
            <div
              className={`${
                isMenuOpen ? '' : 'hidden'
              } border border-gray-200 flex flex-col rounded-[8px] absolute top-[55px] right-[30px]`}
            >
              <Button variant="light" className="w-[80px] h-[30px]" radius="none">
                {t('hide')}
              </Button>
              <Button variant="light" className="w-[80px] h-[30px]" radius="none">
                {t('report')}
              </Button>
            </div>
          </div>
        </div>
        <span className={`${content.isBigContent ? 'text-2xl' : 'text-xl'}`}>
          {content.shortContent}
        </span>
        <Button
          variant="light"
          className={`text-gray-500 w-fit ${content.isNeedReadMore ? '' : 'hidden'}`}
        >
          {t('read_more')}
        </Button>
      </div>
      <div className="h-[48px] w-full flex justify-between border-t border-gray-200 items-center">
        <Button variant="light" startContent={<GoStar />} className="text-base">
          {t('like')}
        </Button>
        <Button variant="light" startContent={<GoComment />} className="text-base">
          {t('comment')}
        </Button>
        <Button variant="light" startContent={<GoPaperAirplane />} className="text-base">
          {t('share')}
        </Button>
      </div>
    </div>
  )
}

export default Post
