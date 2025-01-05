'use client'

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image } from '@nextui-org/react'
import { useTranslations, useLocale } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'
import EN from '@/public/EN.png'
import VN from '@/public/VN.png'
import { usePathname, useRouter } from 'next/navigation'

type Lang = {
  image: string
  label: string
  value: string
}

export const LocaleButton = () => {
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
    <Dropdown placement="bottom-end" className="bg-gray-50">
      <DropdownTrigger className="mr-2 cursor-pointer">
        <Image src={currLang?.image} alt={currLang?.value} width="24" className="rounded-full" />
      </DropdownTrigger>
      <DropdownMenu variant="shadow">
        {languages.map((lang) => (
          <DropdownItem key={lang.value} onClick={() => handleChangeLanguage(lang.value)}>
            <div className="flex items-center gap-2">
              <Image src={lang.image} alt={lang.value} width="24" className="rounded-full" />
              <span>{lang.label}</span>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
