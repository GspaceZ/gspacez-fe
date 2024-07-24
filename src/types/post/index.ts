import { PostPrivacyEnum, PostTypeEnum } from '@/utils/constant'
import { IProfile } from '../profile'

export interface IPost {
  id: string
  user: IProfile
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
}
