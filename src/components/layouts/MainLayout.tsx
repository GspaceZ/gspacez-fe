import * as React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

interface MainLayoutProps {
  children: React.ReactNode
  title: string
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
  return (
    <div>
      <Sidebar />
      <Header title={title} />
      <div>{children}</div>
    </div>
  )
}

export default MainLayout
