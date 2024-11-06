'use client'

import * as React from 'react'
import { AuthLayoutProps } from '@/types/props/layouts'
import FImage from '../common/FImage'
import Logo from '@/public/logo.png'

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="mt-[100px] flex w-full flex-col items-center">
      <FImage alt="logo" src={Logo.src} className="w-[235px]" />
      <div>{children}</div>
    </div>
  )
}

export default AuthLayout
