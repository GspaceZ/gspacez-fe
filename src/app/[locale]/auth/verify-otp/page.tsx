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
import { IVerifyOTPFormValues } from '@/helpers/form-value/verify-otp-value'
import { usePathname, useRouter } from 'next/navigation'
import { pathWithLocale } from '@/helpers/url/path-with-locale'
import { ROUTE } from '@/utils/constant/route'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import { RESPONSE_CODES } from '@/utils/constant/codes'
import { useFToastContext } from '@/components/common/FToast'

const Page: React.FC = () => {
  const t = useTranslations('auth')

  const router = useRouter()
  const pathname = usePathname()

  const dispatch = useAppDispatch()
  const { fToast } = useFToastContext()
  const resetEmail = useAppSelector((state) => state.email.resetEmail)

  const { verifyOTP } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleRedirect = (path: string) => {
    const destinationPath = pathWithLocale(pathname, path)
    router.push(destinationPath)
  }

  const verifyOTPSchema = z.object({
    otp: z
      .string()
      .length(6, { message: t('error_messages.verify_otp.length') })
      .regex(/^\d+$/, { message: t('error_messages.verify_otp.number') })
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IVerifyOTPFormValues>({
    resolver: zodResolver(verifyOTPSchema)
  })

  const onSubmit = async (data: IVerifyOTPFormValues) => {
    setIsLoading(true)
    try {
      const verifyOTPRes = await verifyOTP(resetEmail, data.otp)
      if (verifyOTPRes) {
        const code = verifyOTPRes.code
        switch (code) {
          case RESPONSE_CODES.SUCCESS: {
            fToast(t('toast.verify_otp.correct'), 'success')
            handleRedirect(ROUTE.auth.reset_password)
            break
          }

          case RESPONSE_CODES.OTP_INCORRECT:
            fToast(t('toast.verify_otp.incorrect'), 'danger')
            break

          case RESPONSE_CODES.OTP_EXPIRED:
            fToast(t('toast.verify_otp.expired'), 'danger')
            dispatch(clearResetEmail())
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
      <div className="mt-[50px] flex min-h-[100vh] w-[360px] flex-col justify-between rounded-[20px] border border-gray-200 shadow-md md:min-h-[232px] md:w-[420px]">
        <div className="flex flex-col items-center">
          <span className="mt-[28px] text-3xl font-extrabold">
            {t('verify_otp.recover_account')}
          </span>
          <form className="mt-[24px] flex w-fit flex-col items-center gap-[14px]">
            <InputWithError>
              <Input
                type="number"
                {...register('otp')}
                label={t('verify_otp.otp')}
                className="h-[56px] w-[314px] md:w-[340px]"
                size="lg"
              />
              <p className="text-sm text-red-500">{errors?.otp?.message}</p>
            </InputWithError>
            <Button
              className="my-4 h-[38px]"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              isLoading={isLoading}
            >
              {t('verify_otp.confirm_button')}
            </Button>
          </form>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Page
