'use client'

import * as React from 'react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { HeaderProps } from '@/types/props/layouts'
import {
  IconBell,
  IconLayoutSidebarLeftExpandFilled,
  IconPower,
  IconSettings,
  IconUser
} from '@tabler/icons-react'
import { LocaleButton } from './LocaleButton'
import { useAppDispatch } from '@/utils/store'
import { logout } from '@/utils/store/auth'
import { logout as logoutUser } from '@/utils/store/user'
import { usePathname, useRouter } from 'next/navigation'
import { pathWithLocale } from '@/helpers/url/path-with-locale'
import { ROUTE } from '@/utils/constant/route'
import { fToast } from '@/helpers/toast'

const Header = ({ isSidebarOpen, toggleSidebar }: HeaderProps) => {
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const router = useRouter()

  const handleRedirect = (path: string) => {
    const destinationPath = pathWithLocale(pathname, path)
    router.push(destinationPath)
  }

  const handleLogout = () => {
    dispatch(logout())
    dispatch(logoutUser())
    handleRedirect(ROUTE.pages.default)
    fToast('Logout successfully', 'success')
  }

  const userOptions = [
    {
      label: 'Profile',
      key: 'profile',
      action: undefined,
      showDivider: true,
      icon: <IconUser size={18} />
    },
    {
      label: 'Logout',
      key: 'logout',
      action: handleLogout,
      showDivider: false,
      icon: <IconPower size={18} />
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
                <DropdownItem
                  key={item.key}
                  onPress={item.action}
                  showDivider={item.showDivider}
                  className={`${item.key === 'logout' && 'text-red-500'}`}
                  startContent={item.icon}
                >
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
