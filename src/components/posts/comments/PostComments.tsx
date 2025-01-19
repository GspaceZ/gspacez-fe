'use client'

import { FIcon } from '@/components/common/FIcon'
import { usePost } from '@/hooks/usePost'
import { RootState } from '@/utils/store'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'
import { Button, useDisclosure } from '@nextui-org/react'
import { IComment, IPost } from '@/types/post'
import CommentItem from './CommentItem'
import CommentTextarea from './CommentTextArea'
import { FModal } from '@/components/common/modals/FModal'
import Post from '@/components/common/Post'
import { POST_VARIANTS } from '@/utils/constant/variants'

interface CommentProps {
  post: IPost
}

const PostComments = ({ post }: CommentProps) => {
  const t = useTranslations('post')
  const token = useSelector((state: RootState) => state.auth.token)
  const { getCommentsOfPost } = usePost()

  const { data: commentsData, isLoading } = useQuery({
    queryKey: ['postComments', post.id],
    queryFn: () => getCommentsOfPost(post.id, token),
    enabled: !!post.id && !!token
  })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const buildCommentTree = (comments: IComment[]): IComment[] => {
    const commentMap: Record<string, IComment> = {}
    const roots: IComment[] = []

    comments.forEach((comment) => {
      commentMap[comment.id] = { ...comment, replies: [] }
    })

    comments.forEach((comment) => {
      if (comment.parentId) {
        if (commentMap[comment.parentId]) {
          commentMap[comment.parentId].replies!.push(commentMap[comment.id])
        }
      } else {
        roots.push(commentMap[comment.id])
      }
    })

    return roots
  }

  const commentTree = buildCommentTree(commentsData?.data.result || [])

  const renderComments = (comments: IComment[]) =>
    comments.map((comment) => (
      <CommentItem
        key={comment.id}
        comment={comment}
        replies={comment.replies || []}
        onReply={(parentId: string, content: string) => {
          console.log(`Replying to comment with id ${parentId}: ${content}`)
        }}
        postId={post.id}
      />
    ))

  return (
    <>
      <Button
        variant="light"
        startContent={<FIcon name="Message" />}
        className="grow font-semibold"
        onPress={onOpen}
      >
        {t('comment')}
      </Button>

      <FModal
        id={`post-comments-${post.id}`}
        title={t('comment')}
        content={
          <div className="max-h-[600px] max-w-none overflow-y-auto">
            <Post post={post} variant={POST_VARIANTS.feed} className="max-w-none" />
            <div className="flex max-h-[60vh] flex-col items-start space-y-4 p-4">
              {!isLoading && commentTree.length > 0 && renderComments(commentTree)}
            </div>
          </div>
        }
        footer={<CommentTextarea onSend={(content) => console.log(content)} postId={post.id} />}
        isOpen={isOpen}
        onClose={() => onClose()}
      />
    </>
  )
}

export default PostComments
