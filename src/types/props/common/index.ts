import { IPost } from '@/types/post'
import { IProfile } from '@/types/profile'
import { POST_VARIANTS } from '@/utils/constant/variants'

export interface PostProps {
  post: IPost
  variant?: POST_VARIANTS
}

export interface OverlayProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

export interface FImageProps {
  src: string
  alt: string
  className?: string
}

export interface ShowPasswordProps {
  isVisible: boolean
  toggleShowPassword: () => void
}
