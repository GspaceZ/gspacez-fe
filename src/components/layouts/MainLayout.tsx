'use client'

import * as React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import TrendingSidebar from './TrendingSidebar'
import { trendingPostsData, trendingPeopleData } from '@/utils/constant/trending-post/index'
import ButtonOption from '@/components/trending-post/button-option'
import { buttonOptions } from '@/utils/constant/buttonOptions'
import { useState } from 'react'
import Overlay from '../common/Overlay'
import { MainLayoutProps } from '@/types/props/layouts'

const MainLayout = ({ children, title }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isTrendingSidebarOpen, setIsTrendingSidebarOpen] = useState(false)
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(-1)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleButtonOptionClick = (index: number) => {
    if (index === buttonOptions.length - 1) {
      setIsTrendingSidebarOpen(!isTrendingSidebarOpen)
      setSelectedButtonIndex(isTrendingSidebarOpen ? -1 : index)
    } else {
      setSelectedButtonIndex(index)
      setIsTrendingSidebarOpen(false)
    }
  }

  return (
    <div className="relative min-h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex flex-1 flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'ml-[300px]' : ''}`}
      >
        <Overlay isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Header title={title} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className={`lg:ml-[-300px] ${isSidebarOpen ? 'hidden lg:block' : ''}`}>
          {children}
        </main>
        <TrendingSidebar
          posts={trendingPostsData}
          trendingPeople={trendingPeopleData}
          isVisible={isTrendingSidebarOpen}
        />
        <div
          className={`fixed bottom-0 left-0 right-0 flex items-center justify-around bg-white px-2 py-1 shadow-lg transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-y-full' : 'translate-y-0'
          } lg:hidden`}
        >
          <div className="mx-2 flex w-full justify-between">
            {buttonOptions.map((buttonOption, index) => (
              <ButtonOption
                key={index}
                button={buttonOption}
                onClick={() => handleButtonOptionClick(index)}
                isActive={selectedButtonIndex === index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLayout
