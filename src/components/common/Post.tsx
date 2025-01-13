'use client'

import { User } from '@nextui-org/user'
import * as React from 'react'
import { formattedContent } from '@/helpers/post/formatted-content'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import { FCarouselItemProps } from '@/types/props/common'
import { POST_VARIANTS } from '@/utils/constant/variants'
import FCarousel from './FCarousel'
import { IPost } from '@/types/post'
import { PostReacts } from '../posts/PostReacts'
import { usePost } from '@/hooks/usePost'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/store'
import { useMutation } from '@tanstack/react-query'
import { TogglePostResponseDto } from '@/types/dto/post'
import PostUserName from '../posts/post-user/PostUserName'
import { FIcon } from './FIcon'
import { useFToastContext } from './FToast'
import PostComments from '../posts/comments/PostComments'
import { PostPrivacy } from '../posts/PostPrivacy'
import { calculateTime } from '@/helpers/post/post-time'
import { pathWithLocale } from '@/helpers/url/path-with-locale'
import { usePathname, useRouter } from 'next/navigation'

interface PostProps {
  post: IPost
  variant?: POST_VARIANTS
  toggleEditModal?: () => void
  togglePrivacyModal?: () => void
  toggleDeleteModal?: (id: string) => void
}

const Post: React.FC<PostProps> = ({
  post,
  variant,
  toggleEditModal,
  togglePrivacyModal,
  toggleDeleteModal
}) => {
  const t = useTranslations('post')

  const token = useSelector((state: RootState) => state.auth.token)
  const { fToast } = useFToastContext()
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isRemoved, setIsRemoved] = useState(false)
  const [mediaFiles, setMediaFiles] = useState<FCarouselItemProps[]>([])
  const [timer, setTimer] = useState<number | null>(null)
  const { togglePost } = usePost()

  const content = formattedContent(post)

  const { isPending: isTogglePostPending, mutate: mutateTogglePost } = useMutation({
    mutationFn: async ({ id, dto, token }: { id: string; dto: null; token: string }) =>
      (await togglePost(id, dto, token)).data,

    onSuccess: ({ result }: TogglePostResponseDto) => {
      setIsHidden(result.hidden)
      fToast('Hide post successfully', 'success')
    },

    onError: () => {
      fToast('Hide post unsuccessfully', 'failed')
    }
  })

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleTogglePost = () => {
    setIsHidden(true)
    setIsRemoved(true)

    const timerId = window.setTimeout(() => {
      mutateTogglePost({ id: post.id, dto: null, token })
      setIsRemoved(false)
    }, 5000)

    setTimer(timerId)
  }

  const handleRestorePost = () => {
    if (timer) {
      clearTimeout(timer)
    }
    setIsHidden(false)
    setIsRemoved(false)
  }

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [timer])

  const handleEditPost = () => {
    if (toggleEditModal !== undefined) {
      toggleEditModal()
    }
  }

  const setPrivacy = () => {
    if (togglePrivacyModal !== undefined) {
      togglePrivacyModal()
    }
  }

  const handleDeletePost = () => {
    if (toggleDeleteModal !== undefined) {
      toggleDeleteModal(post.id)
    }
  }

  const viewPost = () => {
    const handleRedirect = (path: string) => {
      const destinationPath = pathWithLocale(pathname, path)
      router.push(destinationPath)
    }

    handleRedirect(`/post/${post.id}`)
  }

  const postOptions = [
    {
      label: 'View post',
      onPress: viewPost
    },
    {
      label: t('options.hide'),
      onPress: handleTogglePost
    },
    {
      label: t('options.privacy'),
      onPress: setPrivacy
    },
    {
      label: t('options.edit'),
      onPress: handleEditPost
    },
    {
      label: t('options.delete'),
      onPress: handleDeletePost
    }
  ]

  useEffect(() => {
    const imageFiles = post.content.imageUrls
      ? post.content.imageUrls.map((url) => {
          return {
            url,
            id: url,
            type: 'image'
          }
        })
      : []

    const videoFiles = post.content.videoUrls
      ? post.content.videoUrls.map((url) => {
          return {
            url,
            id: url,
            type: 'video'
          }
        })
      : []

    setMediaFiles([...imageFiles, ...videoFiles])
  }, [post])

  return (
    <>
      {isHidden ? (
        isRemoved ? (
          <div className="w-full max-w-[600px] rounded-lg border border-gray-200 bg-white">
            <div className="mx-3 my-2 flex flex-col">
              <span>{t('toggle.hide')}</span>
              <Button
                isLoading={isTogglePostPending}
                onPress={handleRestorePost}
                disabled={isTogglePostPending}
              >
                {t('toggle.restore')}
              </Button>
            </div>
          </div>
        ) : null
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
                name={<PostUserName post={post} />}
                description={
                  <PostPrivacy
                    time={calculateTime(post.createdAt)}
                    privacy={post.privacy}
                    postId={post.id}
                  />
                }
                avatarProps={{ src: post.avatarUrl }}
                className="text-xl font-black"
              />
              <div className="flex flex-col items-end">
                <Dropdown placement="bottom-start" className="w-[100px]">
                  <DropdownTrigger>
                    <Button
                      isIconOnly
                      className={`${variant === POST_VARIANTS.sidebar ? 'hidden' : 'text-2xl'}`}
                      variant="light"
                      onPress={() => toggleMenu()}
                    >
                      <FIcon name="DotsCircleHorizontal" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    {postOptions.map((option) => (
                      <DropdownItem key={option.label} onPress={option.onPress}>
                        {option.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <span
              className={`${variant === POST_VARIANTS.sidebar ? 'text-md' : content.isBigContent ? 'text-2xl' : 'text-xl'} text-wrap break-all`}
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
            {variant === POST_VARIANTS.feed && <FCarousel items={mediaFiles} />}
          </div>
          <div
            className={`flex h-[48px] w-full items-center justify-between border-t border-gray-200 ${
              variant === POST_VARIANTS.sidebar ? 'hidden' : ''
            }`}
          >
            <PostReacts variant={variant} id={post.id} />
            <PostComments id={post.id} />
            <Button
              variant="light"
              startContent={<FIcon name="Share3" />}
              className={`grow font-semibold ${variant === POST_VARIANTS.feed ? 'md:mr-10' : ''}`}
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
