'use client'

import Posts from '@/components/home/Posts'
import MainLayout from '@/components/layouts/MainLayout'
import PostModal from '@/components/posts/PostModal'
import NewPost from '@/components/profile/NewPost'
import ProfileInfo from '@/components/profile/ProfileInfo'
import { fullName } from '@/helpers/user/full-name'
import { fakePosts } from '@/mock/posts'
import ProfileAvatar from '@/public/profileAvatar.png'
import { IPost } from '@/types/post'
import { useAppSelector } from '@/utils/store'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

const Page: React.FC = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<IPost | undefined>(undefined)
  const user = useAppSelector((state) => state.user)
  const tTitle = useTranslations('title')

  const profileData = {
    avatar: ProfileAvatar.src,
    firstName: 'Fan',
    lastName: 'MU',
    shortDesc: 'Glory glory Man United',
    fullDesc: 'Glory glory gloryyyyyyyyyyyyyyyyy',
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

  return (
    <MainLayout title={tTitle('profile')}>
      <div className="flex w-full flex-col items-center">
        <div className="mx-auto min-h-screen w-screen max-w-[632px] border border-gray-200 bg-gray-50">
          <ProfileInfo
            avatar={profileData.avatar}
            name={fullName(profileData.firstName, profileData.lastName)}
            shortDesc={profileData.shortDesc}
            fullDesc={profileData.fullDesc}
            facebook={profileData.facebook}
            instagram={profileData.instagram}
          />
          <NewPost openModal={() => setIsPostModalOpen(true)} avatar={profileData.avatar} />
          <Posts posts={fakePosts} toggleEditPost={(postId) => handleSelectedPost(postId)} />
        </div>
        {isPostModalOpen && (
          <PostModal user={user} post={selectedPost} closePost={() => setIsPostModalOpen(false)} />
        )}
      </div>
    </MainLayout>
  )
}

export default Page
