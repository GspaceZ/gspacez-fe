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

export interface FCarouselItemProps {
  id: string
  url: string
  type: string
  error?: boolean
}

export interface FVideoProps {
  src: string
  className?: string
  onError: () => void
}

export interface MediaFile {
  file: File
  url: string
  preview?: string
}
