import { IProfile } from '@/types/profile'

export interface NewPostProps {
  user: IProfile
  closePost: () => void
}

export interface TagsProps {
  tags: string[]
}
