'use client'

import { NotificationCommentEntity } from '@/types/dto/notification'

interface Props {
  noti: NotificationCommentEntity
}

export const NotiComment = ({ noti }: Props) => {
  const truncatedText =
    noti.commentRequest.content.text.length > 100
      ? `${noti.commentRequest.content.text.slice(0, 100)}...`
      : noti.commentRequest.content.text

  return (
    <div className="mt-1">
      <span className="text-xs text-gray-500">{truncatedText}</span>
    </div>
  )
}
