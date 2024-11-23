'use client'

import { Button } from '@nextui-org/react'
import { IconFlag } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

export const StartEvent = () => {
  const t = useTranslations('pages')

  return (
    <div className="mx-0 mt-4 flex items-center gap-4 rounded-lg border border-gray-300 bg-white py-2 pl-4 md:mx-4">
      <IconFlag size="24" />
      <span className="font-medium">
        {t('start_event')}{' '}
        <Button color="danger" size="sm" className="ml-2">
          {t('start_event_button')}
        </Button>
      </span>
    </div>
  )
}
