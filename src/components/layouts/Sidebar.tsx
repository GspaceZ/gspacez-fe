'use client'

import * as React from 'react'
import { Button, Image } from '@nextui-org/react'
import SidebarOption from '../sidebar/sidebar-option'
import { ROUTE } from '@/utils/constant/route'
import Logo from '@/public/logo.png'
import {
  IconCast,
  IconFlag,
  IconHome,
  IconLayoutSidebarRightExpandFilled,
  IconRobot,
  IconSearch,
  IconStopwatch,
  IconTrendingUp,
  IconUserScan
} from '@tabler/icons-react'

interface SidebarProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

const Sidebar = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
  const sidebarOptions = [
    {
      name: 'home',
      icon: <IconHome />,
      path: ROUTE.sidebar.home
    },
    {
      name: 'search',
      icon: <IconSearch />,
      path: ROUTE.sidebar.search
    },
    {
      name: 'profile',
      icon: <IconUserScan />,
      path: ROUTE.sidebar.home
    },
    {
      name: 'your_pages',
      icon: <IconFlag />,
      path: ROUTE.sidebar.home
    },
    {
      name: 'events',
      icon: <IconStopwatch />,
      path: ROUTE.sidebar.home
    },
    {
      name: 'upcoming_streams',
      icon: <IconCast />,
      path: ROUTE.sidebar.home
    },
    {
      name: 'gzbot',
      icon: <IconRobot />,
      path: ROUTE.sidebar.gzbot
    },
    {
      name: 'trending_topics',
      icon: <IconTrendingUp />,
      path: ROUTE.sidebar.trendingTopics
    }
  ]

  return (
    <div
      className={`background-white fixed left-0 top-0 z-10 z-20 flex h-screen w-[300px] flex-col justify-between border-r border-gray-200 bg-zinc-50 shadow-md transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div>
        <div className="flex h-[80px] w-full items-center justify-between border-gray-200">
          <Image className="ml-4 w-[140px]" alt="Logo" src={Logo.src} />
          <Button
            isIconOnly
            className={`mr-2 ${isSidebarOpen ? '' : 'hidden'}`}
            variant="light"
            onPress={() => toggleSidebar()}
          >
            <IconLayoutSidebarRightExpandFilled size="28" />
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
    </div>
  )
}

export default Sidebar
