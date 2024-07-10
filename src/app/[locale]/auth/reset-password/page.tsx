'use client'

import * as React from 'react'
import AuthLayout from '@/components/layouts/AuthLayout'
import { useTranslations } from 'next-intl'
import InputWithError from '@/components/common/InputWithError'
import { Button, Input } from '@nextui-org/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAppSelector, useAppDispatch } from '@/utils/store'
import { clearResetEmail } from '@/utils/store/email'
import { IResetPasswordFormValues } from '@/helpers/form-value/reset-password-value'
import { usePathname, useRouter } from 'next/navigation'
import { pathWithLocale } from '@/helpers/url/path-with-locale'
import { ROUTE } from '@/utils/constant/route'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import { RESPONSE_CODES } from '@/utils/constant/codes'
import { fToast } from '@/helpers/toast'
import ShowPassword from '@/components/common/ShowPassword'

const Page: React.FC = () => {
  const t = useTranslations('auth')

  const router = useRouter()
  const pathname = usePathname()

  const dispatch = useAppDispatch()
  const resetEmail = useAppSelector((state) => state.email.resetEmail)

  const { resetPassword } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState<boolean>(false)

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword)
  }

  const toggleShowConfirmPassword = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword)
  }

  const handleRedirect = (path: string) => {
    const destinationPath = pathWithLocale(pathname, path)
    router.push(destinationPath)
  }

  const resetPasswordSchema = z
    .object({
      password: z
        .string()
        .min(8, { message: t('error_messages.password.length') })
        .regex(/[a-z]/, {
          message: t('error_messages.password.lowercase')
        })
        .regex(/[A-Z]/, {
          message: t('error_messages.password.uppercase')
        })
        .regex(/[0-9]/, {
          message: t('error_messages.password.number')
        })
        .regex(/[^a-zA-Z0-9]/, {
          message: t('error_messages.password.special')
        }),
      confirmPassword: z.string()
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('error_messages.password.confirm'),
      path: ['confirmPassword']
    })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema)
  })

  const onSubmit = async (data: IResetPasswordFormValues) => {
    setIsLoading(true)
    try {
      const resetPasswordRes = await resetPassword(resetEmail, data.password)
      if (resetPasswordRes) {
        const code = resetPasswordRes.code
        switch (code) {
          case RESPONSE_CODES.SUCCESS:
            fToast(t('toast.reset_password.success'), 'success')
            dispatch(clearResetEmail())
            handleRedirect(ROUTE.auth.signin)
            break

          case RESPONSE_CODES.USER_EXISTED:
            fToast(t('toast.reset_password.not_exist'), 'danger')
            break

          default:
            fToast(t('toast.unknown'), 'danger')
        }
      } else {
        fToast(t('toast.unknown'), 'danger')
      }
    } catch (error) {
      fToast(t('toast.unknown'), 'danger')
      console.error('Error: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      <div className="mt-[50px] flex flex-col w-[360px] md:w-[420px] min-h-[100vh] md:min-h-[232px] rounded-[20px] border border-gray-200 justify-between shadow-md">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-extrabold mt-[28px]">
            {t('reset_password.recover_account')}
          </span>
          <form className="flex flex-col items-center w-fit mt-[24px] gap-[14px]">
            <InputWithError>
              <Input
                type={isShowPassword ? 'text' : 'password'}
                label={t('password')}
                {...register('password')}
                className="w-[314px] md:w-[340px] h-[56px]"
                size="lg"
                endContent={
                  <ShowPassword
                    isVisible={isShowPassword}
                    toggleShowPassword={toggleShowPassword}
                  />
                }
              />
              <p className="text-red-500 text-sm">{errors?.password?.message}</p>
            </InputWithError>
            <InputWithError>
              <Input
                type={isShowConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                label={t('confirm_password')}
                className="w-[314px] md:w-[340px] h-[56px]"
                size="lg"
                endContent={
                  <ShowPassword
                    isVisible={isShowConfirmPassword}
                    toggleShowPassword={toggleShowConfirmPassword}
                  />
                }
              />
              <p className="text-red-500 text-sm">{errors?.confirmPassword?.message}</p>
            </InputWithError>
            <Button
              className="my-4 h-[38px]"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              isLoading={isLoading}
            >
              {t('reset_password.reset_password_button')}
            </Button>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Page
