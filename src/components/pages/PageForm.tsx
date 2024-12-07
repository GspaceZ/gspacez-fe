'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Image, Input } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import LandingAvatar from '@/public/landingAvatar.png'
import InputWithError from '../common/InputWithError'
import { useTranslations } from 'next-intl'

export const PageForm = () => {
  const t = useTranslations('pages.edit')

  const pageSchema = z.object({
    name: z.string(),
    shortDescription: z.string().optional(),
    fullDescription: z.string().optional(),
    facebook: z.string(),
    instagram: z.string(),
    link: z.string()
  })

  const { register } = useForm<z.infer<typeof pageSchema>>({
    resolver: zodResolver(pageSchema)
  })

  return (
    <form className="mx-auto mt-[50px] flex w-screen max-w-[314px] flex-col items-center gap-[14px]">
      <div className="mb-[20px] flex h-[56px] items-center">
        <Image src={LandingAvatar.src} alt="avatar" className="h-[70px] rounded-[1000px]" />
        <Button className="text-center" color="primary" variant="light">
          {t('choose_avatar')}
        </Button>
      </div>
      <InputWithError>
        <Input
          type="text"
          {...register('name')}
          label={t('name')}
          className="h-[56px] w-full"
          isRequired
        />
      </InputWithError>
      <InputWithError>
        <Input
          type="text"
          {...register('shortDescription')}
          label={t('shortDescription')}
          className="h-[56px] w-full"
          isRequired
        />
      </InputWithError>
      <InputWithError>
        <Input
          type="text"
          {...register('fullDescription')}
          label={t('fullDescription')}
          className="h-[56px] w-full"
          isRequired
        />
      </InputWithError>
      <InputWithError>
        <Input
          type="text"
          {...register('facebook')}
          label={t('facebook')}
          className="h-[56px] w-full"
        />
      </InputWithError>
      <InputWithError>
        <Input
          type="text"
          {...register('instagram')}
          label={t('instagram')}
          className="h-[56px] w-full"
        />
      </InputWithError>
      <InputWithError>
        <Input type="text" {...register('link')} label={t('link')} className="h-[56px] w-full" />
      </InputWithError>
      <div className="flex items-center justify-center gap-2">
        <Button color="primary" className="font-bold">
          {t('save')}
        </Button>
        <Button className="font-bold">{t('cancel')}</Button>
      </div>
    </form>
  )
}
