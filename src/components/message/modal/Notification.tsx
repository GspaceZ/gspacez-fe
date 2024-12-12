'use client'

import { Radio, RadioGroup } from '@nextui-org/react'
import { useTranslations } from 'next-intl'

export const NotificationModal = () => {
  const t = useTranslations('message.page.modal.notification')

  const notificationChoices = [
    {
      label: t('never'),
      value: '0'
    },
    {
      label: t('1_hour'),
      value: '1'
    },
    {
      label: t('8_hours'),
      value: '8'
    },
    {
      label: t('24_hours'),
      value: '24'
    },
    {
      label: t('end'),
      value: 'end'
    },
    {
      label: t('manual'),
      value: 'manual'
    }
  ]

  return (
    <RadioGroup>
      {notificationChoices.map((choice) => (
        <Radio value={choice.value} key={choice.value}>
          {choice.label}
        </Radio>
      ))}
    </RadioGroup>
  )
}
