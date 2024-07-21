'use client'

import { Button } from '@nextui-org/react'
import { useTranslations } from 'next-intl'

const Options = () => {
  const t = useTranslations('post.options')

  return (
    <div className="flex flex-col w-[120px] absolute right-0 bg-white rounded-2xl border border-gray-100 shadow">
      <Button className="w-full bg-white h-8 rounded-none">{t('hide')}</Button>
      <Button className="w-full bg-white h-8 rounded-none">{t('privacy')}</Button>
      <Button className="w-full bg-white h-8 rounded-none">{t('edit')}</Button>
    </div>
  )
}

export default Options
