'use client'

import { useState } from 'react'
import { BoxContainer } from './message-box/BoxContainer'
import { BoxFooter } from './message-box/BoxFooter'
import { BoxHeader } from './message-box/BoxHeader'
import { MessageInformation } from './MessageInformation'

export const MessageBox = () => {
  const [showInfo, setShowInfo] = useState<boolean>(true)

  const toggleShowInfo = () => {
    setShowInfo(!showInfo)
  }

  return (
    <div className="flex h-full w-full gap-4">
      <div className="flex w-full flex-col rounded-lg border border-gray-200 bg-white">
        <BoxHeader setShowInfo={toggleShowInfo} />
        <BoxContainer />
        <BoxFooter />
      </div>
      <MessageInformation show={showInfo} />
    </div>
  )
}
