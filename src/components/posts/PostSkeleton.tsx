'use client'

import { POST_VARIANTS } from '@/utils/constant/variants'
import { Skeleton } from '@nextui-org/react'

interface PostSkeletonProps {
  variant: POST_VARIANTS
}

const PostSkeleton: React.FC<PostSkeletonProps> = ({ variant }) => {
  return (
    <div
      className={`w-full flex-col border border-gray-200 ${
        variant === POST_VARIANTS.feed
          ? 'max-w-[600px] rounded-lg bg-white'
          : variant === POST_VARIANTS.sidebar
            ? 'min-h-[100px] max-w-[448px] rounded-lg drop-shadow-md'
            : 'hidden'
      }`}
    >
      <div
        className={`mx-3 mt-4 flex flex-col items-start md:mx-6 ${
          variant === POST_VARIANTS.sidebar ? 'gap-1' : 'gap-5'
        }`}
      >
        <div className="flex w-full items-start justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex flex-col justify-start gap-2">
              <Skeleton className="h-4 w-[120px] rounded-full" />
              <Skeleton className="h-3 w-[60px] rounded-full" />
            </div>
          </div>
          {variant !== POST_VARIANTS.sidebar && <Skeleton className="h-10 w-10 rounded-full" />}
        </div>
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-6 w-2/3 rounded-full" />
          {variant !== POST_VARIANTS.sidebar && <Skeleton className="h-4 w-1/3 rounded-full" />}
        </div>

        {variant !== POST_VARIANTS.sidebar && (
          <>
            <Skeleton className="h-[400px] w-full rounded-lg" />
            <div className="flex h-[48px] w-full items-center justify-between border-t border-gray-200">
              <Skeleton
                className={`h-6 w-[80px] rounded-lg ${
                  variant === POST_VARIANTS.feed ? 'md:ml-10' : ''
                }`}
              />
              <Skeleton className="h-6 w-[80px] rounded-lg" />
              <Skeleton
                className={`h-6 w-[80px] rounded-lg ${
                  variant === POST_VARIANTS.feed ? 'md:mr-10' : ''
                }`}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PostSkeleton
