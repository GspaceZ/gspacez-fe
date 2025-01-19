'use client'

import { Textarea, Button, Avatar } from '@nextui-org/react'
import { FIcon } from '@/components/common/FIcon'
import { useState } from 'react'
import LandingAvatar from '@/public/landingAvatar.png'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { usePost } from '@/hooks/usePost'
import { useFToastContext } from '@/components/common/FToast'
import { CommentPostRequestDto, CommentPostResponseDto } from '@/types/dto/post'
import { useTranslations } from 'next-intl'

interface CommentTextareaProps {
  onSend: (content: string) => void
  postId: string
  commentId?: string
}

const CommentTextarea = ({ onSend, postId, commentId }: CommentTextareaProps) => {
  const t = useTranslations('post.comment_modal')
  const avaUrl = useSelector((state: RootState) => state.user.avtUrl)
  const token = useSelector((state: RootState) => state.auth.token)
  const [content, setContent] = useState('')
  const { commentPost } = usePost()
  const queryClient = useQueryClient()
  const { fToast } = useFToastContext()

  const { isPending, mutate: mutateComment } = useMutation({
    mutationFn: async (dto: CommentPostRequestDto) => {
      const response = await commentPost(postId, dto, token)
      return response.data.result
    },

    onSuccess: (result: CommentPostResponseDto['result']) => {
      queryClient.setQueryData(
        ['postComments', postId],
        (oldData: { data: { result: CommentPostResponseDto[] } } | undefined) => {
          if (!oldData || oldData.data.result.length === 0) {
            return {
              data: {
                result: [result.comments[result.comments.length - 1]]
              }
            }
          }

          return {
            ...oldData,
            data: {
              ...oldData.data,
              result: [...oldData.data.result, result.comments[result.comments.length - 1]]
            }
          }
        }
      )

      onSend(result.content.text)
      setContent('')
    },

    onError: () => {
      fToast('Comment to post unsuccessfully', 'danger')
    }
  })

  const handleSend = () => {
    if (!content.trim()) return

    const dto: CommentPostRequestDto = {
      comment: {
        content: {
          text: content,
          imageUrls: [],
          videoUrls: []
        },
        parentId: commentId ? commentId : ''
      }
    }

    mutateComment(dto)
  }

  return (
    <div className="relative flex w-full gap-3">
      <Avatar radius="full" size="md" src={avaUrl} alt={LandingAvatar.src} />
      <div className="relative flex flex-grow flex-col">
        <Textarea
          label={t('write_comment')}
          className="w-full"
          minRows={2}
          variant="bordered"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isPending}
        />
        <Button
          onClick={handleSend}
          isDisabled={isPending || !content.trim()}
          className="absolute bottom-2 right-2 flex items-center justify-center rounded-full border-none bg-white p-1"
        >
          {isPending ? <FIcon name="Loader" size={20} /> : <FIcon name="Send" size={20} />}
        </Button>
      </div>
    </div>
  )
}

export default CommentTextarea
