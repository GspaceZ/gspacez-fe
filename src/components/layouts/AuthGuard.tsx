'use client'

import { useAuth } from '@/hooks/useAuth'
import { RootState } from '@/utils/store'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RefreshTokenRequestDto } from '@/types/response/auth'
import { useAppDispatch } from '@/utils/store'
import { setAuth } from '@/utils/store/auth'
import { logout } from '@/utils/store/auth'
import { logout as logoutUser } from '@/utils/store/user'
import { pathWithLocale } from '@/helpers/url/path-with-locale'
import { usePathname, useRouter } from 'next/navigation'
import { ROUTE } from '@/utils/constant/route'

interface AuthGuardProps {
  children: ReactNode
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { verifyToken, refreshToken: refresh } = useAuth()
  const token = useSelector((state: RootState) => state.auth.token)
  const refreshToken = useSelector((state: RootState) => state.auth.refreshToken)
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const router = useRouter()

  const handleRedirect = (path: string) => {
    const destinationPath = pathWithLocale(pathname, path)
    router.push(destinationPath)
  }

  const { data } = useQuery({
    queryKey: ['verify'],
    queryFn: () => {
      return verifyToken({ token })
    },
    refetchInterval: 30000,
    refetchIntervalInBackground: true
  })

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
    if (!data?.result.valid)
      mutateRefreshToken({
        dto: {
          accessTokenExpired: token,
          refreshToken: refreshToken
        }
      })
  }, [data])

  return <>{children}</>
}
