'use client'

import { GoSidebarCollapse } from 'react-icons/go'
import * as React from 'react'
import { Button } from '@nextui-org/react'

interface HeaderProps {
  title: string
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

const Header = ({ title, isSidebarOpen, toggleSidebar }: HeaderProps) => {
  return (
    <div
      className={`h-[80px] flex items-center border-b border-gray-200 shadow-md sticky top-0
      ${isSidebarOpen ? '-ml-[300px]' : ''}`}
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
