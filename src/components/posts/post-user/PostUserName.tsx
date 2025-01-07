import { RootState } from '@/utils/store'
import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'
import { IPost } from '@/types/post'

const PostUserName: React.FC<{ post: IPost }> = ({ post }) => {
  const t = useTranslations('post')
  const { firstName, lastName } = useSelector((state: RootState) => state.user)

  return (
    <>
      {post.profileName || `${firstName} ${lastName}`}
      {(post.feeling || post.location) && (
        <>
          {' '}
          <span className="text-sm font-medium">
            {post.feeling && (
              <span>
                {t('is_feeling')} <span className="font-bold">{t(`feeling_mapping.${post.feeling}`)}</span>{' '}
              </span>
            )}
            {post.location && (
              <span>
                {t('at_location')} <span className="font-bold">{post.location}</span>
              </span>
            )}
          </span>
        </>
      )}
    </>
  )
}

export default PostUserName
