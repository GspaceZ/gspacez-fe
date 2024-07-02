'use client'

import FImage from '@/components/common/FImage'
import MainLayout from '@/components/layouts/MainLayout'
import { Button } from '@nextui-org/react'
import { useState, ChangeEvent } from 'react'
import { useProfile } from '@/hooks/useProfile'
import { useTranslations } from 'next-intl'

const Page: React.FC = () => {
  const t = useTranslations('profile.avatar')

  const [imageUrl, setImageUrl] = useState<string>(
    'https://res.cloudinary.com/dszkt92jr/image/upload/v1719943637/vcbhui3dxeusphkgvycg.png'
  )
  const [defaultImageUrl, setDefaultImageUrl] = useState<string>(imageUrl)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { uploadImage } = useProfile()

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    console.log(event.target.files)
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
    try {
      const response = await uploadImage(selectedFile)
      if (response) {
        setImageUrl(response.secure_url)
        setDefaultImageUrl(imageUrl)
        clearImage()
      }
    } catch (error) {
      console.log('Error uploading image: ', error)
    }
  }

  const clearImage = () => {
    setSelectedFile(null)
    setImageUrl(defaultImageUrl)
  }

  return (
    <MainLayout title="Avatar">
      <div className="flex flex-col items-center mt-[100px] gap-10">
        <div>
          <FImage
            src={imageUrl}
            alt="avatar"
            className="w-[300px] h-[300px] rounded-full border border-gray-300"
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
            className="absolute z-10 top-0 left-0 w-full h-full opacity-0"
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
