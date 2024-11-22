'use client'

import { PageInfoProps } from '@/types/pages'
import { Avatar, Button } from '@nextui-org/react'
import { FollowButton } from './FollowButton'
import { useState } from 'react'
import Link from 'next/link'
import { IconBrandFacebook, IconBrandInstagram, IconLink } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

export const PageInfo = (props: PageInfoProps) => {
  const [isShowFullPageInfo, setIsShowFullPageInfo] = useState(false)
  const t = useTranslations('pages')

  return (
    <div className="flex flex-col pb-2 pl-6 pt-4">
      <div className="flex items-center gap-6">
        <Avatar src={props.avatar} size="lg" />
        <div className="flex items-center gap-2">
          <FollowButton status="followed" />
          <Button variant="bordered" color="primary" className="font-bold" size="sm">
            {t('message')}
          </Button>
        </div>
      </div>
      <span className="mt-2 text-2xl font-bold">{props.name}</span>
      <span className="text-lg">{props.shortDesc}</span>
      {isShowFullPageInfo && (
        <>
          <span className="text-md mt-2">{props.fullDesc}</span>
          <Link href={props.facebook} className="flex items-center gap-1 hover:underline">
            <IconBrandFacebook size="18" />
            <span>{t('facebook')}</span>
          </Link>
          <Link href={props.facebook} className="flex items-center gap-1 hover:underline">
            <IconBrandInstagram size="18" />
            <span>{t('instagram')}</span>
          </Link>
          <Link href={props.link} className="flex items-center gap-1 hover:underline">
            <IconLink size="18" />
            <span>{t('link')}</span>
          </Link>
        </>
      )}
      <button
        className="text-md mt-1 w-fit p-0 font-bold text-primary"
        onClick={() => setIsShowFullPageInfo(!isShowFullPageInfo)}
      >
        {isShowFullPageInfo ? t('hide') : t('more')}
      </button>
    </div>
  )
}
