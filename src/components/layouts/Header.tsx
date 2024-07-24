'use client'

import { GoSidebarCollapse } from 'react-icons/go'
import * as React from 'react'
import { Button } from '@nextui-org/react'
import { HeaderProps } from '@/types/props/layouts'

const Header = ({ title, isSidebarOpen, toggleSidebar }: HeaderProps) => {
  return (
    <div
      className={`h-[80px] flex items-center border-b bg-white z-10 border-gray-200 shadow-md sticky top-0
      md:mr-[300px] ${isSidebarOpen ? 'hidden md:flex' : ''}`}
    >
      <Button
        isIconOnly
        className={`ml-4 fixed left-0 ${isSidebarOpen && 'hidden'}`}
        variant="light"
        onClick={() => toggleSidebar()}
      >
        <GoSidebarCollapse className="text-3xl" />
      </Button>
      <span className="text-3xl mx-auto font-extrabold">{title}</span>
    </div>
  )
}

export default Header
