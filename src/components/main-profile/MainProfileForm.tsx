'use client'

import { useState, useEffect } from 'react'
import { Input, Button } from '@nextui-org/react'
import InputWithError from '../common/InputWithError'
import { IMainProfileFormValues } from '@/helpers/form-value/main-profile-value'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProfile } from '@/hooks/useProfile'
import { useTranslations } from 'next-intl'
import { useAppSelector, RootState } from '@/utils/store'
import { pathWithLocale } from '@/helpers/url/path-with-locale'
import { usePathname, useRouter } from 'next/navigation'
import { ROUTE } from '@/utils/constant/route'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import FImage from '../common/FImage'
import { RESPONSE_CODES } from '@/utils/constant/codes'
import { fToast } from '@/helpers/toast'

const MainProfileForm = () => {
  const t = useTranslations('profile')

  const { updateProfile } = useProfile()
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  const token = useAppSelector((state: RootState) => state.auth.token)

  useEffect(() => {
    const handleRedirect = (path: string) => {
      const destinationPath = pathWithLocale(pathname, path)
      router.push(destinationPath)
    }

    if (!token) {
      handleRedirect(ROUTE.auth.signin)
    }
  }, [pathname, router, token])

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
    <form className="w-screen max-w-[314px] mx-auto flex flex-col items-center mt-[50px] gap-[14px] -z-10">
      <div className="flex items-center h-[56px] mb-[20px]">
        <FImage src="/landingAvatar.png" alt="avatar" className="h-[70px] rounded-[1000px]" />
        <Button className="text-center" color="primary" variant="light">
          {t('choose_avatar')}
        </Button>
      </div>
      <InputWithError>
        <div className="flex flex-col sm:flex-row justify-between w-full gap-[14px] sm:gap-0">
          <Input
            type="text"
            {...register('firstName')}
            label={t('first_name')}
            className="w-full sm:w-[148px] h-[56px]"
            isRequired
            size="lg"
          />
          <Input
            type="text"
            {...register('lastName')}
            label={t('last_name')}
            className="w-full sm:w-[148px] h-[56px]"
            isRequired
            size="lg"
          />
        </div>
        <p className="text-red-500 text-sm">{errors?.firstName?.message}</p>
        <p className="text-red-500 text-sm">{errors?.lastName?.message}</p>
      </InputWithError>
      <InputWithError>
        <Input
          type="text"
          {...register('country')}
          label={t('country')}
          className="w-full h-[56px]"
          isRequired
          size="lg"
        />
      </InputWithError>
      <InputWithError>
        <Input
          type="text"
          {...register('city')}
          label={t('city')}
          className="w-full h-[56px]"
          isRequired
          size="lg"
        />
      </InputWithError>
      <InputWithError>
        <Input
          type="text"
          {...register('address')}
          label={t('address')}
          className="w-full h-[56px]"
          isRequired
          size="lg"
        />
        <p className="text-red-500 text-sm">{errors?.address?.message}</p>
      </InputWithError>
      <InputWithError>
        <Input
          type="date"
          {...register('dob')}
          label={t('dob')}
          className="w-full h-[56px]"
          isRequired
          size="lg"
        />
      </InputWithError>
      <div className="flex items-center justify-center gap-[20px]">
        <Button
          className="w-[90px] h-[38px]"
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
