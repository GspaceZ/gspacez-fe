'use client'

import * as React from 'react'
import { AuthLayoutProps } from '@/types/props/layouts'
import FImage from '../common/FImage'
import Logo from '@/public/logo.png'
import { Suspense } from 'react'
import Loading from './loading'
import { AuthGuard } from './AuthGuard'
import { LocaleButton } from './LocaleButton'

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <AuthGuard>
      <div className="mt-4 flex w-full justify-end">
        <LocaleButton />
      </div>
      <div className="mt-[100px] flex w-full flex-col items-center">
        <FImage alt="logo" src={Logo.src} className="w-[235px]" />
        <Suspense fallback={<Loading />}>
          <div>{children}</div>
        </Suspense>
      </div>
    </AuthGuard>
  )
}

export default AuthLayout
