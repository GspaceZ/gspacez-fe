'use client'

import * as React from 'react'
import { Image } from '@nextui-org/react'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="w-full flex flex-col items-center mt-[100px]">
      <Image alt="logo" src="/logo.png" className="w-[235px]" />
      <div>{children}</div>
    </div>
  )
}

export default AuthLayout
