'use client'

import { Button } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'

interface OptionsProps {
  hidePost: () => void
  setPrivacy: () => void
  editPost?: () => void
  deletePost?: () => void
  isOpen: boolean
  onClose: () => void
}

const Options: React.FC<OptionsProps> = ({
  hidePost,
  setPrivacy,
  editPost,
  deletePost,
  isOpen,
  onClose
}) => {
  const t = useTranslations('post.options')

  const optionsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={optionsRef}
      className="absolute right-0 z-20 flex w-[120px] flex-col rounded-2xl border border-gray-100 bg-white shadow"
      onClick={onClose}
    >
      <Button className="h-8 w-full rounded-none bg-white hover:bg-gray-200" onClick={hidePost}>
        {t('hide')}
      </Button>
      <Button className="h-8 w-full rounded-none bg-white hover:bg-gray-200" onClick={setPrivacy}>
        {t('privacy')}
      </Button>
      <Button className="h-8 w-full rounded-none bg-white hover:bg-gray-200" onClick={editPost}>
        {t('edit')}
      </Button>
      <Button className="h-8 w-full rounded-none bg-white hover:bg-gray-200" onClick={deletePost}>
        {t('delete')}
      </Button>
    </div>
  )
}

export default Options
