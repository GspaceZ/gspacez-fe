'use client'

import { GroupInfo } from '@/components/group/GroupInfo'
import Posts from '@/components/posts/Posts'
import MainLayout from '@/components/layouts/MainLayout'
import PostModal from '@/components/posts/PostModal'
import PrivacyModal from '@/components/posts/PrivacyModal'
import NewPost from '@/components/profile/NewPost'
import { fakePosts } from '@/mock/posts'
import GroupAvatar from '@/public/profileAvatar.png'
import { IPost } from '@/types/post'
import { PostPrivacyEnum } from '@/utils/constant'
import { useAppSelector } from '@/utils/store'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

const Page: React.FC = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<IPost | undefined>(undefined)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedPrivacy, setSelectedPrivacy] = useState<PostPrivacyEnum>(PostPrivacyEnum.PUBLIC)
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)
  const user = useAppSelector((state) => state.user)
  const groupData = {
    avatar: GroupAvatar.src,
    name: 'MU Fangroup',
    shortDescription: 'Glory glory Man United',
    fullDescription: 'Glory glory gloryyyyyyyyyyyyyyyyy'
  }
  const t = useTranslations('group')

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
    <MainLayout title={t('group')}>
      <div className="mx-auto min-h-screen max-w-[632px] overflow-y-auto border border-gray-200 bg-gray-50">
        <div className="flex flex-col">
          <GroupInfo
            avatar={groupData.avatar}
            name={groupData.name}
            shortDescription={groupData.shortDescription}
            fullDescription={groupData.fullDescription}
          />
        </div>
        <NewPost openModal={() => setIsPostModalOpen(true)} avatar={groupData.avatar} />
        <Posts
          posts={fakePosts}
          toggleEditPost={(postId) => handleSelectedPost(postId)}
          toggleSetPrivacyModal={togglePrivacyModal}
        />
        <PostModal
          isOpen={isPostModalOpen}
          user={user}
          post={selectedPost}
          closePost={() => setIsPostModalOpen(false)}
        />
        <PrivacyModal
          isOpen={isPrivacyModalOpen}
          onClose={() => setIsPrivacyModalOpen(false)}
          postId={selectedPost?.id || ''}
          onSave={handleSavePrivacy}
        />
      </div>
    </MainLayout>
  )
}

export default Page
