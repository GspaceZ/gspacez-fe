'use client'

import * as React from 'react'
import { Button } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'
import { FLink } from '../common/FLink'

interface SidebarOptionProps {
  name: string
  icon: ReactNode
  path: string
}

const SidebarOption = ({ name, icon, path }: SidebarOptionProps) => {
  const t = useTranslations('sidebar')

  return (
    <FLink path={path}>
      <Button
        variant="light"
        radius="none"
        className="flex h-[60px] w-full items-center justify-between border-b border-t border-gray-200"
      >
        <span className="ml-4 text-lg font-bold">{t(name)}</span>
        {icon}
      </Button>
    </FLink>
  )
}

export default SidebarOption
