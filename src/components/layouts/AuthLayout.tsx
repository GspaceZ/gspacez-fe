'use client'

import * as React from 'react'
import { AuthLayoutProps } from '@/types/props/layouts'
import FImage from '../common/FImage'

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="w-full flex flex-col items-center mt-[100px]">
      <FImage alt="logo" src="/logo.png" className="w-[235px]" />
      <div>{children}</div>
    </div>
  )
}

export default AuthLayout
