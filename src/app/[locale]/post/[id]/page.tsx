'use client'

import { FIcon } from '@/components/common/FIcon'
import Post from '@/components/common/Post'
import MainLayout from '@/components/layouts/MainLayout'
import PostSkeleton from '@/components/posts/PostSkeleton'
import { usePost } from '@/hooks/usePost'
import { POST_VARIANTS } from '@/utils/constant/variants'
import { RootState } from '@/utils/store'
import { Button } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

const Page = () => {
  const params = useParams()
  const token = useSelector((state: RootState) => state.auth.token)
  const { getPost } = usePost()
  const router = useRouter()

  const { data: postData, isLoading: isPostLoading } = useQuery({
    queryKey: ['post', params.id as string],
    queryFn: () => getPost(params.id as string, token)
  })

  return (
    <MainLayout>
      <div className="mx-auto min-h-screen w-full max-w-[632px] overflow-y-auto border border-gray-200">
        <div className="flex flex-col gap-2">
          <Button
            startContent={<FIcon name="ArrowLeft" size={18} />}
            variant="light"
            onPress={() => router.back()}
            className="w-fit"
          >
            Back to previous page
          </Button>
          {isPostLoading ? (
            <PostSkeleton variant={POST_VARIANTS.feed} />
          ) : postData !== undefined && postData.data.code === 1000 ? (
            <Post post={postData?.data.result} />
          ) : (
            <span>This post is unavailable now.</span>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default Page
