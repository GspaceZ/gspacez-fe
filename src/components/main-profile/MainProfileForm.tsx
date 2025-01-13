'use client'

import { useState } from 'react'
import { Input, Button } from '@nextui-org/react'
import InputWithError from '../common/InputWithError'
import { IMainProfileFormValues } from '@/helpers/form-value/main-profile-value'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProfile } from '@/hooks/useProfile'
import { useTranslations } from 'next-intl'
import { useAppSelector, RootState } from '@/utils/store'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import FImage from '../common/FImage'
import { RESPONSE_CODES } from '@/utils/constant/codes'
import LandingAvatar from '@/public/landingAvatar.png'
import { useFToastContext } from '../common/FToast'

const MainProfileForm = () => {
  const t = useTranslations('profile')

  const { updateProfile } = useProfile()
  const [isLoading, setIsLoading] = useState(false)

  const token = useAppSelector((state: RootState) => state.auth.token)

  const { fToast } = useFToastContext()

  const updateProfileSchema = z.object({
    firstName: z
      .string()
      .trim()
      .min(1, { message: t('error_messages.first_name') })
      .max(20, { message: t('error_messages.first_name') }),
    lastName: z
      .string()
      .trim()
      .min(1, { message: t('error_messages.last_name') })
      .max(20, { message: t('error_messages.last_name') }),
    address: z.string().trim()
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IMainProfileFormValues>({
    resolver: zodResolver(updateProfileSchema)
  })

  const onSave = async (data: IMainProfileFormValues) => {
    setIsLoading(true)
    try {
      const updateProfileRes = await updateProfile(
        data.firstName,
        data.lastName,
        data.dob,
        data.phone,
        data.country,
        data.city,
        data.address,
        token
      )
      if (updateProfileRes) {
        const code = updateProfileRes.code
        switch (code) {
          case RESPONSE_CODES.SUCCESS:
            fToast(t('toast.success'), 'success')
            break

          case RESPONSE_CODES.UNAUTHENTICATED_2:
            fToast(t('toast.unauthenticated'), 'danger')
            break

          default:
            fToast(t('toast.unknown'), 'danger')
        }
      } else {
        fToast(t('toast.unknown'), 'danger')
      }
    } catch (error) {
      fToast(t('toast.unknown'), 'danger')
      console.error('Error update profile: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className="-z-10 mx-auto mt-[50px] flex w-screen max-w-[314px] flex-col items-center gap-[14px]">
      <div className="mb-[20px] flex h-[56px] items-center">
        <FImage src={LandingAvatar.src} alt="avatar" className="h-[70px] rounded-[1000px]" />
        <Button className="text-center" color="primary" variant="light">
          {t('choose_avatar')}
        </Button>
      </div>
      <InputWithError>
        <div className="flex w-full flex-col justify-between gap-[14px] sm:flex-row sm:gap-0">
          <Input
            type="text"
            {...register('firstName')}
            label={t('first_name')}
            className="h-[56px] w-full sm:w-[148px]"
            isRequired
            size="lg"
          />
          <Input
            type="text"
            {...register('lastName')}
            label={t('last_name')}
            className="h-[56px] w-full sm:w-[148px]"
            isRequired
            size="lg"
          />
        </div>
        <p className="text-sm text-red-500">{errors?.firstName?.message}</p>
        <p className="text-sm text-red-500">{errors?.lastName?.message}</p>
      </InputWithError>
      <InputWithError>
        <Input
          type="text"
          {...register('country')}
          label={t('country')}
          className="h-[56px] w-full"
          isRequired
          size="lg"
        />
      </InputWithError>
      <InputWithError>
        <Input
          type="text"
          {...register('city')}
          label={t('city')}
          className="h-[56px] w-full"
          isRequired
          size="lg"
        />
      </InputWithError>
      <InputWithError>
        <Input
          type="text"
          {...register('address')}
          label={t('address')}
          className="h-[56px] w-full"
          isRequired
          size="lg"
        />
        <p className="text-sm text-red-500">{errors?.address?.message}</p>
      </InputWithError>
      <InputWithError>
        <Input
          type="date"
          {...register('dob')}
          label={t('dob')}
          className="h-[56px] w-full"
          isRequired
          size="lg"
        />
      </InputWithError>
      <div className="flex items-center justify-center gap-[20px]">
        <Button
          className="h-[38px] w-[90px]"
          color="primary"
          onClick={handleSubmit(onSave)}
          isLoading={isLoading}
        >
          {t('save')}
        </Button>
      </div>
    </form>
  )
}

export default MainProfileForm
