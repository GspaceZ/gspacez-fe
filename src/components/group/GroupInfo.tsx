'use client'

import { GroupInfoProps } from '@/types/props/group'
import { Avatar } from '@nextui-org/react'
import { JoinButton } from './JoinButton'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

export const GroupInfo = (props: GroupInfoProps) => {
  const [isShowFull, setIsShowFull] = useState(false)
  const t = useTranslations('group')

  return (
    <div className="flex flex-col pb-2 pl-6 pt-4">
      <div className="flex items-center gap-6">
        <Avatar src={props.avatar} size="lg" />
        <JoinButton status="join" />
      </div>
      <span className="mt-2 text-2xl font-bold">{props.name}</span>
      <span className="text-lg">{props.shortDescription}</span>
      {isShowFull && <span className="text-md mt-2">{props.fullDescription}</span>}
      <button
        className="text-md mt-1 w-fit p-0 font-bold text-primary"
        onClick={() => setIsShowFull(!isShowFull)}
      >
        {isShowFull ? t('hide') : t('more')}
      </button>
    </div>
  )
}
