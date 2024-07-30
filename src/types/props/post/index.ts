import { IPost } from '@/types/post'
import { IProfile } from '@/types/profile'

export interface PostModalProps {
  user: IProfile
  post?: IPost
  closePost: () => void
}

export interface TagsProps {
  tags: string[]
}
