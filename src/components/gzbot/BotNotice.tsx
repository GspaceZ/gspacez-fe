'use client'

import { IconX } from '@tabler/icons-react'
import { useState } from 'react'
import { FActionIcon } from '../common/FActionIcon'

export const BotNotice = () => {
  const [isShowNotice, setIsShowNotice] = useState<boolean>(true)

  return (
    <div className="w-full px-4">
      {isShowNotice && (
        <div className="flex h-10 w-full items-center justify-between rounded-lg border-gray-200 bg-blue-200 px-4">
          <span className="text-sm">Note: You can use both voice or text to chat with GZBot</span>
          <FActionIcon icon={<IconX size={14} />} onClick={() => setIsShowNotice(false)} />
        </div>
      )}
    </div>
  )
}
