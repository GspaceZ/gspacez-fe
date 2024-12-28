'use client'

import { queryClient } from '@/app/providers'
import { fToast } from '@/helpers/toast'
import { usePost } from '@/hooks/usePost'
import { GetNewsfeedResponseDto } from '@/types/response/post'
import { RootState } from '@/utils/store'
import { Button, Modal, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  id: string
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, id }) => {
  const { deletePost } = usePost()
  const token = useSelector((state: RootState) => state.auth.token)

  const { mutate: mutateDeletePost } = useMutation({
    mutationFn: () => deletePost(id, token),
    onSuccess: () => {
      fToast('Delete post successfully', 'success')
      queryClient.setQueryData(['newsfeed'], (posts: GetNewsfeedResponseDto | undefined) => {
        if (!posts) return posts
        return {
          ...posts,
          result: posts.result.filter((post) => post.id !== id)
        }
      })
      onClose()
    },
    onError: () => {
      fToast('Delete post failed', 'error')
      onClose()
    }
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="font-bold">Do you really want to delete this post?</ModalHeader>
            <ModalFooter>
              <Button variant="ghost" onPress={() => onClose()}>
                Cancel
              </Button>
              <Button color="danger" onPress={() => mutateDeletePost()}>
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
