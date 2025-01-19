import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import { FModalProps } from '../FModals'

export const FModal: React.FC<FModalProps> = ({ id, content, isOpen, onClose, footer, title }) => {
  const { onOpenChange } = useDisclosure()
  console.log(id)

  return (
    <Modal
      id={id}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={() => onClose({ id })}
      className={id.startsWith('post-comments') ? 'max-w-3xl' : ''}
    >
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{content}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </Modal>
  )
}
