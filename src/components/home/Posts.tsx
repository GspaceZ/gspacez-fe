'use client'

import Post from '../common/Post'
import { POST_VARIANTS } from '@/utils/constant/variants'
import PostSkeleton from '../posts/PostSkeleton'
import { IPost } from '@/types/post'

export interface PostsProps {
  posts: IPost[]
  toggleEditPost?: (postId: string) => void
  toggleSetPrivacyModal?: () => void
  toggleDeleteModal?: () => void
}

const Posts: React.FC<PostsProps> = ({
  posts,
  toggleEditPost,
  toggleSetPrivacyModal,
  toggleDeleteModal
}) => {
  const onEdit = (id: string) => {
    if (toggleEditPost !== undefined) {
      toggleEditPost(id)
    }
  }

  const onSetPrivacy = () => {
    if (toggleSetPrivacyModal !== undefined) {
      toggleSetPrivacyModal()
    }
  }

  const onDelete = () => {
    if (toggleDeleteModal !== undefined) {
      toggleDeleteModal()
    }
  }

  return (
    <div className="mt-6 flex w-full flex-col items-center gap-4">
      {posts.map((post) => {
        return (
          <Post
            post={post}
            variant={POST_VARIANTS.feed}
            key={post.id}
            toggleEditModal={() => onEdit(post.id)}
            togglePrivacyModal={onSetPrivacy}
            toggleDeleteModal={onDelete}
          />
        )
      })}
      <PostSkeleton variant={POST_VARIANTS.feed} />
    </div>
  )
}

export default Posts
