import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

const locales = ['en', 'vi']

export default getRequestConfig(async ({ requestLocale }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!locales.includes(requestLocale as any)) notFound()

  return {
    messages: (await import(`../messages/${requestLocale}.json`)).default
  }
})
