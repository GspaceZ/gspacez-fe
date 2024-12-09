'use client'

import * as React from 'react'
import { AuthLayoutProps } from '@/types/props/layouts'
import FImage from '../common/FImage'
import Logo from '@/public/logo.png'
import { Suspense } from 'react'
import Loading from './loading'

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="mt-[100px] flex w-full flex-col items-center">
      <FImage alt="logo" src={Logo.src} className="w-[235px]" />
      <Suspense fallback={<Loading />}>
        <div>{children}</div>
      </Suspense>
    </div>
  )
}

export default AuthLayout
