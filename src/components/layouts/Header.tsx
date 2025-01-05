'use client'

import * as React from 'react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { HeaderProps } from '@/types/props/layouts'
import {
  IconBell,
  IconLayoutSidebarLeftExpandFilled,
  IconSettings,
  IconUser
} from '@tabler/icons-react'
import { LocaleButton } from './LocaleButton'

const Header = ({ isSidebarOpen, toggleSidebar }: HeaderProps) => {
  const userOptions = [
    {
      label: 'Profile',
      key: 'profile',
      action: undefined,
      showDivider: true
    },
    {
      label: 'Logout',
      key: 'logout',
      action: undefined,
      showDivider: false
    }
  ]

  return (
    <div
      className={`sticky top-0 z-30 flex h-[50px] items-center justify-between border-b border-gray-200 bg-white shadow-md ${isSidebarOpen ? 'hidden lg:flex' : ''}`}
    >
      <div className="w-[80px]">
        <Button
          isIconOnly
          className={`ml-4 ${isSidebarOpen && 'hidden'}`}
          variant="light"
          size="sm"
          onPress={() => toggleSidebar()}
        >
          <IconLayoutSidebarLeftExpandFilled size="24" />
        </Button>
      </div>
      <div className="mr-2 flex items-center justify-end gap-2">
        <LocaleButton />
        <Button isIconOnly variant="light" size="sm" startContent={<IconBell size={20} />}></Button>
        <Button
          isIconOnly
          variant="light"
          size="sm"
          startContent={<IconSettings size={20} />}
        ></Button>
        <Dropdown>
          <DropdownTrigger>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              startContent={<IconUser size={20} />}
            ></Button>
          </DropdownTrigger>
          <DropdownMenu>
            {userOptions.map((item) => {
              return (
                <DropdownItem key={item.key} onPress={item.action} showDivider={item.showDivider}>
                  {item.label}
                </DropdownItem>
              )
            })}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  )
}

export default Header
