'use client'

import { fullName } from '@/helpers/user/full-name'
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  Select,
  SelectItem,
  Textarea,
  User
} from '@nextui-org/react'
import { useState, KeyboardEvent, ChangeEvent, useEffect } from 'react'
import Tags from './modal/Tags'
import { PostPrivacyEnum } from '@/utils/constant'
import useFileDialog from '@/hooks/useFileDialog'
import { MediaFile } from '@/types/props/common'
import Media from './modal/Media'
import { generateVideoThumbnail } from '@/helpers/video/preview'
import { useTranslations } from 'next-intl'
import { IPost } from '@/types/post'
import { IProfile } from '@/types/profile'
import { IconHash, IconLock, IconMapPin, IconMoodHappy, IconPhotoScan } from '@tabler/icons-react'

export interface PostModalProps {
  user: IProfile
  post?: IPost
  closePost: () => void
  isOpen: boolean
}

const PostModal: React.FC<PostModalProps> = ({ user, post, closePost, isOpen }) => {
  const t = useTranslations('post.modal')

  const privacyOptions = Object.values(PostPrivacyEnum)

  const isEditPost = !!post

  const [tags, setTags] = useState<string[]>(post?.content.tag ?? [])
  const [currTag, setCurrTag] = useState<string>('')
  const [isLocationOn, setIsLocationOn] = useState<boolean>(!!post?.content.location)
  const [isFeelingOn, setIsFeelingOn] = useState<boolean>(!!post?.content.feeling)
  const [isTagOn, setIsTagOn] = useState<boolean>(false)
  const [isPrivacyOn, setIsPrivacyOn] = useState<boolean>(!!post?.privacy)
  const [location, setLocation] = useState<string>(post?.content.location ?? '')
  const [feeling, setFeeling] = useState<string>(post?.content.feeling ?? '')
  const [privacy, setPrivacy] = useState<PostPrivacyEnum>(post?.privacy ?? PostPrivacyEnum.PUBLIC)
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [nextId, setNextId] = useState<number>(1)
  const [content, setContent] = useState<string>(post?.content.text ?? '')

  useEffect(() => {
    if (!post) return

    const imageFiles =
      post.content.imageUrls?.map((url: string, index: number) => ({
        id: index + 1,
        file: new File([], ''),
        url,
        preview: url
      })) ?? []

    const videoFiles =
      post.content.videoUrls?.map((url: string, index: number) => ({
        id: (post.content.imageUrls?.length ?? 0) + index + 1,
        file: new File([], ''),
        url,
        preview: url
      })) ?? []

    setMediaFiles([...imageFiles, ...videoFiles])
    setNextId((post.content.imageUrls?.length ?? 0) + (post.content.videoUrls?.length ?? 0) + 1)
  }, [post])

  const handleTags = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ') {
      event.preventDefault()
      if (currTag.trim()) {
        setTags((prevTags) => [...prevTags, currTag.trim()])
        setCurrTag('')
      }
    }

    if (event.key === 'Backspace' && currTag === '' && tags.length > 0) {
      setTags((prevTags) => prevTags.slice(0, -1))
    }
  }

  const handleChangeContent = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value)
  }

  const handleChangeTag = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrTag(event.target.value)
  }

  const handleChangeLocation = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value)
  }

  const handleChangeFeeling = (event: ChangeEvent<HTMLInputElement>) => {
    setFeeling(event.target.value)
  }

  const handleChangePrivacy = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as PostPrivacyEnum
    if (privacyOptions.includes(value)) {
      setPrivacy(value)
    }
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const fileArray = await Promise.all(
        Array.from(files).map(async (file) => {
          const preview = file.type.startsWith('video')
            ? await generateVideoThumbnail(file)
            : URL.createObjectURL(file)
          return {
            id: nextId,
            file: file,
            url: URL.createObjectURL(file),
            preview: preview
          }
        })
      )
      setNextId((prevId) => prevId + fileArray.length)
      setMediaFiles((prevFiles) => [...prevFiles, ...fileArray])
    }
  }

  const { openFileDialog, inputProps } = useFileDialog({
    multiple: true,
    accept: 'image/*,video/*',
    onChange: handleFileChange
  })

  const handleRemoveFile = (id: number) => {
    setMediaFiles((prevFiles) => prevFiles.filter((file) => file.id !== id))
  }

  const handleSave = () => {
    // handle edit post
  }

  const handlePost = () => {
    // handle create new post
  }

  return (
    <>
      <Modal size="3xl" isOpen={isOpen} onClose={closePost}>
        <ModalContent>
          <div>
            <div>
              <div className="mx-8 my-6">
                <User
                  name={fullName(user.firstName, user.lastName)}
                  avatarProps={{ src: user.avtUrl }}
                  className="text-xl font-bold"
                />
                <div className="mt-4 flex min-h-[200px] w-full flex-col rounded-lg bg-white">
                  <Textarea
                    className="border-b-none w-full text-lg"
                    placeholder={t('placeholder')}
                    value={content}
                    onChange={handleChangeContent}
                    minRows={6}
                  />
                  <div className="mt-2 flex w-full flex-wrap gap-2">
                    {mediaFiles.map((mediaFile) => (
                      <Media
                        file={mediaFile}
                        key={mediaFile.id}
                        handleRemoveFile={handleRemoveFile}
                      />
                    ))}
                  </div>
                  <div className="mt-4 flex w-fit flex-wrap gap-4 rounded-xl bg-gray-100 px-2 py-1">
                    <Button isIconOnly className="bg-gray-100" onClick={openFileDialog}>
                      <IconPhotoScan className="h-5 w-5" />
                    </Button>
                    <input {...inputProps} />
                    <Button
                      isIconOnly
                      className="bg-gray-100"
                      onClick={() => setIsLocationOn((prev) => !prev)}
                    >
                      <IconMapPin className="h-5 w-5" />
                    </Button>
                    <Button
                      isIconOnly
                      className="bg-gray-100"
                      onClick={() => setIsFeelingOn((prev) => !prev)}
                    >
                      <IconMoodHappy className="h-5 w-5" />
                    </Button>
                    <Button
                      isIconOnly
                      className="bg-gray-100"
                      onClick={() => setIsTagOn((prev) => !prev)}
                    >
                      <IconHash className="h-5 w-5" />
                    </Button>
                    <Button
                      isIconOnly
                      className="bg-gray-100"
                      onClick={() => setIsPrivacyOn((prev) => !prev)}
                    >
                      <IconLock className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    {isLocationOn && (
                      <Input
                        startContent={
                          <span className="text-nowrap text-sm text-gray-600">{t('location')}</span>
                        }
                        className="w-[200px] max-w-full rounded-lg bg-gray-100"
                        value={location}
                        onChange={handleChangeLocation}
                      />
                    )}
                    {isFeelingOn && (
                      <Input
                        startContent={
                          <span className="text-nowrap text-sm text-gray-600">{t('feeling')}</span>
                        }
                        className="w-[200px] max-w-full rounded-lg bg-gray-100"
                        value={feeling}
                        onChange={handleChangeFeeling}
                      />
                    )}
                    {isPrivacyOn && (
                      <Select
                        startContent={
                          <span className="text-nowrap text-sm text-gray-600">{t('privacy')}</span>
                        }
                        aria-label="Privacy"
                        className="w-[200px] max-w-full rounded-lg bg-gray-100"
                        value={privacy}
                        onChange={handleChangePrivacy}
                      >
                        {privacyOptions.map((privacyOption) => (
                          <SelectItem key={privacyOption} value={privacyOption}>
                            {privacyOption}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                  </div>
                  {isTagOn && (
                    <Input
                      className="mt-4 rounded-lg bg-gray-100"
                      startContent={<Tags tags={tags} />}
                      value={currTag}
                      onChange={handleChangeTag}
                      onKeyDown={handleTags}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <ModalFooter>
            <Button color="default" size="sm" className="text-md" onClick={closePost}>
              {t('cancel')}
            </Button>
            <Button
              color="primary"
              size="sm"
              className="text-md"
              onClick={isEditPost ? handleSave : handlePost}
            >
              {isEditPost ? t('save') : t('post')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default PostModal
