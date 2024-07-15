'use client'

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
import { PostProps } from '@/types/props/common'
import { POST_VARIANTS } from '@/utils/constant/variants'

const Post: React.FC<PostProps> = ({ post, variant }) => {
  const t = useTranslations('post')

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const content = formattedContent(post)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div
      className={`max-w-[460px] w-full ${
        variant === POST_VARIANTS.sidebar
          ? 'h-[110px] cursor-pointer hover:bg-gray-50'
          : 'rounded-[20px] min-h-[220px] drop-shadow-md'
      } border border-gray-200 
        flex-col justify-between  hidden md:flex`}
    >
      <div
        className={`mx-3 md:mx-6 mt-4 flex flex-col items-start ${
          variant === POST_VARIANTS.sidebar ? 'gap-1' : 'gap-5'
        }`}
      >
        <div className="flex justify-between w-full items-start">
          <User
            name={fullName(post.user.firstName, post.user.lastName)}
            description={postTime(post)}
            avatarProps={{ src: post.user.avtUrl }}
            className="text-xl font-bold"
          />
          <div className="flex flex-col items-end">
            <Button
              isIconOnly
              className={`${variant === POST_VARIANTS.sidebar ? 'hidden' : 'text-2xl'}`}
              variant="light"
              onPress={() => toggleMenu()}
            >
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
          className={`text-gray-500 w-fit ${
            content.isNeedReadMore && variant !== POST_VARIANTS.sidebar ? '' : 'hidden'
          }`}
        >
          {t('read_more')}
        </Button>
      </div>
      <div
        className={`h-[48px] w-full flex justify-between border-t border-gray-200 items-center ${
          variant === POST_VARIANTS.sidebar ? 'hidden' : ''
        }`}
      >
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
