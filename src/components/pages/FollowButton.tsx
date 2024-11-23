'use client'

import { Button } from '@nextui-org/react'
import { useTranslations } from 'next-intl'

interface FollowButtonProps {
  status: string
}

export const FollowButton = (props: FollowButtonProps) => {
  const t = useTranslations('pages')

  const buttonVariant = () => {
    switch (props.status) {
      case 'followed':
        return 'default'
      default:
        return 'primary'
    }
  }

  return (
    <Button color={buttonVariant()} className="font-bold" size="sm">
      {t(props.status)}
    </Button>
  )
}
