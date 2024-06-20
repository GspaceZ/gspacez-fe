import { PostType } from '@/types/post'
import { Profile } from '@/types/profile'

export interface PostProps {
  profile: Profile
  post: PostType
}

export interface OverlayProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}
