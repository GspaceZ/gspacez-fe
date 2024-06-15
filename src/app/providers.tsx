'use client'
import { NextUIProvider } from '@nextui-org/react'
import { store } from '@/utils/store'
import { Provider as ReduxProvider } from 'react-redux'
import { persistStore } from 'redux-persist'

persistStore(store)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </NextUIProvider>
  )
}
