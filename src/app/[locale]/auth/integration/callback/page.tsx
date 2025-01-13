'use client'

import { useAuth } from '@/hooks/useAuth'
import { RootState, useAppDispatch } from '@/utils/store'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { setAuth } from '@/utils/store/auth'
import { useLocale } from 'next-intl'
import { useSelector } from 'react-redux'
import { clearCallbackUrl } from '@/utils/store/guard'
import { useFToastContext } from '@/components/common/FToast'

const Page = () => {
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code') as string
  const { fToast } = useFToastContext()
  const locale = useLocale()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const callbackUrl = useSelector((state: RootState) => state.guard.callbackUrl)

  const { getTokenByGoogle } = useAuth()

  const { mutate: getAccessToken } = useMutation({
    mutationFn: ({ locale, code }: { locale: string; code: string }) =>
      getTokenByGoogle(locale, code),
    onSuccess: (data) => {
      dispatch(setAuth(data.data.result))
      if (callbackUrl) {
        router.push(callbackUrl)
        dispatch(clearCallbackUrl())
      } else {
        router.push(`/${locale}/home`)
      }
    },
    onError: () => {
      router.push(`/${locale}/auth/signin`)
      fToast('Something happen! Try it later', 'error')
    }
  })

  useEffect(() => {
    getAccessToken({
      locale,
      code
    })
  }, [code, getAccessToken, locale])

  return <></>
}

export default Page
