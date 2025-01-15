'use client'

import MainLayout from '@/components/layouts/MainLayout'
import { usePost } from '@/hooks/usePost'
import { RootState } from '@/utils/store'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import PostSkeleton from '@/components/posts/PostSkeleton'
import { POST_VARIANTS } from '@/utils/constant/variants'
import { TopicItem } from '@/components/trending-topics/TopicItem'

const Page = () => {
  const { getTrendingTopics } = usePost()
  const token = useSelector((state: RootState) => state.auth.token)

  const { data: trendingTopicsData, isLoading: isTrendingTopicsLoading } = useQuery({
    queryKey: ['trending-topics'],
    queryFn: () => getTrendingTopics(token)
  })

  return (
    <MainLayout>
      <div className="flex w-full flex-col items-center">
        <div className="mx-auto w-full max-w-[632px] rounded-lg bg-gray-50">
          <div className="pb-5">
            {isTrendingTopicsLoading ? (
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
                {trendingTopicsData?.data.result.map((topic) => (
                  <div key={topic.id}>
                    <TopicItem topic={topic} />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Page
