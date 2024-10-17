'use client'

import { ProfileInfoProps } from '@/types/profile'
import { Avatar, Button } from '@nextui-org/react'
import { IconBrandFacebook, IconBrandInstagram } from '@tabler/icons-react'
import Link from 'next/link'
import { useState } from 'react'
import FriendButton from '@/components/profile/FriendButton'
import { pathWithLocale } from '@/helpers/url/path-with-locale'
import { usePathname, useRouter } from 'next/navigation'
import { ROUTE } from '@/utils/constant/route'

const ProfileInfo = (props: ProfileInfoProps) => {
  const [isShowFullProfile, setIsShowFullProfile] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleEdit = (path: string) => {
    const destinationPath = pathWithLocale(pathname, path)
    router.push(destinationPath)
  }

  return (
    <div className="flex flex-col border-gray-300 pb-2 pl-6 pt-4">
      <div className="flex items-center gap-6">
        <Avatar src={props.avatar} size="lg" />
        <div className="flex items-center gap-2">
          <FriendButton status="Pending" />
          <Button size="sm" color="primary" className="font-bold">
            Follow
          </Button>
          <Button size="sm" color="primary" className="font-bold" variant="bordered">
            Message
          </Button>
        </div>
      </div>
      <span className="mt-2 text-2xl font-bold">{props.name}</span>
      <span className="text-lg">{props.shortDesc}</span>
      {isShowFullProfile && (
        <>
          <span className="text-md mt-2">{props.fullDesc}</span>
          <Link href={props.facebook} className="flex items-center gap-1 hover:underline">
            <IconBrandFacebook size="18" />
            <span>Facebook</span>
          </Link>
          <Link href={props.facebook} className="flex items-center gap-1 hover:underline">
            <IconBrandInstagram size="18" />
            <span>Instagram</span>
          </Link>
        </>
      )}
      <div className="flex items-center gap-8">
        <button
          className="text-md mt-1 w-fit p-0 font-bold text-primary"
          onClick={() => setIsShowFullProfile(!isShowFullProfile)}
        >
          {isShowFullProfile ? 'Hide' : 'More'}
        </button>
        <button
          onClick={() => handleEdit(ROUTE.profile.edit)}
          className="text-md mt-1 w-fit p-0 font-bold text-primary"
        >
          Edit profile
        </button>
      </div>
    </div>
  )
}

export default ProfileInfo
