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
import { usePost } from '@/hooks/usePost'
import { useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/store'
import { CreatePostRequestDto } from '@/types/response/post'
import { fToast } from '@/helpers/toast'
import { useForm } from 'react-hook-form'
import { useCloudinary } from '@/hooks/useCloudinary'

export interface PostModalProps {
  user: IProfile
  post?: IPost
  closePost: () => void
  isOpen: boolean
}

type PostForm = {
  text: string | null
  imageUrls?: string[]
  videoUrls?: string[]
  feeling: string | null
  hashTags?: string[]
  privacy: string | null
  location: string | null
}

const PostModal: React.FC<PostModalProps> = ({ user, post, closePost, isOpen }) => {
  const t = useTranslations('post.modal')

  const privacyOptions = Object.values(PostPrivacyEnum)

  const isEditPost = !!post

  const token = useSelector((state: RootState) => state.auth.token)

  const [tags, setTags] = useState<string[]>(post?.content.tag ?? [])
  const [currTag, setCurrTag] = useState<string>('')
  const [isLocationOn, setIsLocationOn] = useState<boolean>(!!post?.content.location)
  const [isFeelingOn, setIsFeelingOn] = useState<boolean>(!!post?.content.feeling)
  const [isTagOn, setIsTagOn] = useState<boolean>(false)
  const [isPrivacyOn, setIsPrivacyOn] = useState<boolean>(!!post?.privacy)
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const { createPost } = usePost()
  const { register, reset, setValue, getValues } = useForm<PostForm>({
    defaultValues: {
      text: null,
      imageUrls: [],
      videoUrls: [],
      feeling: null,
      hashTags: [],
      privacy: 'public',
      location: null
    }
  })
  const { uploadMedia } = useCloudinary()
  const [isUploadMediaPending, setIsUploadMediaPending] = useState<boolean>(false)

  useEffect(() => {
    if (!post) return

    const imageFiles =
      post.content.imageUrls?.map((url: string) => ({
        file: new File([], ''),
        url,
        preview: url
      })) ?? []

    const videoFiles =
      post.content.videoUrls?.map((url: string) => ({
        file: new File([], ''),
        url,
        preview: url
      })) ?? []

    setMediaFiles([...imageFiles, ...videoFiles])
  }, [post])

  const handleTags = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ') {
      event.preventDefault()
      if (currTag.trim()) {
        setValue('hashTags', [...(getValues('hashTags') || []), currTag.trim()])
        setCurrTag('')
      }
    }

    if (event.key === 'Backspace' && currTag === '' && tags.length > 0) {
      setTags((prevTags) => prevTags.slice(0, -1))
    }
  }

  const handleChangeTag = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrTag(event.target.value)
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
            file: file,
            url: URL.createObjectURL(file),
            preview: preview
          }
        })
      )
      setMediaFiles((prevFiles) => [...prevFiles, ...fileArray])
    }
  }

  const { openFileDialog, inputProps } = useFileDialog({
    multiple: true,
    accept: 'image/*,video/*',
    onChange: handleFileChange
  })

  const handleRemoveFile = (url: string) => {
    setMediaFiles((prevFiles) => prevFiles.filter((file) => file.url !== url))
  }

  const handleSave = () => {
    // handle edit post
  }

  const { isPending: isCreatePostPending, mutate: mutateCreatePost } = useMutation({
    mutationFn: ({ dto, token }: { dto: CreatePostRequestDto; token: string }) =>
      createPost(dto, token),
    onSuccess: () => {
      fToast('Create post successfully', 'success')
      closePost()
    },
    onError: () => {
      fToast('Create post unsucessfully', 'failed')
    }
  })

  const handleCreatePost = async () => {
    setIsUploadMediaPending(true)

    const promises = mediaFiles.map((file) => {
      return new Promise<void>((resolve) => {
        // eslint-disable-next-line no-extra-semi
        ;(async () => {
          const type = file.file.type.split('/')[0]
          const data = await uploadMedia(file.file, type)
          if (type === 'image') {
            setValue('imageUrls', [...(getValues('imageUrls') || []), data.secure_url])
          } else {
            setValue('videoUrls', [...(getValues('videoUrls') || []), data.secure_url])
          }
          resolve()
        })()
      })
    })

    Promise.all(promises)
      .then(() => {
        const dto: CreatePostRequestDto = {
          text: getValues('text'),
          imageUrls: getValues('imageUrls'),
          videoUrls: getValues('videoUrls'),
          feeling: getValues('feeling'),
          hashTags: getValues('hashTags'),
          privacy: getValues('privacy'),
          location: getValues('location')
        }
        mutateCreatePost({ dto, token })
        reset()
        setMediaFiles([])
      })
      .finally(() => {
        setIsUploadMediaPending(false)
      })
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
                    {...register('text')}
                    className="border-b-none w-full text-lg"
                    placeholder={t('placeholder')}
                    minRows={6}
                    defaultValue={getValues('text') || ''}
                  />
                  <div className="mt-2 flex w-full flex-wrap gap-2">
                    {mediaFiles.map((mediaFile) => (
                      <div key={mediaFile.url}>
                        <Media file={mediaFile} handleRemoveFile={handleRemoveFile} />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex w-fit flex-wrap gap-4 rounded-xl bg-gray-100 px-2 py-1">
                    <Button isIconOnly className="bg-gray-100" onPress={openFileDialog}>
                      <IconPhotoScan className="h-5 w-5" />
                    </Button>
                    <input {...inputProps} />
                    <Button
                      isIconOnly
                      className="bg-gray-100"
                      onPress={() => setIsLocationOn((prev) => !prev)}
                    >
                      <IconMapPin className="h-5 w-5" />
                    </Button>
                    <Button
                      isIconOnly
                      className="bg-gray-100"
                      onPress={() => setIsFeelingOn((prev) => !prev)}
                    >
                      <IconMoodHappy className="h-5 w-5" />
                    </Button>
                    <Button
                      isIconOnly
                      className="bg-gray-100"
                      onPress={() => setIsTagOn((prev) => !prev)}
                    >
                      <IconHash className="h-5 w-5" />
                    </Button>
                    <Button
                      isIconOnly
                      className="bg-gray-100"
                      onPress={() => setIsPrivacyOn((prev) => !prev)}
                    >
                      <IconLock className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    {isLocationOn && (
                      <Input
                        {...register('location')}
                        startContent={
                          <span className="text-nowrap text-sm text-gray-600">{t('location')}</span>
                        }
                        className="w-[200px] max-w-full rounded-lg bg-gray-100"
                      />
                    )}
                    {isFeelingOn && (
                      <Input
                        {...register('feeling')}
                        startContent={
                          <span className="text-nowrap text-sm text-gray-600">{t('feeling')}</span>
                        }
                        className="w-[200px] max-w-full rounded-lg bg-gray-100"
                      />
                    )}
                    {isPrivacyOn && (
                      <Select
                        {...register('privacy')}
                        startContent={
                          <span className="text-nowrap text-sm text-gray-600">{t('privacy')}</span>
                        }
                        aria-label="Privacy"
                        className="w-[200px] max-w-full rounded-lg bg-gray-100"
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
                      startContent={<Tags tags={getValues('hashTags') || []} />}
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
            <Button
              color="default"
              size="sm"
              className="text-md"
              disabled={isCreatePostPending || isUploadMediaPending}
              onPress={closePost}
            >
              {t('cancel')}
            </Button>
            <Button
              color="primary"
              size="sm"
              className="text-md"
              onPress={isEditPost ? handleSave : handleCreatePost}
              isLoading={isCreatePostPending || isUploadMediaPending}
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
