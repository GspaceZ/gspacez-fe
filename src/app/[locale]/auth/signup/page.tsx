'use client'

import * as React from 'react'
import AuthLayout from '@/components/layouts/AuthLayout'
import { Button, Input } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ISignUpFormValues } from '@/helpers/form-value/signup-value'
import InputWithError from '@/components/common/InputWithError'
import { ROUTE } from '@/utils/constant/route'
import { usePathname, useRouter } from 'next/navigation'
import { pathWithLocale } from '@/helpers/url/path-with-locale'
import { sendActivationMail } from '@/app/api/route/send-activation'
import { getLocale } from '@/helpers/url/get-locale'
import { generateActivationLink } from '@/helpers/activation/activation-link'
import { getBaseUrl } from '@/helpers/url/base-url'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import { RESPONSE_CODES } from '@/utils/constant/codes'
import ShowPassword from '@/components/common/ShowPassword'
import { useFToastContext } from '@/components/common/FToast'

const Page: React.FC = () => {
  const t = useTranslations('auth')

  const router = useRouter()
  const pathname = usePathname()

  const { getEncodedUrl, signUp } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const { fToast } = useFToastContext()
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

  const signUpSchema = z
    .object({
      email: z.string().email({ message: t('error_messages.email') }),
      firstName: z
        .string()
        .min(1, { message: t('error_messages.first_name') })
        .max(20, {
          message: t('error_messages.first_name')
        }),
      lastName: z
        .string()
        .min(1, { message: t('error_messages.last_name') })
        .max(20, { message: t('error_messages.last_name') }),
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
  } = useForm<ISignUpFormValues>({
    resolver: zodResolver(signUpSchema)
  })

  const onSubmit = async (data: ISignUpFormValues) => {
    setIsLoading(true)
    try {
      const signUpRes = await signUp(data.email, data.firstName, data.lastName, data.password)
      if (signUpRes) {
        const code = signUpRes.code
        switch (code) {
          case RESPONSE_CODES.SUCCESS: {
            fToast(t('toast.signup.success'), 'success')
            const { email, firstName, lastName } = signUpRes.result
            const locale = getLocale(pathname)
            const baseUrl = getBaseUrl()
            const activationLink = generateActivationLink({
              email,
              locale,
              baseUrl
            })
            const plainUrl = await getEncodedUrl(email, activationLink)
            if (plainUrl) {
              await sendActivationMail({
                email: email,
                firstName: firstName,
                lastName: lastName,
                activationLink: plainUrl.result.urlEncoded
              })
            }
            // handleRedirect(ROUTE.auth.activate)
            break
          }
          case RESPONSE_CODES.USER_EXISTED: {
            fToast(t('toast.signup.existed'), 'danger')
            break
          }
          default: {
            fToast(t('toast.unknown'), 'danger')
          }
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
      <div className="mt-[50px] flex min-h-[485px] w-[360px] flex-col justify-between rounded-[20px] border border-gray-200 shadow-md md:w-[420px]">
        <div className="flex flex-col items-center">
          <span className="mt-[20px] text-3xl font-extrabold">{t('sign_up')}</span>
          <form className="mt-[20px] flex w-fit flex-col items-center gap-[14px]">
            <InputWithError>
              <Input
                type="email"
                {...register('email')}
                label={t('email')}
                className="h-[56px] w-[314px] md:w-[340px]"
                size="lg"
              />
              <p className="text-sm text-red-500">{errors?.email?.message}</p>
            </InputWithError>
            <InputWithError>
              <div className="flex w-full justify-between">
                <Input
                  type="text"
                  {...register('firstName')}
                  label={t('first_name')}
                  className="h-[56px] w-[150px] md:w-[162px]"
                  size="lg"
                />
                <Input
                  type="text"
                  {...register('lastName')}
                  label={t('last_name')}
                  className="h-[56px] w-[150px] md:w-[162px]"
                  size="lg"
                />
              </div>
              <p className="text-sm text-red-500">{errors?.firstName?.message}</p>
              <p className="text-sm text-red-500">{errors?.lastName?.message}</p>
            </InputWithError>
            <InputWithError>
              <Input
                type={isShowPassword ? 'text' : 'password'}
                label={t('password')}
                {...register('password')}
                className="h-[56px] w-[314px] md:w-[340px]"
                size="lg"
                endContent={
                  <ShowPassword
                    isVisible={isShowPassword}
                    toggleShowPassword={toggleShowPassword}
                  />
                }
              />
              <p className="text-sm text-red-500">{errors?.password?.message}</p>
            </InputWithError>
            <InputWithError>
              <Input
                type={isShowConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                label={t('confirm_password')}
                className="h-[56px] w-[314px] md:w-[340px]"
                size="lg"
                endContent={
                  <ShowPassword
                    isVisible={isShowConfirmPassword}
                    toggleShowPassword={toggleShowConfirmPassword}
                  />
                }
              />
              <p className="text-sm text-red-500">{errors?.confirmPassword?.message}</p>
            </InputWithError>
            <Button
              className={`h-[38px] w-[90px] ${isLoading ? 'cursor-not-allowed' : ''}`}
              color="primary"
              onClick={handleSubmit(onSubmit)}
              isLoading={isLoading}
            >
              {t('sign_up')}
            </Button>
          </form>
        </div>
        <div className="mx-auto mb-[30px] mt-[40px] flex items-center gap-[10px]">
          <span className="font-bold text-gray-500">{t('have_account')}</span>
          <Button
            className="h-[38px] w-[90px]"
            color="primary"
            variant="bordered"
            onPress={() => handleRedirect(ROUTE.auth.signin)}
          >
            {t('sign_in')}
          </Button>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Page
