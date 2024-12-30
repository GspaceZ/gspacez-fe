import { IProfile } from '@/types/profile'
import { ReactNode } from 'react'

export interface HeaderProps {
  title: string
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

export interface BlankLayoutProps {
  children: ReactNode
}

export interface AuthLayoutProps {
  children: ReactNode
  disabledGuard?: boolean
}

export interface MainLayoutProps {
  children: ReactNode
  title: string
}

export interface TrendingSidebarProps {
  trendingPeople: IProfile[]
  isVisible: boolean
}

export interface ButtonOptionsProps {
  button: {
    name: string
    icon: ReactNode
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

export interface MessageLayoutProps {
  profile?: IProfile
  children: ReactNode
}
