'use client'

import { mockUser } from '@/mock/message'
import { IMessageBaseInfo } from '@/types/message'
import {
  Avatar,
  Button,
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import { IconArrowLeft, IconBan, IconUser } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { NotificationModal } from './modal/Notification'
import { ReportModal } from './modal/Report'

interface Props {
  show: boolean
  toggleShow: (value: boolean) => void
}

export const MessageInformation = ({ show, toggleShow }: Props) => {
  const [messageUser, setMessageUser] = useState<IMessageBaseInfo>()
  const { isOpen: isNotiOpen, onOpen: onNotiOpen, onOpenChange: onNotiOpenChange } = useDisclosure()
  const {
    isOpen: isReportOpen,
    onOpen: onReportOpen,
    onOpenChange: onReportOpenChange
  } = useDisclosure()

  useEffect(() => {
    setMessageUser(mockUser)
  }, [])

  const userActions = [
    {
      label: 'Profile',
      value: 'profile',
      icon: <IconUser size={20} />
    },
    {
      label: 'Block',
      value: 'block',
      icon: <IconBan size={20} />
    }
  ]

  const messageActions = [
    {
      label: 'Change nickname',
      value: 'change-nickname'
    },
    {
      label: 'Media',
      value: 'media'
    },
    {
      label: 'Notification',
      value: 'notification'
    },
    {
      label: 'Report',
      value: 'report'
    }
  ]

  const handleAction = (value: string) => {
    switch (value) {
      case 'notification':
        onNotiOpen()
        break
      case 'report':
        onReportOpen()
        break
      default:
        break
    }
  }

  return (
    <div
      className={`flex h-full ${show ? 'w-full md:w-[360px]' : 'w-0'} flex-col items-center rounded-none border-l border-t border-gray-200 bg-white transition-all md:rounded-tl-lg`}
    >
      <Button
        isIconOnly
        variant="light"
        className="ml-4 mt-1 self-start md:hidden"
        onClick={() => toggleShow(!show)}
      >
        <IconArrowLeft size={24} />
      </Button>
      {show && (
        <>
          <div className="mt-5 flex items-center gap-4 md:mt-10">
            <Avatar src={messageUser?.avatar} alt="Avatar" className="border border-gray-200" />
            <span className="text-lg">{messageUser?.name}</span>
          </div>
          <div className="mt-4 flex items-center gap-8">
            {userActions.map((action) => (
              <div key={action.value} className="flex flex-col items-center">
                <div>
                  <Button variant="light" isIconOnly>
                    {action.icon}
                  </Button>
                </div>
                <span>{action.label}</span>
              </div>
            ))}
          </div>
          <Listbox className="mt-6">
            {messageActions.map((action) => {
              return (
                <ListboxItem
                  key={action.value}
                  className="border-t border-gray-100"
                  onClick={() => handleAction(action.value)}
                >
                  <div className="flex h-10 w-full items-center">
                    <span className="ml-4">{action.label}</span>
                  </div>
                </ListboxItem>
              )
            })}
          </Listbox>
        </>
      )}
      <Modal isOpen={isNotiOpen} onOpenChange={onNotiOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Notification</ModalHeader>
              <ModalBody>
                <NotificationModal />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Cancel
                </Button>
                <Button color="primary" variant="light" onClick={onClose}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isReportOpen} onOpenChange={onReportOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Report a problem</ModalHeader>
              <ModalBody>
                <ReportModal />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Cancel
                </Button>
                <Button color="primary" variant="light" onClick={onClose}>
                  Send report
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
