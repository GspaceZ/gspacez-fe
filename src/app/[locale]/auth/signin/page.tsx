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
import { useAuth } from '@/hooks/useAuth'
import { RootState, useAppDispatch } from '@/utils/store'
import { setAuth } from '@/utils/store/auth'
import { RESPONSE_CODES } from '@/utils/constant/codes'
import { useState } from 'react'
import ShowPassword from '@/components/common/ShowPassword'
import { useProfile } from '@/hooks/useProfile'
import { setUser } from '@/utils/store/user'
import { IProfile } from '@/types/profile'
import { FLink } from '@/components/common/FLink'
import { LoginByGoogle } from '@/components/auth/LoginByGoogle'
import { useSelector } from 'react-redux'
import { clearCallbackUrl } from '@/utils/store/guard'
import { useFToastContext } from '@/components/common/FToast'

type SignInResponse = {
  code: number
  result: {
    token: string
    refreshToken: string
  }
}

type ProfileRes = {
  code: number
  result: IProfile
}

const Page: React.FC = () => {
  const t = useTranslations('auth')

  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useAppDispatch()

  const { signIn } = useAuth()
  const { fToast } = useFToastContext()
  const { getProfile } = useProfile()
  const [isLoading, setIsLoading] = useState(false)
  const callbackUrl = useSelector((state: RootState) => state.guard.callbackUrl)
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword)
  }

  const handleRedirect = (path: string) => {
    const destinationPath = pathWithLocale(pathname, path)
    router.push(destinationPath)
  }

  const signInSchema = z.object({
    email: z.string().email({ message: t('error_messages.email') }),
    password: z.string()
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ISignInFormValues>({
    resolver: zodResolver(signInSchema)
  })

  const handleSignInResponse = (signInRes: SignInResponse | undefined) => {
    if (signInRes === undefined) {
      fToast(t('toast.unknown'), 'danger')
      return
    }
    const { code, result } = signInRes
    switch (code) {
      case RESPONSE_CODES.SUCCESS:
        return result
      case RESPONSE_CODES.USER_NOT_EXISTED:
        fToast(t('toast.signin.not_exist'), 'danger')
        break
      case RESPONSE_CODES.WRONG_PASSWORD:
        fToast(t('toast.signin.wrong_password'), 'danger')
        break
      default:
        fToast(t('toast.unknown'), 'danger')
    }
    return null
  }

  const handleGetProfileResponse = (getProfileRes: ProfileRes | undefined) => {
    if (getProfileRes === undefined) {
      fToast(t('toast.unknown'), 'danger')
      return
    }
    const { code, result } = getProfileRes
    switch (code) {
      case RESPONSE_CODES.SUCCESS:
        return result
      default:
        fToast(t('toast.unknown'), 'danger')
    }
    return null
  }

  const onSubmit = async (data: ISignInFormValues) => {
    setIsLoading(true)
    try {
      const signInRes = await signIn(data.email, data.password)
      const signInResult = handleSignInResponse(signInRes)

      if (!signInResult) {
        return
      }

      dispatch(setAuth(signInResult))

      const getProfileRes = await getProfile(signInResult.token)
      const userProfile = handleGetProfileResponse(getProfileRes)

      if (userProfile) {
        dispatch(setUser(userProfile))
      }

      fToast(t('toast.signin.success'), 'success')
      if (callbackUrl) {
        router.push(callbackUrl)
        dispatch(clearCallbackUrl())
      } else {
        handleRedirect(ROUTE.pages.home)
      }
    } catch (error) {
      fToast(t('toast.unknown'), 'danger')
      console.error('Error: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePressKey = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(onSubmit)()
    }
  }

  return (
    <AuthLayout>
      <div className="mt-[50px] flex min-h-[460px] w-[360px] flex-col justify-between rounded-[20px] border border-gray-200 shadow-md md:w-[420px]">
        <div className="flex flex-col items-center">
          <span className="mt-[20px] text-3xl font-extrabold">{t('sign_in')}</span>
          <form className="mt-[20px] flex w-fit flex-col items-center gap-[14px]">
            <InputWithError>
              <Input
                type="email"
                {...register('email')}
                label={t('email')}
                className="h-[56px] w-[314px] md:w-[340px]"
                size="lg"
                onKeyDown={handlePressKey}
              />
              <p className="text-sm text-red-500">{errors?.email?.message}</p>
            </InputWithError>
            <InputWithError>
              <Input
                type={isShowPassword ? 'text' : 'password'}
                {...register('password')}
                label={t('password')}
                className="h-[56px] w-[314px] md:w-[340px]"
                size="lg"
                endContent={
                  <ShowPassword
                    isVisible={isShowPassword}
                    toggleShowPassword={toggleShowPassword}
                  />
                }
                onKeyDown={handlePressKey}
              />
            </InputWithError>
            <div className="-mt-2 mr-2 flex w-full justify-end">
              <FLink path={ROUTE.auth.forgot_password}>
                <Button className="-p-2 cursor-pointer border-none bg-white text-[16px] font-bold text-gray-500">
                  {t('forgot_password_button')}
                </Button>
              </FLink>
            </div>
            <Button
              className={`mt-4 h-[38px] w-[90px] ${isLoading ? 'cursor-not-allowed' : ''}`}
              color="primary"
              // ignore deprecated onClick
              onClick={handleSubmit(onSubmit)}
              isLoading={isLoading}
            >
              {t('sign_in')}
            </Button>
          </form>
        </div>
        <div className="mx-auto mb-[30px] mt-[40px] flex items-center gap-[10px]">
          <span className="font-bold text-gray-500">{t('not_have_account')}</span>
          <FLink path={ROUTE.auth.signup}>
            <Button className="h-[38px] w-[90px]" color="primary" variant="bordered">
              {t('sign_up')}
            </Button>
          </FLink>
        </div>
        <div className="mx-auto pb-9">
          <LoginByGoogle />
        </div>
      </div>
    </AuthLayout>
  )
}

export default Page
