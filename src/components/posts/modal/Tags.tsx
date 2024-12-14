import { TagsProps } from '@/types/props/post'
import { useTranslations } from 'next-intl'

const Tags: React.FC<TagsProps> = ({ tags }) => {
  const t = useTranslations('post.modal')
  return (
    <div className="flex items-center gap-1">
      {t('tags')}
      {tags.map((tag: string) => {
        return (
          <span className="rounded-full bg-gray-200 px-2 py-1 text-sm font-bold" key={tag}>
            {tag}
          </span>
        )
      })}
    </div>
  )
}

export default Tags
