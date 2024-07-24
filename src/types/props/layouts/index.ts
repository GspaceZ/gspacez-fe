import { IPost } from '@/types/post'
import { IProfile } from '@/types/profile'
import { IUser } from '@/types/user'

export interface HeaderProps {
  title: string
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

export interface BlankLayoutProps {
  children: React.ReactNode
}

export interface AuthLayoutProps {
  children: React.ReactNode
}

export interface MainLayoutProps {
  children: React.ReactNode
  title: string
}

export interface TrendingSidebarProps {
  posts: IPost[]
  trendingPeople: IProfile[]
  isVisible: boolean
}

export interface ButtonOptionsProps {
  button: {
    name: string
    icon: string
    path: string
    count?: number
  }
  onClick?: () => void
  isActive?: boolean
}

export interface TrendingPeopleProps {
  user: {
    name: string
    profileImage: string
  }
}

export interface TrendingPostProps {
  post: {
    name: string
    time: string
    profileImage: string
    content: string
  }
}
