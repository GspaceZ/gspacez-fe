'use client'

import { useState } from 'react'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@nextui-org/react'
import { HeaderProps } from '@/types/props/layouts'
import { LocaleButton } from './LocaleButton'
import { useAppDispatch } from '@/utils/store'
import { logout } from '@/utils/store/auth'
import { logout as logoutUser } from '@/utils/store/user'
import { usePathname, useRouter } from 'next/navigation'
import { pathWithLocale } from '@/helpers/url/path-with-locale'
import { ROUTE } from '@/utils/constant/route'
import Logo from '@/public/logo.png'
import { FLink } from '../common/FLink'
import { Notifications } from '../notifications/Notifications'
import { FIcon } from '../common/FIcon'
import { useFToastContext } from '../common/FToast'

const Header = ({ isSidebarOpen, toggleSidebar }: HeaderProps) => {
  const [text, setText] = useState<string>('')
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const router = useRouter()
  const { fToast } = useFToastContext()

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
      action: () => handleRedirect(ROUTE.pages.profile),
      showDivider: true,
      icon: 'User'
    },
    {
      label: 'Logout',
      key: 'logout',
      action: handleLogout,
      showDivider: false,
      icon: 'Power'
    }
  ]

  return (
    <div
      className={`sticky top-0 z-30 flex h-[50px] items-center justify-between border-b border-gray-200 bg-white shadow-md ${isSidebarOpen ? 'hidden lg:flex' : ''}`}
    >
      <Button
        isIconOnly
        className={`${isSidebarOpen && 'hidden'} fixed bottom-0 left-0 z-30 border border-gray-300 shadow-md`}
        variant="light"
        onPress={() => toggleSidebar()}
      >
        <FIcon name="LayoutSidebarLeftExpandFilled" size="24" />
      </Button>
      <div className="ml-4 flex items-center justify-start gap-4">
        <FLink path={ROUTE.pages.home}>
          <Image alt="Logo" src={Logo.src} className="h-6 object-contain" />
        </FLink>
        <Input
          placeholder="Search on GspaceZ"
          value={text}
          endContent={<FIcon name="Search" size={16} />}
          onChange={(e) => setText(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter' || text !== '') {
              handleRedirect(`${ROUTE.pages.search}?q=${text}`)
            }
          }}
          size="sm"
        />
      </div>
      <div className="mr-2 flex items-center justify-end gap-2">
        <LocaleButton />
        <Popover placement="bottom-end" showArrow offset={20}>
          <PopoverTrigger>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              startContent={<FIcon name="Bell" size={20} />}
            ></Button>
          </PopoverTrigger>
          <PopoverContent>
            <Notifications />
          </PopoverContent>
        </Popover>
        <Button
          isIconOnly
          variant="light"
          size="sm"
          startContent={<FIcon name="Settings" size={20} />}
        ></Button>
        <FLink path="/message">
          <Button
            isIconOnly
            variant="light"
            size="sm"
            startContent={<FIcon name="Message2" size={20} />}
          ></Button>
        </FLink>
        <Dropdown>
          <DropdownTrigger>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              startContent={<FIcon name="User" size={20} />}
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
                  startContent={<FIcon name={item.icon} size={18} />}
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
