'use client'

import { postTime } from '@/helpers/post/post-time'
import { User } from '@nextui-org/user'
import * as React from 'react'
import { formattedContent } from '@/helpers/post/formatted-content'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { FCarouselItemProps } from '@/types/props/common'
import { POST_VARIANTS } from '@/utils/constant/variants'
import FCarousel from './FCarousel'
import { IPost } from '@/types/post'
import {
  IconDotsCircleHorizontal,
  IconMessage,
  IconShare3,
  IconStar,
  IconStarFilled
} from '@tabler/icons-react'

export interface PostProps {
  post: IPost
  variant?: POST_VARIANTS
  toggleEditModal?: () => void
  togglePrivacyModal?: () => void
  toggleDeleteModal?: () => void
}

const Post: React.FC<PostProps> = ({
  post,
  variant,
  toggleEditModal,
  togglePrivacyModal,
  toggleDeleteModal
}) => {
  const t = useTranslations('post')

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const content = formattedContent(post)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const togglePost = () => {
    setIsHidden(!isHidden)
  }

  const toggleEditPost = () => {
    if (toggleEditModal !== undefined) {
      toggleEditModal()
    }
  }

  const setPrivacy = () => {
    if (togglePrivacyModal !== undefined) {
      togglePrivacyModal()
    }
  }

  const deletePost = () => {
    if (toggleDeleteModal !== undefined) {
      toggleDeleteModal()
    }
  }

  const items: FCarouselItemProps[] = [
    {
      id: '1',
      mediaUrl:
        'https://res.cloudinary.com/dszkt92jr/image/upload/v1721463934/fgcnetakyb8nibeqr9do.png',
      type: 'image'
    },
    {
      id: '2',
      mediaUrl:
        'https://res.cloudinary.com/dszkt92jr/video/upload/v1721473062/Screencast_from_18-07-2024_15_42_45_nxip2u.mp4',
      type: 'video'
    }
  ]

  const postOptions = [
    {
      label: t('options.hide'),
      onClick: togglePost
    },
    {
      label: t('options.privacy'),
      onClick: setPrivacy
    },
    {
      label: t('options.edit'),
      onClick: toggleEditPost
    },
    {
      label: t('options.delete'),
      onClick: deletePost
    }
  ]

  return (
    <>
      {isHidden ? (
        <div className="w-full max-w-[600px] rounded-lg border border-gray-200 bg-white">
          <div className="mx-3 my-2 flex flex-col">
            <span>{t('toggle.hide')}</span>
            <Button onClick={() => togglePost()}>{t('toggle.restore')}</Button>
          </div>
        </div>
      ) : (
        <div
          className={`w-full ${
            variant === POST_VARIANTS.feed
              ? 'max-w-[600px] rounded-lg bg-white'
              : variant === POST_VARIANTS.landing
                ? 'min-h-[220px] max-w-[448px] rounded-lg drop-shadow-md'
                : variant === POST_VARIANTS.sidebar
                  ? 'h-[110px] cursor-pointer hover:bg-gray-50'
                  : 'min-h-[220px] rounded-lg border-gray-50 bg-white'
          } flex-col justify-between border border-gray-200 md:flex`}
        >
          <div
            className={`mx-3 mt-4 flex flex-col items-start md:mx-6 ${
              variant === POST_VARIANTS.sidebar ? 'gap-1' : 'gap-5'
            }`}
          >
            <div className="flex w-full items-start justify-between">
              <User
                name={post.profileName}
                description={postTime(post)}
                avatarProps={{ src: post.avatarUrl }}
                className="text-xl font-bold"
              />
              <div className="flex flex-col items-end">
                <Dropdown placement="bottom-start" className="w-[100px]">
                  <DropdownTrigger>
                    <Button
                      isIconOnly
                      className={`${variant === POST_VARIANTS.sidebar ? 'hidden' : 'text-2xl'}`}
                      variant="light"
                      onClick={() => toggleMenu()}
                    >
                      <IconDotsCircleHorizontal />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    {postOptions.map((option) => (
                      <DropdownItem key={option.label} onClick={option.onClick}>
                        {option.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <div
                  className={`${
                    isMenuOpen ? '' : 'hidden'
                  } absolute right-[30px] top-[55px] flex flex-col rounded-[8px] border border-gray-200`}
                >
                  <Button variant="light" className="h-[30px] w-[80px]" radius="none">
                    {t('hide')}
                  </Button>
                  <Button variant="light" className="h-[30px] w-[80px]" radius="none">
                    {t('report')}
                  </Button>
                </div>
              </div>
            </div>
            <span
              className={`${variant === POST_VARIANTS.sidebar ? 'text-md' : content.isBigContent ? 'text-2xl' : 'text-xl'}`}
            >
              {content.shortContent}
            </span>
            <Button
              variant="light"
              className={`w-fit text-gray-500 ${
                content.isNeedReadMore && variant !== POST_VARIANTS.sidebar ? '' : 'hidden'
              }`}
            >
              {t('read_more')}
            </Button>
            {variant === POST_VARIANTS.feed && <FCarousel items={items} />}
          </div>
          <div
            className={`flex h-[48px] w-full items-center justify-between border-t border-gray-200 ${
              variant === POST_VARIANTS.sidebar ? 'hidden' : ''
            }`}
          >
            <Button
              variant="light"
              startContent={isLiked ? <IconStarFilled /> : <IconStar />}
              className={`text-base font-semibold ${isLiked ? 'text-yellow-500' : ''} ${
                variant === POST_VARIANTS.feed ? 'md:ml-10' : ''
              }`}
              onClick={() => {
                setIsLiked(!isLiked)
              }}
            >
              {t('like')}
            </Button>
            <Button
              variant="light"
              startContent={<IconMessage />}
              className="text-base font-semibold"
            >
              {t('comment')}
            </Button>
            <Button
              variant="light"
              startContent={<IconShare3 />}
              className={`text-base font-semibold ${variant === POST_VARIANTS.feed ? 'md:mr-10' : ''}`}
            >
              {t('share')}
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default Post
