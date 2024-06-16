import { PostPrivacyEnum, PostTypeEnum } from '@/utils/constant'

export interface PostType {
  id: string
  authorId: string
  content: string
  type: PostTypeEnum
  privacy: PostPrivacyEnum
  createdAt: Date
}
