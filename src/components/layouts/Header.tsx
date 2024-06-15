'use client'

import { useAppDispatch, useAppSelector } from '@/utils/store'

import { GoSidebarCollapse } from 'react-icons/go'
import * as React from 'react'
import { Button } from '@nextui-org/react'
import { toggleSidebar } from '@/utils/store/sidebar'

interface HeaderProps {
  title: string
}

const Header = ({ title }: HeaderProps) => {
  const dispatch = useAppDispatch()
  const isSidebarOpen = useAppSelector((state) => state.sidebar.isOpen)

  const openSidebar = () => {
    dispatch(toggleSidebar())
  }

  return (
    <div
      className={`h-[80px] flex items-center border-b border-gray-200 shadow-md sticky top-0
      ${isSidebarOpen ? 'ml-[300px]' : ''}`}
    >
      <Button
        isIconOnly
        className={`ml-4 ${isSidebarOpen && 'hidden'}`}
        variant="light"
        onClick={() => openSidebar()}
      >
        <GoSidebarCollapse className="text-3xl" />
      </Button>
      <span className="text-3xl mx-auto font-extrabold">{title}</span>
    </div>
  )
}

export default Header
