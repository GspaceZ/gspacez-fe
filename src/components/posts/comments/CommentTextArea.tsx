'use client'

import { Textarea, Button, Avatar } from '@nextui-org/react'
import { FIcon } from '@/components/common/FIcon'
import { useState } from 'react'
import LandingAvatar from '@/public/landingAvatar.png'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/store'
import { useTranslations } from 'next-intl'

interface CommentTextareaProps {
  onSend: (content: string) => void
}

const CommentTextarea = ({ onSend }: CommentTextareaProps) => {
  const t = useTranslations('post.comment_modal')
  const avaUrl = useSelector((state: RootState) => state.user.avtUrl)
  const [content, setContent] = useState('')

  const handleSend = () => {
    if (content.trim()) {
      onSend(content)
      setContent('')
    }
  }

  return (
    <div className="relative flex w-full items-start gap-3">
      <Avatar radius="full" size="sm" src={avaUrl} alt={LandingAvatar.src} />
      <div className="relative flex flex-grow flex-col">
        <Textarea
          label={t('write_comment')}
          className="w-full"
          minRows={2}
          variant="bordered"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          onClick={handleSend}
          className="absolute bottom-2 right-2 flex items-center justify-center rounded-full border-none bg-white p-1"
        >
          <FIcon name="Send" size={20} />
        </Button>
      </div>
    </div>
  )
}

export default CommentTextarea
