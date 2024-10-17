'use client'

import { OverlayProps } from '@/types/props/common'

const Overlay = ({ isSidebarOpen, toggleSidebar }: OverlayProps) => {
  return (
    <div
      className={`fixed h-screen w-screen bg-gray-200 ${isSidebarOpen ? '-ml-[300px] block md:hidden' : 'hidden'}`}
      onClick={() => toggleSidebar()}
    ></div>
  )
}

export default Overlay
