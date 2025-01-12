'use client'

import FImage from '@/components/common/FImage'
import PostModal from '@/components/posts/PostModal'
import PrivacyModal from '@/components/posts/PrivacyModal'
import Posts from '@/components/posts/Posts'
import MainLayout from '@/components/layouts/MainLayout'
import { RootState, useAppSelector } from '@/utils/store'
import { Button } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useState, useEffect, useRef } from 'react'
import { IPost } from '@/types/post'
import { PostPrivacyEnum } from '@/utils/constant'
import { DeleteModal } from '@/components/posts/DeleteModal'
import { useQuery } from '@tanstack/react-query'
import { usePost } from '@/hooks/usePost'
import PostSkeleton from '@/components/posts/PostSkeleton'
import { POST_VARIANTS } from '@/utils/constant/variants'
import { FIcon } from '@/components/common/FIcon'

const Page = () => {
  const t = useTranslations('title')
  const tPost = useTranslations('post')

  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<IPost | undefined>(undefined)
  const [pageId, setPageId] = useState<number>(1)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedPrivacy, setSelectedPrivacy] = useState<PostPrivacyEnum>(PostPrivacyEnum.PUBLIC)
  const { getNewsfeed } = usePost()
  const user = useAppSelector((state) => state.user)
  const token = useAppSelector((state: RootState) => state.auth.token)
  const [currPostId, setCurrPostId] = useState<string>('')
  const loadMoreSkeletonRef = useRef<HTMLDivElement | null>(null)
  const [allPosts, setAllPosts] = useState<IPost[]>([])
  const [currentScroll, setCurrentScroll] = useState<number>(0)
  const [imageUrl, setImageUrl] = useState<string>('')

  const { data: newsfeedData, isLoading: newsfeedLoading } = useQuery({
    queryKey: ['newsfeed', pageId],
    queryFn: () => getNewsfeed({ pageNum: pageId, pageSize: 5 }, token)
  })

  useEffect(() => {
    setImageUrl(
      user.avtUrl ||
        'https://res.cloudinary.com/dszkt92jr/image/upload/v1719943637/vcbhui3dxeusphkgvycg.png'
    )
  }, [user.avtUrl])

  const getPostById = (postId: string): IPost => {
    const post = newsfeedData?.data.result.find((post) => post.id === postId)
    if (!post) {
      throw new Error(`Post with ID ${postId} not found`)
    }
    return post
  }

  const togglePostModal = (post?: IPost) => {
    setSelectedPost(post)
    setIsPostModalOpen(true)
  }

  const togglePrivacyModal = () => {
    setIsPrivacyModalOpen(true)
  }

  const toggleDeleteModal = (id: string) => {
    setCurrPostId(id)
    setIsDeleteModalOpen(true)
  }

  const handleSelectedPost = (postId: string) => {
    try {
      const post = getPostById(postId)
      togglePostModal(post)
    } catch (error) {
      console.error(error instanceof Error ? error.message : 'An unknown error occurred')
    }
  }

  const handleSavePrivacy = (privacy: PostPrivacyEnum) => {
    setSelectedPrivacy(privacy)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPageId((prev) => prev + 1)
          setCurrentScroll(window.scrollY)
        }
      },
      { threshold: 1.0 }
    )

    if (loadMoreSkeletonRef.current) {
      observer.observe(loadMoreSkeletonRef.current)
    }

    return () => {
      if (loadMoreSkeletonRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(loadMoreSkeletonRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const res = newsfeedData?.data.result
    if (res) {
      setAllPosts((prev) => {
        return [...prev, ...res]
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsfeedData])

  useEffect(() => {
    if (pageId > 2) {
      window.scrollTo(0, currentScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allPosts])

  return (
    <MainLayout title={t('home')}>
      <div className="flex w-full flex-col items-center">
        <div className="mx-auto w-full max-w-[632px] rounded-lg bg-gray-50">
          <div className="mt-4 flex items-center p-4">
            {imageUrl && <FImage src={imageUrl} alt="Avatar" className="h-12 w-12" />}
            <Button
              className="ml-4 grow bg-gray-200 text-gray-700"
              onPress={() => togglePostModal()}
            >
              {tPost('create_placeholder')}
            </Button>
          </div>
          <div className="pb-[20px]">
            {newsfeedLoading && pageId < 2 ? (
              <div className="mt-6 flex w-full flex-col items-center gap-4">
                {Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="flex w-full justify-center">
                      <PostSkeleton variant={POST_VARIANTS.feed} />
                    </div>
                  ))}
              </div>
            ) : (
              <>
                <Posts
                  posts={allPosts.filter((post) => !post.hidden)}
                  toggleEditPost={(postId) => handleSelectedPost(postId)}
                  toggleSetPrivacyModal={togglePrivacyModal}
                  toggleDeleteModal={toggleDeleteModal}
                />
              </>
            )}
            <div
              ref={loadMoreSkeletonRef}
              className="flex h-[200px] w-full items-center justify-center"
            >
              <FIcon name="Loader" size={24} />
            </div>
          </div>
        </div>
        <PostModal
          isOpen={isPostModalOpen}
          user={user}
          post={selectedPost}
          closePost={() => setIsPostModalOpen(false)}
        />
        <PrivacyModal
          isOpen={isPrivacyModalOpen}
          onClose={() => setIsPrivacyModalOpen(false)}
          onSave={handleSavePrivacy}
        />
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          id={currPostId}
        />
      </div>
    </MainLayout>
  )
}

export default Page
