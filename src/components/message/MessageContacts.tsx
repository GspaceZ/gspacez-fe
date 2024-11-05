'use client'

import { mockContacts } from '@/mock/message'
import { IContact } from '@/types/message'
import { Input } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import Contact from './Contact'
import AvatarContact from './AvatarContact'

const MessageContacts = () => {
  const [contacts, setContacts] = useState<IContact[]>([])
  const [latestContacts, setLatestContacts] = useState<IContact[]>([])

  useEffect(() => {
    setContacts(mockContacts)
    setLatestContacts(mockContacts)
  }, [])

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    const container = event.currentTarget
    container.scrollLeft += event.deltaY
  }

  return (
    <div className="flex h-full w-full flex-col border-r border-gray-200 lg:w-[320px]">
      <div className="w-full border-b border-gray-200 px-5 py-4">
        <Input placeholder="Search..." size="md" color="default" variant="flat" />
      </div>
      <div
        className="md:h-[180px flex h-[200px] w-full items-center gap-4 overflow-x-auto border-b border-gray-200 px-5 lg:h-[160px]"
        onWheel={handleScroll}
      >
        {contacts.map((contact) => (
          <AvatarContact
            key={contact.id}
            avatar={contact.avatar}
            firstName={contact.firstName}
            lastName={contact.lastName}
          />
        ))}
      </div>
      <div className="w-full grow overflow-y-auto">
        <div className="flex max-h-full w-full flex-col">
          {contacts.map((contact) => (
            <Contact
              key={contact.id}
              id={contact.id}
              avatar={contact.avatar}
              firstName={contact.firstName}
              lastName={contact.lastName}
              lastMsg={contact.lastMsg}
              ownLastMsg={contact.ownLastMsg}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MessageContacts
