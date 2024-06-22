import { IPost } from '@/types/post'
import { IProfile } from '@/types/profile'

export interface PostProps {
  profile: IProfile
  post: IPost
}

export interface OverlayProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}
