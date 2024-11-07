'use client'

import { GoSidebarCollapse } from 'react-icons/go'
import * as React from 'react'
import { Button } from '@nextui-org/react'
import { HeaderProps } from '@/types/props/layouts'

const Header = ({ title, isSidebarOpen, toggleSidebar }: HeaderProps) => {
  return (
    <div
      className={`sticky top-0 z-30 flex h-[80px] items-center border-b border-gray-200 bg-white shadow-md lg:mr-[300px] ${isSidebarOpen ? 'hidden lg:flex' : ''}`}
    >
      <Button
        isIconOnly
        className={`fixed left-0 ml-4 ${isSidebarOpen && 'hidden'}`}
        variant="light"
        onClick={() => toggleSidebar()}
      >
        <GoSidebarCollapse className="text-3xl" />
      </Button>
      <span className="mx-auto text-3xl font-extrabold">{title}</span>
    </div>
  )
}

export default Header
