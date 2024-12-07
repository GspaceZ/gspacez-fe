'use client'

import * as React from 'react'
import AuthLayout from '@/components/layouts/AuthLayout'
import { useTranslations } from 'next-intl'
import InputWithError from '@/components/common/InputWithError'
import { Button, Input } from '@nextui-org/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '@/utils/store'
import { setResetEmail } from '@/utils/store/email'
import { IForgotPasswordFormValues } from '@/helpers/form-value/forgot-password-value'
import { usePathname, useRouter } from 'next/navigation'
import { pathWithLocale } from '@/helpers/url/path-with-locale'
import { ROUTE } from '@/utils/constant/route'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import { RESPONSE_CODES } from '@/utils/constant/codes'
import { fToast } from '@/helpers/toast'

const Page: React.FC = () => {
  const t = useTranslations('auth')

  const router = useRouter()
  const pathname = usePathname()

  const dispatch = useAppDispatch()

  const { forgotPassword } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleRedirect = (path: string) => {
    const destinationPath = pathWithLocale(pathname, path)
    router.push(destinationPath)
  }

  const forgotPasswordSchema = z.object({
    email: z.string().email({ message: t('error_messages.email') })
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const onSubmit = async (data: IForgotPasswordFormValues) => {
    setIsLoading(true)
    dispatch(setResetEmail({ email: data.email }))
    const forgotPasswordRes = await forgotPassword(data.email)
    if (forgotPasswordRes) {
      const code = forgotPasswordRes.code
      switch (code) {
        case RESPONSE_CODES.SUCCESS:
          fToast(t('toast.forgot_password.success'), 'success')
          handleRedirect(ROUTE.auth.verify_otp)
          break

        case RESPONSE_CODES.USER_EXISTED:
          fToast(t('toast.signup.existed'), 'danger')
          break

        default:
          fToast(t('toast.unknown'), 'danger')
      }
    } else {
      fToast(t('toast.unknown'), 'danger')
    }
    setIsLoading(false)
  }

  return (
    <AuthLayout>
      <div className="mt-[50px] flex min-h-[100vh] w-[360px] flex-col justify-between rounded-[20px] border border-gray-200 shadow-md md:min-h-[232px] md:w-[420px]">
        <div className="flex flex-col items-center">
          <span className="mt-[28px] text-3xl font-extrabold">
            {t('forgot_password.forgot_password_title')}
          </span>
          <form className="mt-[24px] flex w-fit flex-col items-center gap-[14px]">
            <InputWithError>
              <Input
                type="email"
                {...register('email')}
                label={t('forgot_password.email')}
                className="h-[56px] w-[314px] md:w-[340px]"
                size="lg"
              />
              <p className="text-sm text-red-500">{errors?.email?.message}</p>
            </InputWithError>
            <Button
              className="my-4 h-[38px]"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              isLoading={isLoading}
            >
              {t('forgot_password.send_recovery_email')}
            </Button>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Page
