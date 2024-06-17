import { PostType } from '@/types/post'

export const postTime = (post: PostType): string => {
  const now = new Date()
  const postCreatedAt = new Date(post.createdAt)
  const timeDiff = now.getTime() - postCreatedAt.getTime()

  const seconds = Math.floor(timeDiff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) {
    return `${seconds}s ago`
  } else if (minutes < 60) {
    return `${minutes}m ago`
  } else if (hours < 24) {
    return `${hours}h ago`
  } else if (days < 7) {
    return `${days}d ago`
  } else {
    const postYear = postCreatedAt.getFullYear()
    const currentYear = now.getFullYear()
    if (postYear === currentYear) {
      const formattedDate = postCreatedAt.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric'
      })
      return `${formattedDate} ago`
    } else {
      const formattedDate = postCreatedAt.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
      return `${formattedDate} ago`
    }
  }
}
