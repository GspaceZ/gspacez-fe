'use client'

import Post from '../common/Post'
import { POST_VARIANTS } from '@/utils/constant/variants'
import { IPost } from '@/types/post'

export interface PostsProps {
  posts: IPost[] | undefined
  toggleEditPost?: (postId: string) => void
  toggleSetPrivacyModal?: (id: string) => void
  toggleDeleteModal?: (id: string) => void
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

  const onSetPrivacy = (id: string) => {
    if (toggleSetPrivacyModal !== undefined) {
      toggleSetPrivacyModal(id)
    }
  }

  const onDelete = (id: string) => {
    if (toggleDeleteModal !== undefined) {
      toggleDeleteModal(id)
    }
  }

  return (
    <div className="mt-6 flex w-full flex-col items-center gap-4">
      {posts &&
        posts.map((post) => {
          return (
            <Post
              post={post}
              variant={POST_VARIANTS.feed}
              key={post.id}
              toggleEditModal={() => onEdit(post.id)}
              togglePrivacyModal={() => onSetPrivacy(post.id)}
              toggleDeleteModal={onDelete}
            />
          )
        })}
    </div>
  )
}

export default Posts
