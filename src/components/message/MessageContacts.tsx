'use client'

import { mockContacts } from '@/mock/message'
import { IContact } from '@/types/message'
import { Input } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import Contact from './Contact'
import AvatarContact from './AvatarContact'
import { useTranslations } from 'next-intl'

const MessageContacts = () => {
  const t = useTranslations('message.page.contacts')
  const [contacts, setContacts] = useState<IContact[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [latestContacts, setLatestContacts] = useState<IContact[]>([])

  useEffect(() => {
    setContacts(mockContacts)
    setLatestContacts(mockContacts)
  }, [])

  return (
    <div className="lg:border-l-none flex h-full w-full flex-col rounded-t-lg border-l border-r border-t border-gray-200 bg-white lg:w-[320px] lg:rounded-tl-none lg:rounded-tr-lg lg:border">
      <div className="w-full border-b border-gray-200 px-5 py-4">
        <Input placeholder={t('search')} size="md" color="default" variant="flat" />
      </div>
      <div className="flex w-full items-center gap-8 overflow-x-auto border-b border-gray-200 px-5 py-4">
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
