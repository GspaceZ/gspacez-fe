'use client'

import * as React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Overlay from '../common/Overlay'
import { MainLayoutProps } from '@/types/props/layouts'
import { Suspense } from 'react'
import Loading from './loading'
import { AuthGuard } from './AuthGuard'
import { toggleSidebar } from '@/utils/store/layout'
import { RootState, useAppDispatch } from '@/utils/store'
import { useSelector } from 'react-redux'

const MainLayout = ({ children, title }: MainLayoutProps) => {
  const isOpen = useSelector((state: RootState) => state.layout.sidebar.isOpen)
  const dispatch = useAppDispatch()

  const toggle = () => {
    dispatch(toggleSidebar())
  }

  return (
    <AuthGuard>
      <div className="relative min-h-screen">
        <Sidebar isSidebarOpen={isOpen} toggleSidebar={toggle} />
        <Suspense fallback={<Loading />}>
          <div
            className={`flex min-h-screen flex-1 flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'ml-[300px]' : ''}`}
          >
            <Overlay isSidebarOpen={isOpen} toggleSidebar={toggle} />
            <Header title={title} isSidebarOpen={isOpen} toggleSidebar={toggle} />
            <main className={`flex grow flex-col ${isOpen ? 'hidden lg:block' : ''}`}>
              {children}
            </main>
          </div>
        </Suspense>
      </div>
    </AuthGuard>
  )
}

export default MainLayout
