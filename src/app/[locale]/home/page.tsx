import MainLayout from '@/components/layouts/MainLayout'
import { useAppSelector } from '@/utils/store'
import { Avatar, Input } from '@nextui-org/react'
import { useTranslations } from 'next-intl'

const Page = () => {
  const t = useTranslations('title')

  const initialUrl = useAppSelector((state) => state.user.avtUrl)

  const imageUrl = initialUrl ||
      'https://res.cloudinary.com/dszkt92jr/image/upload/v1719943637/vcbhui3dxeusphkgvycg.png'

  return (
    <MainLayout title={t('home')}>
      <div className='border border-x-1 border-gray-50 w-[1000px]'>
        <div>
          <Avatar src={imageUrl} />
          <Input />
        </div>
      </div>
    </MainLayout>
  )
} 

export default Page
