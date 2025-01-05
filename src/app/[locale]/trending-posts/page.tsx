'use client'

import MainLayout from '@/components/layouts/MainLayout'
import { usePost } from '@/hooks/usePost'
import { RootState } from '@/utils/store'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import PostSkeleton from '@/components/posts/PostSkeleton'
import { POST_VARIANTS } from '@/utils/constant/variants'
import Posts from '@/components/posts/Posts'

const Page = () => {
  const { getTrendingPosts } = usePost()
  const token = useSelector((state: RootState) => state.auth.token)

  const { data: trendingPostsData, isLoading: isTrendingPostsLoading } = useQuery({
    queryKey: ['trending-posts'],
    queryFn: () => getTrendingPosts(token)
  })

  return (
    <MainLayout title="Trending Posts">
      <div className="flex w-full flex-col items-center">
        <div className="mx-auto w-full max-w-[632px] rounded-lg bg-gray-50">
          <div className="pb-5">
            {isTrendingPostsLoading ? (
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
              <Posts posts={trendingPostsData?.data.result} />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Page
