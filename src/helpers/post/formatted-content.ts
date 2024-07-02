import { IPost } from '@/types/post'

interface ContentProps {
  isBigContent: boolean
  isNeedReadMore: boolean
  shortContent: string
  fullContent: string
}

export const formattedContent = (post: IPost): ContentProps => {
  const isBigContent = post.content.length <= 50
  const isNeedReadMore = post.content.length >= 200

  let shortContent: string

  if (isNeedReadMore) {
    const maxCharCount = Math.min(200, post.content.lastIndexOf(' ') + 1)
    shortContent = post.content.substring(0, maxCharCount) + '...'
  } else {
    shortContent = post.content
  }

  const fullContent = post.content
  return { isBigContent, isNeedReadMore, shortContent, fullContent }
}
