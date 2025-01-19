'use client'

import { Avatar, Image } from '@nextui-org/react'
import FVideo from '@/components/common/FVideo'
import { calculateTime } from '@/helpers/post/post-time'
import { useState } from 'react'
import { IComment } from '@/types/post'
import CommentTextarea from './CommentTextArea'
import { useTranslations } from 'next-intl'

interface CommentItemProps {
  comment: IComment
  replies: IComment[]
  onReply: (parentId: string, content: string) => void
  postId: string
}

const CommentItem = ({ comment, replies, onReply, postId }: CommentItemProps) => {
  const t = useTranslations('post.comment_modal')
  const [expanded, setExpanded] = useState(false)
  const [expandedReply, setExpandedReply] = useState(false)
  const toggleReplies = () => setExpanded(!expanded)
  const toggleReplyTextarea = () => setExpandedReply(!expandedReply)

  return (
    <div className="mb-4 w-full p-3">
      <div className="flex items-start gap-3">
        <Avatar radius="full" size="md" src={comment.profileImageUrl} alt="" />
        <div className="flex flex-grow flex-col">
          <div className="flex items-center">
            <h5 className="text-sm font-semibold">{comment.profileName}</h5>
            <span className="ml-2 text-xs text-gray-500">{calculateTime(comment.createdAt)}</span>
          </div>
          <p className="mt-1 text-sm text-gray-800">{comment.content.text}</p>

          <div className="mt-2 flex gap-3">
            {[
              ...comment.content.images.map((image, index) => ({
                id: `image-${index}`,
                url: image,
                type: 'image'
              })),
              ...comment.content.videos.map((video, index) => ({
                id: `video-${index}`,
                url: video,
                type: 'video'
              }))
            ].map((item) =>
              item.type === 'image' ? (
                <Image
                  key={item.id}
                  src={item.url}
                  alt={`Image ${item.id}`}
                  className="rounded-lg border border-gray-300"
                  width={100}
                  height={120}
                />
              ) : (
                <FVideo
                  key={item.id}
                  src={item.url}
                  className="h-[120px] w-[100px] rounded-lg border border-gray-300"
                  onError={() => console.error(`Video ${item.id} failed to load.`)}
                />
              )
            )}
          </div>

          <div className="mt-2 flex items-center">
            {replies.length > 0 && (
              <button onClick={toggleReplies} className="text-sm">
                {expanded ? t('hide_replies') : t('view_all_replies')}
              </button>
            )}
            <button onClick={toggleReplyTextarea} className="ml-4 text-sm">
              {expandedReply ? t('cancel_reply') : t('reply')}
            </button>
          </div>

          {expanded &&
            replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                replies={reply.replies || []}
                onReply={onReply}
                postId={postId}
              />
            ))}

          {expandedReply && (
            <div className="mt-3">
              <CommentTextarea
                onSend={(content) => onReply(comment.id, content)}
                postId={postId}
                commentId={comment.id}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentItem
