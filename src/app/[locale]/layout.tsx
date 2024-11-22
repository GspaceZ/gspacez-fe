import { Toaster } from 'react-hot-toast'
import { Providers } from '../providers'
import './globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <head>
        <title>GspaceZ</title>
      </head>
      <body>
        <SpeedInsights />
        <NextIntlClientProvider messages={messages}>
          <Toaster />
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
