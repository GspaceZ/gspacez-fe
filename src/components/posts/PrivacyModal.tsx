import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@nextui-org/react'
import { PostPrivacyEnum } from '@/utils/constant'
import { useTranslations } from 'next-intl'
import CustomCheckbox from './modal/CustomCheckbox'
import { IconLock, IconUserStar, IconWorld } from '@tabler/icons-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/store'
import { usePost } from '@/hooks/usePost'
import { useMutation } from '@tanstack/react-query'
import { fToast } from '@/helpers/toast'
import { SetPrivacyPostRequestDto } from '@/types/dto/post'

interface PrivacyProps {
  isOpen: boolean
  onClose: () => void
  postId: string
  onSave: (privacy: PostPrivacyEnum) => void
}

const PrivacyModal: React.FC<PrivacyProps> = ({ isOpen, onClose, postId, onSave }) => {
  const t = useTranslations('post.privacy')
  const token = useSelector((state: RootState) => state.auth.token)
  const [selectedOption, setSelectedOption] = useState<PostPrivacyEnum | undefined>(undefined)
  const { updatePost } = usePost()
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  const { isPending: isSetPrivacyPending, mutate: mutateSetPrivacy } = useMutation({
    mutationFn: (dto: SetPrivacyPostRequestDto) => updatePost(postId, dto, token),
    onSuccess: () => {
      fToast('Privacy updated successfully', 'success')
      onClose()
    },
    onError: () => {
      fToast('Failed to update privacy', 'error')
    }
  })

  const handleOptionChange = (value: PostPrivacyEnum) => {
    setSelectedOption(value)
  }

  const handleSave = () => {
    if (selectedOption !== undefined) {
      const dto: SetPrivacyPostRequestDto = {
        privacy: selectedOption
      }
      mutateSetPrivacy(dto)
      onSave(selectedOption)
    }
  }

  const privacyOptions = [
    {
      value: PostPrivacyEnum.PUBLIC,
      label: t('public'),
      description: t('description.public'),
      icon: <IconWorld />
    },
    {
      value: PostPrivacyEnum.FRIENDS,
      label: t('friends'),
      description: t('description.friends'),
      icon: <IconUserStar />
    },
    {
      value: PostPrivacyEnum.PRIVATE,
      label: t('private'),
      description: t('description.private'),
      icon: <IconLock />
    }
  ]

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="-translate-x-30 w-full max-w-2xl transform rounded-lg bg-white p-4 shadow-lg"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          <div className="flex justify-center pb-4 text-2xl font-bold">{t('title')}</div>
          <div className="w-full space-y-4 pt-4">
            {privacyOptions.map((option) => (
              <CustomCheckbox
                key={option.value}
                description={option.description}
                value={option.value}
                label={option.label}
                icon={option.icon}
                isSelected={selectedOption === option.value}
                onChange={() => handleOptionChange(option.value)}
              />
            ))}
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <Button color="default" size="md" onClick={onClose}>
              {t('cancel')}
            </Button>
            <Button
              color="primary"
              size="md"
              isLoading={isSetPrivacyPending}
              onClick={handleSave}
            >
              {t('save')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyModal
