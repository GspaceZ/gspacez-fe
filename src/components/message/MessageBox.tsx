'use client'

import { useState } from 'react'
import { BoxContainer } from './message-box/BoxContainer'
import { BoxFooter } from './message-box/BoxFooter'
import { BoxHeader } from './message-box/BoxHeader'
import { MessageInformation } from './MessageInformation'

export const MessageBox = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false)

  const toggleShowInfo = () => {
    setShowInfo(!showInfo)
  }

  return (
    <div className={`flex h-full w-full ${showInfo ? 'md:gap-4' : 'md:gap-0'}`}>
      <div
        className={`flex ${showInfo ? 'w-0 overflow-hidden' : 'w-full'} flex-col rounded-none border border-gray-200 bg-white transition-all md:w-full md:rounded-tr-lg lg:rounded-t-lg`}
      >
        <BoxHeader setShowInfo={toggleShowInfo} />
        <BoxContainer />
        <BoxFooter />
      </div>
      <MessageInformation show={showInfo} toggleShow={setShowInfo} />
    </div>
  )
}
