import MainLayout from '@/components/layouts/MainLayout'
import { useTranslations } from 'next-intl'

const Page = () => {
  const t = useTranslations('title')

  return (
    <MainLayout title={t('home')}>
      <div></div>
    </MainLayout>
  )
} 

export default Page
