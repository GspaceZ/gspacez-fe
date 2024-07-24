import { IPost } from '@/types/post'

interface ContentProps {
  isBigContent: boolean
  isNeedReadMore: boolean
  shortContent: string
  fullContent: string
}

export const formattedContent = (post: IPost): ContentProps => {
  const isBigContent = post.content.text.length <= 50
  const isNeedReadMore = post.content.text.length >= 200

  let shortContent: string

  if (isNeedReadMore) {
    const maxCharCount = Math.min(200, post.content.text.lastIndexOf(' ') + 1)
    shortContent = post.content.text.substring(0, maxCharCount) + '...'
  } else {
    shortContent = post.content.text
  }

  const fullContent = post.content.text
  return { isBigContent, isNeedReadMore, shortContent, fullContent }
}
