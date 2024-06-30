import MainLayout from '@/components/layouts/MainLayout'
import { Button, Image } from '@nextui-org/react'
import { useTranslations } from 'next-intl'

const Page = () => {
  const t = useTranslations('title')

  return (
    <MainLayout title={t('avatar')}>
      <div className="mx-auto w-[600px] min-h-screen border border-gray-200 flex flex-col items-center gap-10">
        <div className="w-[300px] h-[300px] border-1 border-gray-200 rounded-full mt-10 overflow-hidden">
          <Image src="/landingAvatar.png" alt="avatar" />
        </div>
        <Button variant="flat" color="primary" className="text-lg" size="lg">
          Choose image from your device
        </Button>
        <div className="flex gap-4">
          <Button color="primary" variant="solid" className="text-lg" size="lg">
            Save
          </Button>
          <Button color="primary" variant="bordered" className="text-lg" size="lg">
            Cancel
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}

export default Page
