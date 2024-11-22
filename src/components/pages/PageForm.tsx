'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Image, Input } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import LandingAvatar from '@/public/landingAvatar.png'
import InputWithError from '../common/InputWithError'

export const PageForm = () => {
  const pageSchema = z.object({
    name: z.string(),
    shortDesc: z.string().optional(),
    fullDesc: z.string().optional(),
    facebook: z.string(),
    instagram: z.string(),
    link: z.string()
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof pageSchema>>({
    resolver: zodResolver(pageSchema)
  })

  return (
    <form className="mx-auto mt-[50px] flex w-screen max-w-[314px] flex-col items-center gap-[14px]">
      <div className="mb-[20px] flex h-[56px] items-center">
        <Image src={LandingAvatar.src} alt="avatar" className="h-[70px] rounded-[1000px]" />
        <Button className="text-center" color="primary" variant="light">
          Choose avatar
        </Button>
      </div>
      <InputWithError>
        <Input
          type="text"
          {...register('name')}
          label="Name"
          className="h-[56px] w-full"
          isRequired
        />
      </InputWithError>
      <InputWithError>
        <Input
          type="text"
          {...register('shortDesc')}
          label="Short description"
          className="h-[56px] w-full"
          isRequired
        />
      </InputWithError>
      <InputWithError>
        <Input
          type="text"
          {...register('fullDesc')}
          label="Full description"
          className="h-[56px] w-full"
          isRequired
        />
      </InputWithError>
      <InputWithError>
        <Input type="text" {...register('facebook')} label="Facebook" className="h-[56px] w-full" />
      </InputWithError>
      <InputWithError>
        <Input
          type="text"
          {...register('instagram')}
          label="Instagram"
          className="h-[56px] w-full"
        />
      </InputWithError>
      <InputWithError>
        <Input type="text" {...register('link')} label="Website" className="h-[56px] w-full" />
      </InputWithError>
      <div className="flex items-center justify-center gap-2">
        <Button color="primary" className="font-bold">
          Save
        </Button>
        <Button className="font-bold">Cancel</Button>
      </div>
    </form>
  )
}
