'use client'

interface OverlayProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

const Overlay = ({ isSidebarOpen, toggleSidebar }: OverlayProps) => {
  return (
    <div
      className={`w-screen h-screen bg-gray-200 opacity-90
  ${isSidebarOpen ? 'block md:hidden -ml-[300px]' : 'hidden'}`}
      onClick={() => toggleSidebar()}
    ></div>
  )
}

export default Overlay
