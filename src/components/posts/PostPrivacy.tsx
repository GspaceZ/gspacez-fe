'use client'

import { ReactNode } from 'react'
import { FIcon } from '../common/FIcon'
import { FLink } from '../common/FLink'

interface Props {
  time: string
  privacy: string
  postId: string
}

export const PostPrivacy = ({ time, privacy, postId }: Props) => {
  const PrivacyIcons: Record<string, ReactNode> = {
    PUBLIC: <FIcon name="World" size={12} />,
    FRIENDS: <FIcon name="Friend" size={12} />,
    PRIVATE: <FIcon name="Lock" size={12} />
  }

  return (
    <FLink path={`/post/${postId}`}>
      <div className="flex items-center gap-1">
        <span>{time}</span>
        <FIcon name="PointFilled" size={6} />
        {PrivacyIcons[privacy]}
      </div>
    </FLink>
  )
}
