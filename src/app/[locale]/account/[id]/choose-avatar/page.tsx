'use client'

import FImage from '@/components/common/FImage'
import MainLayout from '@/components/layouts/MainLayout'
import { Button } from '@nextui-org/react'
import { useState, ChangeEvent, useEffect } from 'react'
import { useProfile } from '@/hooks/useProfile'
import { useTranslations } from 'next-intl'
import { useAppSelector, RootState } from '@/utils/store'
import { pathWithLocale } from '@/helpers/url/path-with-locale'
import { usePathname, useRouter } from 'next/navigation'
import { ROUTE } from '@/utils/constant/route'
import { RESPONSE_CODES } from '@/utils/constant/codes'
import { fToast } from '@/helpers/toast'
import { useCloudinary } from '@/hooks/useCloudinary'

const Page: React.FC = () => {
  const t = useTranslations('profile.avatar')
  const tTitle = useTranslations('title')

  const initialUrl = useAppSelector((state) => state.user.avtUrl)

  const [imageUrl, setImageUrl] = useState<string>(
    initialUrl ||
      'https://res.cloudinary.com/dszkt92jr/image/upload/v1719943637/vcbhui3dxeusphkgvycg.png'
  )
  const [defaultImageUrl, setDefaultImageUrl] = useState<string>(imageUrl)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { uploadAvatar } = useProfile()
  const { uploadMedia } = useCloudinary()
  const router = useRouter()
  const pathname = usePathname()

  const token = useAppSelector((state: RootState) => state.auth.token)

  useEffect(() => {
    const handleRedirect = (path: string) => {
      const destinationPath = pathWithLocale(pathname, path)
      router.push(destinationPath)
    }

    if (!token) {
      handleRedirect(ROUTE.auth.signin)
    }
  }, [pathname, router, token])

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setSelectedFile(file)
      reader.readAsDataURL(file)
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          setImageUrl(e.target.result as string)
        }
      }
    }
  }

  const handleSave = async () => {
    if (!selectedFile) {
      return
    }

    try {
      const response = await uploadMedia(selectedFile, 'image')

      if (response) {
        const secureUrl = response.secure_url
        setImageUrl(secureUrl)
        setDefaultImageUrl(secureUrl)

        const uploadAvatarRes = await uploadAvatar(secureUrl, token)

        if (uploadAvatarRes) {
          const code = uploadAvatarRes.code
          switch (code) {
            case RESPONSE_CODES.SUCCESS:
              fToast(t('toast.success'), 'success')
              break

            case RESPONSE_CODES.UNAUTHENTICATED_2:
              fToast(t('toast.unauthenticated'), 'danger')
              break

            default:
              fToast(t('toast.unknown'), 'danger')
          }
        } else {
          fToast(t('toast.unknown'), 'danger')
        }
      } else {
        fToast(t('toast.unknown'), 'danger')
      }
    } catch {
      fToast(t('toast.unknown'), 'danger')
    }
  }

  const clearImage = () => {
    setSelectedFile(null)
    setImageUrl(defaultImageUrl)
  }

  return (
    <MainLayout title={tTitle('avatar')}>
      <div className="mt-[100px] flex flex-col items-center gap-10">
        <div>
          <FImage
            src={imageUrl}
            alt="avatar"
            className="h-[300px] w-[300px] rounded-full border border-gray-300"
          />
        </div>
        <div className="relative">
          <Button size="lg" color="primary" variant="flat">
            {t('choose_avatar')}
          </Button>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute left-0 top-0 z-10 h-full w-full opacity-0"
          />
        </div>
        <div className={`flex gap-4 ${selectedFile ? '' : 'hidden'}`}>
          <Button size="lg" color="primary" onClick={handleSave}>
            {t('save')}
          </Button>
          <Button size="lg" color="primary" variant="bordered" onClick={clearImage}>
            {t('cancel')}
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}

export default Page
