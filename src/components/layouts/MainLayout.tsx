'use client'

import { useEffect } from 'react'
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
import { useProfile } from '@/hooks/useProfile'
import { useQuery } from '@tanstack/react-query'
import { setUser } from '@/utils/store/user'

const MainLayout = ({ children }: MainLayoutProps) => {
  const isOpen = useSelector((state: RootState) => state.layout.sidebar.isOpen)
  const dispatch = useAppDispatch()
  const { getProfile } = useProfile()
  const token = useSelector((state: RootState) => state.auth.token)

  const toggle = () => {
    dispatch(toggleSidebar())
  }

  const { data: profileData } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(token)
  })

  useEffect(() => {
    if (profileData) {
      dispatch(setUser(profileData.result))
    }
  }, [dispatch, profileData])

  return (
    <AuthGuard>
      <div className="relative min-h-screen">
        <Sidebar isSidebarOpen={isOpen} toggleSidebar={toggle} />
        <Suspense fallback={<Loading />}>
          <div
            className={`flex min-h-screen flex-1 flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'ml-[300px]' : ''}`}
          >
            <Overlay isSidebarOpen={isOpen} toggleSidebar={toggle} />
            <Header isSidebarOpen={isOpen} toggleSidebar={toggle} />
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
