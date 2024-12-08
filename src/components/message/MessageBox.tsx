'use client'

import { BoxContainer } from './message-box/BoxContainer'
import { BoxFooter } from './message-box/BoxFooter'
import { BoxHeader } from './message-box/BoxHeader'

export const MessageBox = () => {
  return (
    <div className="flex w-full flex-col rounded-lg border-l border-gray-200 bg-white">
      <BoxHeader />
      <BoxContainer />
      <BoxFooter />
    </div>
  )
}
