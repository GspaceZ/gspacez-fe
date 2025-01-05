'use client'

import * as React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { useState } from 'react'
import Overlay from '../common/Overlay'
import { MainLayoutProps } from '@/types/props/layouts'
import { Suspense } from 'react'
import Loading from './loading'
import { AuthGuard } from './AuthGuard'

const MainLayout = ({ children, title }: MainLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <AuthGuard>
      <div className="relative min-h-screen">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Suspense fallback={<Loading />}>
          <div
            className={`flex min-h-screen flex-1 flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'ml-[300px]' : ''}`}
          >
            <Overlay isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <Header title={title} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <main className={`flex grow flex-col ${isSidebarOpen ? 'hidden lg:block' : ''}`}>
              {children}
            </main>
          </div>
        </Suspense>
      </div>
    </AuthGuard>
  )
}

export default MainLayout
