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
  posts: TrendingPostProps['post'][]
  trendingPeople: TrendingPeopleProps['user'][]
  buttons: ButtonOptionsProps['button'][]
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
