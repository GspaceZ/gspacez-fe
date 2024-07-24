'use client'

import { POST_VARIANTS } from '@/utils/constant/variants'
import { Skeleton } from '@nextui-org/react'

interface PostSkeletonProps {
  variant: POST_VARIANTS
}

const PostSkeleton: React.FC<PostSkeletonProps> = ({ variant }) => {
  return (
    <div
      className={`w-full border border-gray-200 flex-col ${
        variant === POST_VARIANTS.feed
          ? 'max-w-[600px] rounded-lg bg-white'
          : variant === POST_VARIANTS.sidebar
          ? 'max-w-[448px] rounded-lg min-h-[220px] drop-shadow-md'
          : 'hidden'
      }`}
    >
      <div
        className={`mx-3 md:mx-6 mt-4 flex flex-col items-start ${
          variant === POST_VARIANTS.sidebar ? 'gap-1' : 'gap-5'
        }`}
      >
        <div className="flex justify-between w-full items-start">
          <div className="flex gap-2 items-center">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex flex-col gap-2 justify-start">
              <Skeleton className="w-[120px] h-4 rounded-full" />
              <Skeleton className="w-[60px] h-3 rounded-full" />
            </div>
          </div>
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="w-2/3 h-6 rounded-full" />
          <Skeleton className="w-1/3 h-4 rounded-full" />
        </div>
        <Skeleton className="w-full h-[400px] rounded-lg" />
        <div className="w-full h-[48px] border-t border-gray-200 items-center flex justify-between">
          <Skeleton
            className={`w-[80px] h-6 rounded-lg ${
              variant === POST_VARIANTS.feed ? 'md:ml-10' : ''
            }`}
          />
          <Skeleton className="w-[80px] h-6 rounded-lg" />
          <Skeleton
            className={`w-[80px] h-6 rounded-lg ${
              variant === POST_VARIANTS.feed ? 'md:mr-10' : ''
            }`}
          />
        </div>
      </div>
    </div>
  )
}

export default PostSkeleton
