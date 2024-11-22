'use client'

import Posts from '@/components/home/Posts'
import MainLayout from '@/components/layouts/MainLayout'
import PostModal from '@/components/posts/PostModal'
import PrivacyModal from '@/components/posts/PrivacyModal'
import { fakePosts } from '@/mock/posts'
import ProfileAvatar from '@/public/profileAvatar.png'
import { IPost } from '@/types/post'
import { PostPrivacyEnum } from '@/utils/constant'
import { useAppSelector } from '@/utils/store'
import { useState } from 'react'
import { PageInfo } from '@/components/pages/PageInfo'
import NewPost from '@/components/profile/NewPost'
import { StartEvent } from '@/components/pages/StartEvent'
import { useTranslations } from 'next-intl'

const Page: React.FC = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)
  const [selectedPrivacy, setSelectedPrivacy] = useState<PostPrivacyEnum>(PostPrivacyEnum.PUBLIC)
  const [selectedPost, setSelectedPost] = useState<IPost | undefined>(undefined)
  const [isHost, setIsHost] = useState(true) // only set true for get host view
  const user = useAppSelector((state) => state.user)
  const t = useTranslations('pages')

  const pageData = {
    name: 'Fanpage MU',
    avatar: ProfileAvatar.src,
    shortDesc: 'Glory glory Man United',
    fullDesc: 'Glory glory gloryyyyyyyyyyyyyyyyy',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    link: '',
    host_ids: [1]
  }

  const togglePostModal = (post?: IPost) => {
    setSelectedPost(post)
    setIsPostModalOpen(true)
  }

  const getPostById = (postId: string): IPost => {
    const post = fakePosts.find((post) => post.id === postId)
    if (!post) {
      throw new Error(`Post with ID ${postId} not found`)
    }
    return post
  }

  const handleSelectedPost = (postId: string) => {
    try {
      const post = getPostById(postId)
      togglePostModal(post)
    } catch (error) {
      console.error(error instanceof Error ? error.message : 'An unknown error occurred')
    }
  }

  const togglePrivacyModal = () => {
    setIsPrivacyModalOpen(true)
  }

  const handleSavePrivacy = (privacy: PostPrivacyEnum) => {
    setSelectedPrivacy(privacy)
  }

  return (
    <MainLayout title={t('page')}>
      <div className="mx-auto min-h-screen w-full max-w-[632px] overflow-y-auto border border-gray-200 bg-gray-50">
        <div className="flex flex-col">
          <PageInfo
            avatar={pageData.avatar}
            shortDesc={pageData.shortDesc}
            name={pageData.name}
            fullDesc={pageData.fullDesc}
            facebook={pageData.facebook}
            instagram={pageData.instagram}
            link={pageData.link}
          />
          {isHost && (
            <>
              <NewPost openModal={() => setIsPostModalOpen(true)} avatar={pageData.avatar} />
              <StartEvent />
            </>
          )}
          <Posts
            posts={fakePosts}
            toggleEditPost={(postId) => handleSelectedPost(postId)}
            toggleSetPrivacyModal={togglePrivacyModal}
          />
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
      </div>
    </MainLayout>
  )
}

export default Page
