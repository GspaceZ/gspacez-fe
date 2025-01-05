'use client'

import * as React from 'react'
import { Button } from '@nextui-org/react'
import { HeaderProps } from '@/types/props/layouts'
import { IconLayoutSidebarLeftExpandFilled } from '@tabler/icons-react'
import { LocaleButton } from './LocaleButton'

const Header = ({ title, isSidebarOpen, toggleSidebar }: HeaderProps) => {
  return (
    <div
      className={`sticky top-0 z-30 flex h-[50px] items-center border-b border-gray-200 bg-white shadow-md ${isSidebarOpen ? 'hidden lg:flex' : ''}`}
    >
      <div className="w-[80px]">
        <Button
          isIconOnly
          className={`ml-4 ${isSidebarOpen && 'hidden'}`}
          variant="light"
          onPress={() => toggleSidebar()}
        >
          <IconLayoutSidebarLeftExpandFilled size="28" />
        </Button>
      </div>
      <div className="grow text-center">
        <span className="text-xl font-extrabold">{title}</span>
      </div>
      <div className="flex w-[80px] items-center justify-end">
        <LocaleButton />
      </div>
    </div>
  )
}

export default Header
