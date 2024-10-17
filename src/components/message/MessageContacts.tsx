'use client'

import { mockContacts } from '@/mock/message'
import { IContact } from '@/types/message'
import { Input } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import Contact from './Contact'

const MessageContacts = () => {
  const [contacts, setContacts] = useState<IContact[]>([])

  useEffect(() => {
    setContacts(mockContacts)
  }, [])

  return (
    <div className="border-gary-200 h-full w-[320px] border-r">
      <div className="w-full border-b border-gray-200 px-5 py-4">
        <Input placeholder="Search..." size="md" color="default" variant="flat" />
      </div>
      <div className="flex w-full flex-col">
        {contacts.map((contact) => (
          <Contact
            key={contact.id}
            id={contact.id}
            avatar={contact.avatar}
            name={contact.name}
            lastMsg={contact.lastMsg}
            ownLastMsg={contact.ownLastMsg}
          />
        ))}
      </div>
    </div>
  )
}

export default MessageContacts
