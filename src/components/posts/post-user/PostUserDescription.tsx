import { postTime } from '@/helpers/post/post-time'
import { IPost } from '@/types/post'

const PostUserDescription: React.FC<{ post: IPost; privacyIcon?: JSX.Element }> = ({
  post,
  privacyIcon
}) => (
  <div className="flex items-center gap-2">
    <span>{postTime(post)}</span>
    {privacyIcon}
  </div>
)

export default PostUserDescription
