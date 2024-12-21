'use client'

import { useAuth } from '@/hooks/useAuth'
import { RootState } from '@/utils/store'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ReactNode, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RefreshTokenRequestDto } from '@/types/response/auth'
import { useAppDispatch } from '@/utils/store'
import { setAuth } from '@/utils/store/auth'
import { logout } from '@/utils/store/auth'
import { logout as logoutUser } from '@/utils/store/user'
import { pathWithLocale } from '@/helpers/url/path-with-locale'
import { usePathname, useRouter } from 'next/navigation'
import { ROUTE } from '@/utils/constant/route'
import { getCookie } from '@/helpers/cookie'

interface AuthGuardProps {
  children: ReactNode
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { verifyToken, refreshToken: refresh } = useAuth()
  const token = useSelector((state: RootState) => state.auth.token)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const refreshToken = getCookie('refreshToken')
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const router = useRouter()

  const handleRedirect = useCallback(
    (path: string) => {
      const destinationPath = pathWithLocale(pathname, path)
      router.push(destinationPath)
    },
    [pathname, router]
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = useQuery({
    queryKey: ['verify'],
    queryFn: () => {
      if (token) {
        return verifyToken({ token })
      }
    },
    refetchInterval: 30000,
    refetchIntervalInBackground: true
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutate: mutateRefreshToken } = useMutation({
    mutationFn: ({ dto }: { dto: RefreshTokenRequestDto }) => refresh(dto),
    onSuccess: (data) => {
      dispatch(setAuth(data.data.result))
    },
    onError() {
      dispatch(logout())
      dispatch(logoutUser())
      handleRedirect(ROUTE.auth.signin)
    }
  })

  useEffect(() => {
    if (data?.result.valid === false)
      mutateRefreshToken({
        dto: {
          accessTokenExpired: token,
          refreshToken: refreshToken || ''
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.result.valid])

  useEffect(() => {
    if (!token) {
      handleRedirect(ROUTE.auth.signin)
    } else {
      handleRedirect(ROUTE.pages.home)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return <>{children}</>
}
