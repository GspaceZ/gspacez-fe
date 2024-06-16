'use client'

import * as React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import TrendingPosts from './TrendingPosts'
import { trendingPostsData, maybeYouKnowData } from '@/utils/constant/trendingPostsData'
import { buttonOptions } from '@/utils/constant/buttonOptions'
import { useState } from 'react'

interface MainLayoutProps {
  children: React.ReactNode
  title: string
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Header
        title={title}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div>{children}</div>
      <TrendingPosts posts={trendingPostsData} maybeYouKnows={maybeYouKnowData} buttons={buttonOptions} />
    </div>
  )
}

export default MainLayout
