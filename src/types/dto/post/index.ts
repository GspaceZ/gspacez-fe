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
}

export type GetNewsfeedRequestDto = {
  pageNum: number
  pageSize: number
}

export type GetNewsfeedResponseDto = {
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

export type TogglePostResponseDto = {
  code: number
  message: string
  result: {
    postId: string
    hidden: boolean
  }
}

export type TrendingTopicItem = {
  id: string
  query: string
  exploreLink: string
  geo: string
  date: string
  formattedTraffic: number
  relatedQueries: string | null
  articles: {
    title: string
    timeAgo: string
    source: string
    url: string
    image: {
      newsUrl: string
      source: string
      imageUrl: string
    } | null
    spinet: string | null
  }[]
  status: string
  dateCreated: string
}

export type GetTrendingTopicsResponse = {
  code: number
  message: string
  result: TrendingTopicItem[]
}

export type GetPostResponseDto = {
  code: number
  message: string
  result: IPost
}
