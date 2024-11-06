'use client'

import * as React from 'react'
import { Button, Image } from '@nextui-org/react'
import { GoSidebarExpand } from 'react-icons/go'
import SidebarOption from '../sidebar/sidebar-option'
import { sidebarOptions } from '../../utils/constant/sidebarOptions'
import { useTranslations } from 'next-intl'
import { pathWithLocale } from '@/helpers/url/path-with-locale'
import { usePathname, useRouter } from 'next/navigation'
import { ROUTE } from '@/utils/constant/route'
import { useAppDispatch } from '@/utils/store'
import { logout } from '@/utils/store/auth'
import { logout as logoutUser } from '@/utils/store/user'
import { fToast } from '@/helpers/toast'
import Logo from '@/public/logo.png'

interface SidebarProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

const Sidebar = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
  const t = useTranslations('sidebar')

  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()

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

  return (
    <div
      className={`background-white fixed left-0 top-0 z-10 z-20 flex h-screen w-[300px] flex-col justify-between border-r border-gray-200 bg-zinc-50 shadow-md transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div>
        <div className="flex h-[80px] w-full items-center justify-between border-gray-200">
          <Image className="ml-4 w-[180px]" alt="Logo" src={Logo.src} />
          <Button
            isIconOnly
            className={`mr-4 ${isSidebarOpen ? '' : 'hidden'}`}
            variant="light"
            onPress={() => toggleSidebar()}
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
      <Button
        variant="light"
        className="h-[60px] border-t border-gray-200 text-center text-xl font-bold"
        radius="none"
        onClick={handleLogout}
      >
        {t('logout_switch')}
      </Button>
    </div>
  )
}

export default Sidebar
