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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/store'
import { CreatePostRequestDto, UpdatePostRequestDto } from '@/types/dto/post'
import { fToast } from '@/helpers/toast'
import { useForm } from 'react-hook-form'
import { useCloudinary } from '@/hooks/useCloudinary'
import { checkCloudFile } from '@/helpers/media/check-cloud-file'

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

  const token = useSelector((state: RootState) => state.auth.token)

  const [tags, setTags] = useState<string[]>(post?.content.tag ?? [])
  const [currTag, setCurrTag] = useState<string>('')
  const [isLocationOn, setIsLocationOn] = useState<boolean>(!!post?.content.location)
  const [isFeelingOn, setIsFeelingOn] = useState<boolean>(!!post?.content.feeling)
  const [isTagOn, setIsTagOn] = useState<boolean>(false)
  const [isPrivacyOn, setIsPrivacyOn] = useState<boolean>(!!post?.privacy)
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const { createPost, updatePost } = usePost()
  const queryClient = useQueryClient()

  console.log(post)

  const { register, reset, setValue, getValues } = useForm<PostForm>({
    defaultValues: {
      text: post?.content.text || null,
      imageUrls: post?.content.imageUrls || [],
      videoUrls: post?.content.videoUrls || [],
      feeling: post?.content.feeling || null,
      hashTags: post?.hashTags || [],
      privacy: post?.privacy || 'public',
      location: post?.location || null
    }
  })
  const { uploadMedia } = useCloudinary()
  const [isUploadMediaPending, setIsUploadMediaPending] = useState<boolean>(false)

  useEffect(() => {
    if (!post) return

    const imageFiles =
      post.content.imageUrls?.map((url: string) => ({
        file: new File([], '', { type: 'image/*' }),
        url,
        preview: url
      })) ?? []

    const videoFiles =
      post.content.videoUrls?.map((url: string) => ({
        file: new File([], '', { type: 'video/*' }),
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

  const { isPending: isCreatePostPending, mutate: mutateCreatePost } = useMutation({
    mutationFn: ({ dto, token }: { dto: CreatePostRequestDto; token: string }) =>
      createPost(dto, token),
    onSuccess: (data) => {
      const newPost = data.data.result
      fToast('Create post successfully', 'success')
      queryClient.setQueryData(['newsfeed'], (oldData: { data: { result: IPost[] } } | undefined) => {
        if (!oldData) return { data: { result: [newPost] } };
        return {
          ...oldData,
          data: {
            ...oldData.data,
            result: [newPost, ...oldData.data.result],
          },
        };
      });
      setTimeout(() => {
        closeModal()
      }, 1000)
    },
    onError: () => {
      fToast('Create post unsucessfully', 'danger')
    }
  })

  const { isPending: isUpdatePostPending, mutate: mutateUpdatePost } = useMutation({
    mutationFn: ({ id, dto, token }: { id: string; dto: UpdatePostRequestDto; token: string }) =>
      updatePost(id, dto, token),
    onSuccess: (data) => {
      fToast('Update post successfully', 'success')
      queryClient.setQueryData(['newsfeed'], (oldData: { data: { result: IPost[] } } | undefined) => {
        if (!oldData) return { data: { result: [] } };
        return {
          ...oldData,
          data: {
            ...oldData.data,
            result: oldData.data.result.map((post) =>
              post.id === data.data.result.id ? { ...post, ...data.data.result } : post
            ),
          },
        };
      });
      setTimeout(() => {
        closeModal()
      }, 1000)
    },
    onError: () => {
      fToast('Update post unsucessfully', 'danger')
    }
  })

  const handleSave = async () => {
    setIsUploadMediaPending(true)
    setValue('imageUrls', [])
    setValue('videoUrls', [])

    const promises = mediaFiles.map((file) => {
      return new Promise<void>((resolve) => {
        // eslint-disable-next-line no-extra-semi
        ;(async () => {
          const type = file.file.type.split('/')[0]
          const generateMediaUrl = async () => {
            if (checkCloudFile(file)) {
              return file.url
            }
            const data = await uploadMedia(file.file, type)
            return data.secure_url
          }
          const url = await generateMediaUrl()
          if (type === 'image') {
            setValue('imageUrls', [...(getValues('imageUrls') || []), url])
          } else {
            setValue('videoUrls', [...(getValues('videoUrls') || []), url])
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
        if (!post?.id) {
          mutateCreatePost({ dto, token })
        } else {
          mutateUpdatePost({ id: post.id, dto, token })
        }
        reset()
        setMediaFiles([])
      })
      .finally(() => {
        setIsUploadMediaPending(false)
      })
  }

  useEffect(() => {
    reset({
      text: post?.content.text || null,
      imageUrls: post?.content.imageUrls || [],
      videoUrls: post?.content.videoUrls || [],
      feeling: post?.content.feeling || null,
      hashTags: post?.hashTags || [],
      privacy: post?.privacy || 'public',
      location: post?.location || null
    })
    if (post?.hashTags && post.hashTags.length > 0) {
      setIsTagOn(true)
    }
    if (post?.content.feeling) {
      setIsFeelingOn(true)
    }
    if (post?.privacy) {
      setIsPrivacyOn(true)
    }
    if (post?.location) {
      setIsLocationOn(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post])

  const closeModal = () => {
    setMediaFiles([])
    closePost()
  }

  return (
    <>
      <Modal size="3xl" isOpen={isOpen} onClose={closeModal}>
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
              disabled={isCreatePostPending || isUploadMediaPending || isUpdatePostPending}
              onPress={closeModal}
            >
              {t('cancel')}
            </Button>
            <Button
              color="primary"
              size="sm"
              className="text-md"
              onPress={handleSave}
              isLoading={isCreatePostPending || isUploadMediaPending || isUpdatePostPending}
            >
              {post?.id ? t('update') : t('post')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default PostModal
