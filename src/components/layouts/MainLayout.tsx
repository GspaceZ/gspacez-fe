import * as React from 'react'
import Header from './Header'

interface MainLayoutProps {
  children: React.ReactNode
  title: string
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
  return (
    <div>
      <Header title={title} />
      <div>{children}</div>
    </div>
  )
}

export default MainLayout
