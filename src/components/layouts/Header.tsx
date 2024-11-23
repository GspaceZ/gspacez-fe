'use client'

import * as React from 'react'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image
} from '@nextui-org/react'
import { HeaderProps } from '@/types/props/layouts'
import { useLocale, useTranslations } from 'next-intl'
import EN from '@/public/EN.png'
import VN from '@/public/VN.png'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'
import { IconLayoutSidebarLeftExpandFilled } from '@tabler/icons-react'

type Lang = {
  image: string
  label: string
  value: string
}

const Header = ({ title, isSidebarOpen, toggleSidebar }: HeaderProps) => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [currLang, setCurrLang] = useState<Lang | undefined>(undefined)
  const t = useTranslations('locale')

  const languages: Lang[] = useMemo(() => {
    return [
      {
        image: EN.src,
        label: t('en'),
        value: 'en'
      },
      {
        image: VN.src,
        label: t('vi'),
        value: 'vi'
      }
    ]
  }, [t])

  const handleChangeLanguage = (lang: string) => {
    if (lang !== locale && languages.map((lang) => lang.value).includes(lang)) {
      const parts = pathname.split('/')
      parts[1] = lang
      router.push(parts.join('/'))
    }
  }

  useEffect(() => {
    setCurrLang(languages.find((lang) => lang.value === locale))
  }, [languages, locale])

  return (
    <div
      className={`sticky top-0 z-30 flex h-[80px] items-center border-b border-gray-200 bg-white shadow-md lg:mr-[300px] ${isSidebarOpen ? 'hidden lg:flex' : ''}`}
    >
      <Button
        isIconOnly
        className={`fixed left-0 ml-4 ${isSidebarOpen && 'hidden'}`}
        variant="light"
        onClick={() => toggleSidebar()}
      >
        <IconLayoutSidebarLeftExpandFilled size="28" />
      </Button>
      <span className="mx-auto text-3xl font-extrabold">{title}</span>
      <Dropdown placement="bottom-end" className="bg-gray-50">
        <DropdownTrigger className="mr-2 cursor-pointer">
          <Image src={currLang?.image} alt={currLang?.value} width="32" className="rounded-full" />
        </DropdownTrigger>
        <DropdownMenu variant="shadow">
          {languages.map((lang) => (
            <DropdownItem key={lang.value} onClick={() => handleChangeLanguage(lang.value)}>
              <div className="flex items-center gap-2">
                <Image src={lang.image} alt={lang.value} width="32" className="rounded-full" />
                <span>{lang.label}</span>
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default Header
