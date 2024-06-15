'use client'

import { pathWithLocale } from '@/utils/helpers/path-with-locale'
import { iconMap } from '@/utils/icons/icon-map'
import { Button, Link } from '@nextui-org/react'
import { usePathname, useRouter } from 'next/navigation'

interface SidebarOptionProps {
  name: string
  icon: string
  path: string
}

const SidebarOption = ({ name, icon, path }: SidebarOptionProps) => {
  const IconComponent = iconMap[icon]

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
      className="w-full h-[60px] flex items-center border-b border-t border-gray-200 justify-between"
    >
      <span className="ml-4 text-xl font-bold">{name}</span>
      <IconComponent className="mr-4 text-2xl" />
    </Button>
  )
}

export default SidebarOption
