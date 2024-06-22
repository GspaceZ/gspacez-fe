import MainLayout from '@/components/layouts/MainLayout'
import { useTranslations } from 'next-intl'

const Page = () => {
  const t = useTranslations('title')

  return (
    <MainLayout title="Profile">
      <div className="mx-auto w-[600px] min-h-screen border border-gray-200"></div>
    </MainLayout>
  )
}

export default Page
