import { PostPrivacyEnum, PostTypeEnum } from '@/utils/constant'

export interface IPost {
  id: string
  content: {
    text: string
    imageUrls: string[]
    videoUrls: string[]
    location: string
    feeling: string
    tag: string[]
  }
  comments: string[]
  reacts: string[]
  shares: string[]
  privacy: PostPrivacyEnum
  location: string
  type: PostTypeEnum
  createdAt: Date
  updatedAt: Date
  profileId: string
  profileName: string
  avatarUrl: string
  trendingPoint: number
  hidden: boolean
}
