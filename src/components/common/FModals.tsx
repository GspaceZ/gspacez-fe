'use client'

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { FModal } from './modals/FModal'
import { FConfirmModalContent } from './modals/FConfirmModalContent'
import { Button } from '@nextui-org/react'

export interface FModalProps {
  id: string
  content: ReactNode
  onClose: ({ id }: { id: string }) => void
  footer?: ReactNode
  title: string
}

export type ModalManager = {
  id: string
  title: string
  content: ReactNode
  confirm?: boolean
  footer?: ReactNode
  closeWithConfirm?: boolean
  closeAllModals?: boolean
}

export interface FModalsContextProps {
  open: (modal: ModalManager) => void
  openConfirm: (modal: ModalManager) => void
  closeAll: () => void
  close: ({ id }: { id: string }) => void
}

export interface FModalsProviderProps {
  children: ReactNode
}

const FModalsContext = createContext<FModalsContextProps | undefined>(undefined)

export const FModalsProvider = ({ children }: FModalsProviderProps) => {
  const [modals, setModals] = useState<ModalManager[]>([])
  useEffect(() => {
    console.log(modals.map((modal) => modal.id))
  }, [modals])

  const open = ({ id, content, closeAllModals, closeWithConfirm, footer, title }: ModalManager) => {
    setModals((prev) => {
      return [...prev, { id, content, closeAllModals, closeWithConfirm, footer, title }]
    })
  }

  const openConfirm = ({ id, content, footer, title }: ModalManager) => {
    setModals((prev) => {
      return [...prev, { id, content, confirm: true, footer, title }]
    })
  }

  const closeAll = () => {
    setModals([])
  }

  const close = ({ id }: { id: string }) => {
    const foundModal = modals.find((modal) => modal.id === id)
    if (foundModal && foundModal.closeAllModals) {
      closeAll()
      return
    }
    if (foundModal && foundModal.closeWithConfirm) {
      openConfirm({
        id: `confirm-${id}`,
        title: 'Confirm',
        content: <FConfirmModalContent />,
        footer: (
          <>
            <Button
              color="default"
              size="sm"
              className="text-md"
              onPress={() => close({ id: `confirm-${id}` })}
            >
              Cancel
            </Button>
            <Button color="primary" size="sm" className="text-md" onPress={() => closeAll()}>
              Confirm
            </Button>
          </>
        )
      })
      return
    }
    setModals((prev) => {
      return prev.filter((modal) => modal.id !== id)
    })
  }

  return (
    <FModalsContext.Provider value={{ open, openConfirm, closeAll, close }}>
      {children}
      {modals.map((modal) => {
        if (!modal.confirm)
          return (
            <FModal
              key={modal.id}
              id={modal.id}
              content={modal.content}
              onClose={close}
              footer={modal.footer}
              title={modal.title}
            />
          )
        return (
          <FModal
            key={modal.id}
            id={modal.id}
            content={modal.content || <FConfirmModalContent />}
            onClose={close}
            footer={modal.footer}
            title={modal.title}
          />
        )
      })}
    </FModalsContext.Provider>
  )
}

export const useFModalContext = () => {
  const context = useContext(FModalsContext)
  if (!context) {
    throw new Error('useFModalContext must be used within a FModalsProvider')
  }
  return context
}
