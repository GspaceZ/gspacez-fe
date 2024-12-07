'use client'

import Posts from '@/components/home/Posts'
import MainLayout from '@/components/layouts/MainLayout'
import PostModal from '@/components/posts/PostModal'
import PrivacyModal from '@/components/posts/PrivacyModal'
import NewPost from '@/components/profile/NewPost'
import ProfileInfo from '@/components/profile/ProfileInfo'
import { fullName } from '@/helpers/user/full-name'
import { fakePosts } from '@/mock/posts'
import ProfileAvatar from '@/public/profileAvatar.png'
import { IPost } from '@/types/post'
import { PostPrivacyEnum } from '@/utils/constant'
import { useAppSelector } from '@/utils/store'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

const Page: React.FC = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedPrivacy, setSelectedPrivacy] = useState<PostPrivacyEnum>(PostPrivacyEnum.PUBLIC)
  const [selectedPost, setSelectedPost] = useState<IPost | undefined>(undefined)
  const user = useAppSelector((state) => state.user)
  const tTitle = useTranslations('title')

  const profileData = {
    avatar: ProfileAvatar.src,
    firstName: 'Fan',
    lastName: 'MU',
    shortDescription: 'Glory glory Man United',
    fullDescription: 'Glory glory gloryyyyyyyyyyyyyyyyy',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com'
  }

  const getPostById = (postId: string): IPost => {
    const post = fakePosts.find((post) => post.id === postId)
    if (!post) {
      throw new Error(`Post with ID ${postId} not found`)
    }
    return post
  }

  const togglePostModal = (post?: IPost) => {
    setSelectedPost(post)
    setIsPostModalOpen(true)
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
    <MainLayout title={tTitle('profile')}>
      <div className="flex w-full flex-col items-center">
        <div className="mx-auto min-h-screen w-screen max-w-[632px] border border-gray-200 bg-gray-50">
          <ProfileInfo
            avatar={profileData.avatar}
            name={fullName(profileData.firstName, profileData.lastName)}
            shortDescription={profileData.shortDescription}
            fullDescription={profileData.fullDescription}
            facebook={profileData.facebook}
            instagram={profileData.instagram}
          />
          <NewPost openModal={() => setIsPostModalOpen(true)} avatar={profileData.avatar} />
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
