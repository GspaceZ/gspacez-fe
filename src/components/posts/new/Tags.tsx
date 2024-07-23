import { TagsProps } from '@/types/props/post'
import { useTranslations } from 'next-intl'

const Tags: React.FC<TagsProps> = ({ tags }) => {
  const t = useTranslations('post.new')
  return (
    <div className="flex gap-1 items-center">
      {t('tags')}
      {tags.map((tag) => {
        return (
          <span className="py-1 px-2 font-bold bg-gray-200 rounded-full" key={tag}>
            {tag}
          </span>
        )
      })}
    </div>
  )
}

export default Tags
