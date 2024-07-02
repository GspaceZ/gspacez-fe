'use client'

import { OverlayProps } from '@/types/props/common'

const Overlay = ({ isSidebarOpen, toggleSidebar }: OverlayProps) => {
  return (
    <div
      className={`w-screen h-screen bg-gray-200 fixed
  ${isSidebarOpen ? 'block md:hidden -ml-[300px]' : 'hidden'}`}
      onClick={() => toggleSidebar()}
    ></div>
  )
}

export default Overlay
