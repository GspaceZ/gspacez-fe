'use client'

import { useAuth } from '@/hooks/useAuth'
import { useAppDispatch } from '@/utils/store'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { setAuth } from '@/utils/store/auth'
import { fToast } from '@/helpers/toast'
import { useLocale } from 'next-intl'

const Page = () => {
  const params = new URLSearchParams(window.location.search)
  console.log(params)
  const code = params.get('code') as string
  const locale = useLocale()
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { getTokenByGoogle } = useAuth()

  const { mutate: getAccessToken } = useMutation({
    mutationFn: ({ locale, code }: { locale: string; code: string }) =>
      getTokenByGoogle(locale, code),
    onSuccess: (data) => {
      dispatch(setAuth(data.data.result))
      router.push(`/${locale}/home`)
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
