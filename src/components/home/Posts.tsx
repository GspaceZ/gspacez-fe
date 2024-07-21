'use client'

import Post from '../common/Post'
import { POST_VARIANTS } from '@/utils/constant/variants'
import { PostsProps } from '@/types/props/home'

const Posts = ({ posts }: PostsProps) => {
  return (
    <div className="w-full flex flex-col items-center gap-4 mt-6">
      {posts.map((post) => {
        return <Post post={post} variant={POST_VARIANTS.feed} key={post.id} />
      })}
    </div>
  )
}

export default Posts
