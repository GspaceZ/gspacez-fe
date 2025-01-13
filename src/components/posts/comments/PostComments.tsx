'use client'

import { FIcon } from '@/components/common/FIcon'
import { usePost } from '@/hooks/usePost'
import { RootState } from '@/utils/store'
import { Button, Modal, ModalHeader, ModalBody, ModalContent, ModalFooter } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useSelector } from 'react-redux'
import { useDisclosure } from '@nextui-org/react'
import { IComment } from '@/types/post'
import CommentItem from './CommentItem'
import CommentTextarea from './CommentTextArea'

interface Props {
  id: string
}

const PostComments = ({ id }: Props) => {
  const t = useTranslations('post')
  const token = useSelector((state: RootState) => state.auth.token)
  const { getCommentsOfPost } = usePost()

  const { data: commentsData, isLoading } = useQuery({
    queryKey: ['postComments', id],
    queryFn: () => getCommentsOfPost(id, token),
    enabled: !!id && !!token
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

      <Modal
        backdrop="opaque"
        classNames={{
          backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20'
        }}
        isOpen={isOpen}
        onOpenChange={onClose}
      >
        <ModalContent className="max-w-2xl">
          <ModalHeader className="flex flex-col gap-1">{t('comment')}</ModalHeader>
          <ModalBody>
            <div className="flex max-h-[60vh] flex-col items-start space-y-4 overflow-y-auto p-4">
              {!isLoading && commentTree.length > 0 ? (
                renderComments(commentTree)
              ) : (
                <p>{t('comment_modal.no_comment')}</p>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <CommentTextarea onSend={(content) => console.log(content)} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default PostComments
