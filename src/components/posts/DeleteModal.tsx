'use client'

import { Button, Modal, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onSave }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="font-bold">Do you really want to delete this post?</ModalHeader>
            <ModalFooter>
              <Button variant="ghost" onClick={() => onClose()}>
                Cancel
              </Button>
              <Button color="danger" onClick={() => onSave()}>
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
