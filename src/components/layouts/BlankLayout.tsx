'use client'

import { BlankLayoutProps } from '@/types/props/layouts'
import { RootState } from '@/utils/store'
import { useSelector } from 'react-redux'
import * as React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { pathWithLocale } from '@/helpers/url/path-with-locale'
import { ROUTE } from '@/utils/constant/route'

const BlankLayout = ({ children }: BlankLayoutProps) => {
  const token = useSelector((state: RootState) => state.auth.token)
  const pathname = usePathname()
  const router = useRouter()

  const handleRedirect = useCallback(
    (path: string) => {
      const destinationPath = pathWithLocale(pathname, path)
      router.push(destinationPath)
    },
    [pathname, router]
  )

  useEffect(() => {
    if (token) {
      handleRedirect(ROUTE.pages.home)
    }
  }, [token])

  return <>{children}</>
}

export default BlankLayout
