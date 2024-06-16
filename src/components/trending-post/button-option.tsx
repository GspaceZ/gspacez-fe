'use client'

import * as React from 'react'
import { pathWithLocale } from '@/utils/helpers/path-with-locale'
import { iconMap } from '@/utils/icons/icon-map'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

export interface ButtonOptionsProps {
  button: {
    name: string
    icon: string
    path: string
    count?: number
  }
}

const ButtonOption = ({ button }: ButtonOptionsProps) => {
  const t = useTranslations('button')

  const IconComponent = iconMap[button.icon]

  const pathname = usePathname()
  const router = useRouter()

  const handleRedirect = (path: string) => {
    const destinationPath = pathWithLocale(pathname, button.path)
    router.push(destinationPath)
  }

  const handleClick = () => {
    handleRedirect(button.path);
  }

  return (
    <div className="relative">
      {(button.count !== undefined && button.count > 0) && (
        <div className="absolute -top-3 -right-2 bg-rose-500 text-white rounded-full w-5 h-5 flex items-center justify-center z-10 transform translate-y-0.5">
          <span className="text-xs">{button.count}</span>
        </div>
      )}
      <button 
        className="bg-zinc-200 hover:bg-zinc-300 rounded-lg p-2 border border-gray-100 cursor-pointer text-center relative z-0 transition-colors duration-200"
        onClick={handleClick}
        aria-label={button.name}
      >
        <IconComponent className="text-xl" aria-hidden="true" />
      </button>
    </div>
  )
}

export default ButtonOption
