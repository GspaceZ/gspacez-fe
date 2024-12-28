import { IPost } from '@/types/post'

export type CreatePostRequestDto = {
  text?: string | null
  imageUrls?: string[]
  videoUrls?: string[]
  feeling?: string | null
  hashTags?: string[]
  privacy?: string | null
  location?: string | null
}

export type CreatePostResponseDto = {
  code: number
  message: string
  result: {
    id: string
    profileId: string
    content: {
      text: string
      imageUrls: string[] | null
      videoUrls: string[] | null
      activity: string | null
    }
  }
  privacy: string
  hashTags: string[] | null
  location: string | null
  feeling: string | null
  type: string
  trendingPoint: number
  createdAt: Date
  updatedAt: Date
  hidden: boolean
}

export type GetNewsfeedResponseDto = {
  code: number
  message: string
  result: IPost[]
}

export type GetTrendingPostsResponseDto = {
  code: number
  message: string
  result: IPost[]
}

export type UpdatePostRequestDto = {
  text?: string | null
  imageUrls?: string[]
  videoUrls?: string[]
  feeling?: string | null
  hashTags?: string[]
  privacy?: string | null
  location?: string | null
}

export type UpdatePostResponseDto = {
  code: number
  message: string
  result: {
    id: string
    profileId: string
    content: {
      text: string
      imageUrls: string[] | null
      videoUrls: string[] | null
      activity: string | null
    }
  }
  privacy: string
  hashTags: string[] | null
  location: string | null
  feeling: string | null
  type: string
  trendingPoint: number
  createdAt: Date
  updatedAt: Date
  hidden: boolean
}

export type ReactPostRequestDto = {
  reactType: string
}

export type ReactPostResponseDto = {
  code: number
  message: string
  result: {
    currentReact: {
      reactionId: string
      entityId: string
      entityType: string
      profileId: string
      profileName: string
      reactType: string
      createdAt: Date
    } | null
    reactNum: number
  }
}

export type DeletePostResponseDto = {
  code: number
  message: string
}
