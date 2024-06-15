'use client'

import { useAppDispatch, useAppSelector } from '@/utils/store'
import { toggleSidebar } from '@/utils/store/sidebar'
import { Button, Image } from '@nextui-org/react'
import { GoSidebarExpand } from 'react-icons/go'
import SidebarOption from '../sidebar/sidebar-option'

const Sidebar = () => {
  const dispatch = useAppDispatch()
  const isSidebarOpen = useAppSelector((state) => state.sidebar.isOpen)
  const sidebarOptions = [
    {
      name: 'Ok',
      icon: 'GoSidebarCollapse',
      path: 'home'
    }
  ]

  const openSidebar = () => {
    dispatch(toggleSidebar())
  }

  return (
    <div
      className={`w-[300px] h-screen fixed top-0 left-0 flex flex-col border-r border-gray-200 shadow-md
    ${isSidebarOpen ? '' : 'hidden'}`}
    >
      <div className="h-[80px] w-full flex justify-between items-center border-gray-200">
        <Image className="ml-4 w-[180px]" alt="Logo" src="/logo.png" />
        <Button
          isIconOnly
          className={`mr-4 ${isSidebarOpen ? '' : 'hidden'}`}
          variant="light"
          onClick={() => openSidebar()}
        >
          <GoSidebarExpand className="text-3xl" />
        </Button>
      </div>
      {sidebarOptions.map((option) => {
        return (
          <SidebarOption
            name={option.name}
            icon={option.icon}
            path={option.path}
            key={option.name}
          />
        )
      })}
    </div>
  )
}

export default Sidebar
