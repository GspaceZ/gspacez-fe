'use client'

import { Textarea } from '@nextui-org/react'
import { useTranslations } from 'next-intl'

export const ReportModal = () => {
  const t = useTranslations('message.page.modal')

  return <Textarea placeholder={t('report_placeholder')} />
}
