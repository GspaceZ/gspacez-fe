'use client'

import { pathWithLocale } from '@/helpers/url/path-with-locale'
import { fullName } from '@/helpers/user/full-name'
import { IContact } from '@/types/message'
import { Avatar } from '@nextui-org/react'
import { usePathname, useRouter } from 'next/navigation'

const Contact = (props: IContact) => {
  const pathname = usePathname()
  const router = useRouter()

  const handleContact = () => {
    const destinationPath = pathWithLocale(pathname, `message/${props.id}`)
    router.push(destinationPath)
  }

  return (
    <div
      onClick={() => handleContact()}
      className="flex cursor-pointer items-center gap-3 border-b border-gray-200 py-4 pl-4 hover:bg-gray-50"
    >
      <Avatar src={props.avatar} size="md" />
      <div className="flex flex-col justify-center gap-0.5">
        <span className="leading-6">{fullName(props.firstName, props.lastName)}</span>
        <span className="text-sm leading-4 text-gray-500">
          {props.ownLastMsg && 'You: '}
          {props.lastMsg}
        </span>
      </div>
    </div>
  )
}

export default Contact
