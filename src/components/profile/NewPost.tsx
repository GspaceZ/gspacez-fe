'use client'

import { Avatar, Button } from '@nextui-org/react'
import { useTranslations } from 'next-intl'

interface NewPostProps {
  avatar: string
  openModal: () => void
}

const NewPost = (props: NewPostProps) => {
  const tPost = useTranslations('post')

  return (
    <div className="mx-0 mt-2 flex items-center gap-4 rounded-lg border border-gray-300 bg-white p-4 md:mx-4">
      <Avatar src={props.avatar} size="md" />
      <div className="grow">
        <Button className="w-full grow bg-gray-200 text-gray-700" onClick={() => props.openModal()}>
          {tPost('create_placeholder')}
        </Button>
      </div>
    </div>
  )
}

export default NewPost
