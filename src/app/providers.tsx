'use client'

import { NextUIProvider } from '@nextui-org/react'
import { store } from '@/utils/store'
import { Provider as ReduxProvider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'

persistStore(store)
const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </ReduxProvider>
    </NextUIProvider>
  )
}

export const useRedirect = () => {
  const router = useRouter()
  const locale = useLocale()

  const redirect = (path: string) => {
    router.push(`/${locale}${path}`)
  }

  return { redirect }
}
