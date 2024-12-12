'use client'

import * as React from 'react'
import { Button } from '@nextui-org/react'
import { HeaderProps } from '@/types/props/layouts'
import { IconLayoutSidebarLeftExpandFilled } from '@tabler/icons-react'
import { LocaleButton } from './LocaleButton'

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
        <IconLayoutSidebarLeftExpandFilled size="28" />
      </Button>
      <span className="mx-auto text-3xl font-extrabold">{title}</span>
      <LocaleButton />
    </div>
  )
}

export default Header
