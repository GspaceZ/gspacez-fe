'use client'

import { fullName } from '@/helpers/user/full-name'
import { NewPostProps } from '@/types/props/post'
import { Button, Input, Select, SelectItem, Textarea, User } from '@nextui-org/react'
import { useState, KeyboardEvent, ChangeEvent } from 'react'
import { BsEmojiSmile } from 'react-icons/bs'
import { CiHashtag, CiImageOn, CiLocationOn } from 'react-icons/ci'
import { GoLock } from 'react-icons/go'
import Tags from './new/Tags'
import { PostPrivacyEnum } from '@/utils/constant'
import useFileDialog from '@/hooks/useFileDialog'
import { MediaFile } from '@/types/props/common'
import Media from './new/Media'
import { generateVideoThumbnail } from '@/helpers/video/preview'
import { useTranslations } from 'next-intl'

const NewPost: React.FC<NewPostProps> = ({ user, closePost }) => {
  const t = useTranslations('post.new')

  const [tags, setTags] = useState<string[]>([])
  const [currTag, setCurrTag] = useState<string>('')
  const [isLocationOn, setIsLocationOn] = useState(false)
  const [isFeelingOn, setIsFeelingOn] = useState(false)
  const [isTagOn, setIsTagOn] = useState(false)
  const [isPrivacyOn, setIsPrivacyOn] = useState(false)
  const [location, setLocation] = useState<string>('')
  const [feeling, setFeeling] = useState<string>('')
  const [privacy, setPrivacy] = useState<string>('')
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [nextId, setNextId] = useState(1)

  const handleTags = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ') {
      event.preventDefault()
      if (currTag.trim()) {
        setTags([...tags, currTag.trim()])
        setCurrTag('')
      }
    }

    if (event.key === 'Backspace') {
      if (currTag === '' && tags.length > 0) {
        setTags(tags.slice(0, -1))
      }
    }
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
    setPrivacy(event.target.value)
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

  return (
    <>
      <div className="fixed w-full h-full bg-gray-100 opacity-50" onClick={closePost}></div>
      <div className="fixed w-full top-[200px] max-w-[700px] h-fit min-h-[200px] bg-white rounded-lg shadow-lg opacity-100">
        <div className="my-6 mx-8">
          <User
            name={fullName(user.firstName, user.lastName)}
            avatarProps={{ src: user.avtUrl }}
            className="text-xl font-bold"
          />
          <div className="flex flex-col w-full bg-white rounded-lg min-h-[200px] mt-4">
            <Textarea
              className="text-lg w-full border-b-none"
              variant="flat"
              minRows={6}
              placeholder={t('placeholder')}
            />
            <div className="w-full flex gap-2 flex-wrap mt-2">
              {mediaFiles.map((mediaFile) => {
                return (
                  <Media file={mediaFile} key={mediaFile.id} handleRemoveFile={handleRemoveFile} />
                )
              })}
            </div>
            <div className="flex gap-4 mt-4 mr-0 ml-auto">
              <Button color="default" size="sm" className="text-md">
                {t('cancel')}
              </Button>
              <Button color="primary" size="sm" className="text-md">
                {t('post')}
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 bg-gray-100 mt-4 w-fit px-2 py-1 rounded-xl">
              <Button isIconOnly className="bg-gray-100" onClick={openFileDialog}>
                <CiImageOn className="w-5 h-5" />
              </Button>
              <input {...inputProps} />
              <Button
                isIconOnly
                className="bg-gray-100"
                onClick={() => {
                  setIsLocationOn(!isLocationOn)
                }}
              >
                <CiLocationOn className="w-5 h-5" />
              </Button>
              <Button
                isIconOnly
                className="bg-gray-100"
                onClick={() => {
                  setIsFeelingOn(!isFeelingOn)
                }}
              >
                <BsEmojiSmile className="w-5 h-5" />
              </Button>
              <Button
                isIconOnly
                className="bg-gray-100"
                onClick={() => {
                  setIsTagOn(!isTagOn)
                }}
              >
                <CiHashtag className="w-5 h-5" />
              </Button>
              <Button
                isIconOnly
                className="bg-gray-100"
                onClick={() => {
                  setIsPrivacyOn(!isPrivacyOn)
                }}
              >
                <GoLock className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex mt-4 gap-4 items-center">
              {isLocationOn && (
                <Input
                  startContent={t('location')}
                  className="bg-gray-100 rounded-lg w-[200px]"
                  value={location}
                  onChange={handleChangeLocation}
                />
              )}
              {isFeelingOn && (
                <Input
                  startContent={t('feeling')}
                  className="bg-gray-100 rounded-lg w-[200px]"
                  value={feeling}
                  onChange={handleChangeFeeling}
                />
              )}
              {isPrivacyOn && (
                <Select
                  startContent={t('privacy')}
                  aria-label="Privacy"
                  className="bg-gray-100 rounded-lg w-[200px]"
                  value={privacy}
                  onChange={handleChangePrivacy}
                >
                  {Object.values(PostPrivacyEnum).map((privacyOption) => (
                    <SelectItem key={privacyOption} value={privacyOption}>
                      {privacyOption}
                    </SelectItem>
                  ))}
                </Select>
              )}
            </div>
            {isTagOn && (
              <Input
                className="bg-gray-100 mt-4 rounded-lg"
                startContent={<Tags tags={tags} />}
                value={currTag}
                onChange={handleChangeTag}
                onKeyDown={handleTags}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default NewPost
