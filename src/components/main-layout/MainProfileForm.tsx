import { Input, Image, Button } from '@nextui-org/react'
import InputWithError from '../common/InputWithError'
import { IMainProfileFormValues } from '@/helpers/form-value/main-profile-value'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const MainProfileForm = () => {
  const t = useTranslations('profile')

  const createProfileSchema = z.object({
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
    resolver: zodResolver(createProfileSchema)
  })

  const onSubmit = async (data: IMainProfileFormValues) => {
    try {
      console.log('Submitted data: ', data)
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  return (
    <form className="w-screen max-w-[314px] mx-auto flex flex-col items-center mt-[50px] gap-[14px]">
      <div className="flex items-center h-[56px] mb-[20px]">
        <Image src="/landingAvatar.png" alt="avatar" className="h-[70px] rounded-[1000px]" />
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
        <Button className="w-[90px] h-[38px]" color="primary" onClick={handleSubmit(onSubmit)}>
          {t('save')}
        </Button>
        <Button className="w-[90px] h-[38px]" color="primary" onClick={handleSubmit(onSubmit)}>
          {t('cancel')}
        </Button>
      </div>
    </form>
  )
}

export default MainProfileForm
