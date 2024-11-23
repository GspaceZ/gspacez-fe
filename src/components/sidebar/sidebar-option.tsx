'use client'

import * as React from 'react'
import { pathWithLocale } from '@/helpers/url/path-with-locale'
import { Button } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'

interface SidebarOptionProps {
  name: string
  icon: ReactNode
  path: string
}

const SidebarOption = ({ name, icon, path }: SidebarOptionProps) => {
  const t = useTranslations('sidebar')

  const pathname = usePathname()
  const router = useRouter()

  const handleRedirect = (path: string) => {
    const destinationPath = pathWithLocale(pathname, path)
    router.push(destinationPath)
  }

  return (
    <Button
      onPress={() => handleRedirect(path)}
      variant="light"
      radius="none"
      className="flex h-[60px] w-full items-center justify-between border-b border-t border-gray-200"
    >
      <span className="ml-4 text-lg font-bold">{t(name)}</span>
      {icon}
    </Button>
  )
}

export default SidebarOption
