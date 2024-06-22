'use client'

import * as React from 'react'
import AuthLayout from '@/components/layouts/AuthLayout'
import { useTranslations } from 'next-intl'
import InputWithError from '@/components/common/InputWithError'
import { Button, Input } from '@nextui-org/react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ISignInFormValues } from '@/helpers/form-value/signin-value'
import { usePathname, useRouter } from 'next/navigation'
import { pathWithLocale } from '@/helpers/url/path-with-locale'
import { ROUTE } from '@/utils/constant/route'

const Page: React.FC = () => {
  const t = useTranslations('auth')

  const router = useRouter()
  const pathname = usePathname()

  const handleRedirect = (path: string) => {
    const destinationPath = pathWithLocale(pathname, path)
    router.push(destinationPath)
  }

  const signInSchema = z.object({
    email: z.string().email({ message: t('error_messages.email') })
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ISignInFormValues>({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = (data: ISignInFormValues) => {
    try {
      console.log('Submitted data: ', data)
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  return (
    <AuthLayout>
      <div className="mt-[50px] flex flex-col w-[360px] md:w-[420px] min-h-[420px] rounded-[20px] border border-gray-200 justify-between shadow-md">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-extrabold mt-[20px]">{t('sign_in')}</span>
          <form className="flex flex-col items-center w-fit mt-[20px] gap-[14px]">
            <InputWithError>
              <Input
                type="email"
                {...register('email')}
                placeholder={t('email')}
                className="w-[314px] md:w-[340px] h-[48px]"
                size="lg"
              />
              <p className="text-red-500 text-sm">{errors?.email?.message}</p>
            </InputWithError>
            <InputWithError>
              <Input
                type="password"
                placeholder={t('password')}
                className="w-[314px] md:w-[340px] h-[48px]"
                size="lg"
              />
            </InputWithError>
            <div className="flex justify-end w-full mr-2 -mt-2">
              <Button
                className="text-[16px] text-gray-500 font-bold bg-white border-none cursor-pointer -p-2"
                onPress={() => handleRedirect(ROUTE.auth.forgot_password)}
              >
                {t('forgot_password_button')}
              </Button>
            </div>
            <Button className="w-[90px] h-[38px] mt-4" color="primary" onClick={handleSubmit(onSubmit)}>
              {t('sign_in')}
            </Button>
          </form>
        </div>
        <div className="flex mx-auto flex items-center mb-[30px] mt-[40px] gap-[10px]">
          <span className="text-gray-500 font-bold">{t('not_have_account')}</span>
          <Button
            className="w-[90px] h-[38px]"
            color="primary"
            variant="bordered"
            onPress={() => handleRedirect(ROUTE.auth.signup)}
          >
            {t('sign_up')}
          </Button>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Page
