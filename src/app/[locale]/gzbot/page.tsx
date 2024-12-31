'use client'

import MainLayout from '@/components/layouts/MainLayout'
import { Button } from '@nextui-org/react'
import { IconMicrophone } from '@tabler/icons-react'
import { useState } from 'react'

const Page = () => {
  const [chatting, setChatting] = useState<boolean>(false)

  return (
    <MainLayout title={'GZBot'}>
      <div className="flex w-full flex-col items-center">
        <div className="mx-auto mt-8 flex min-h-screen w-screen flex-col items-center">
          <Button
            startContent={!chatting && <IconMicrophone />}
            onPress={() => setChatting(!chatting)}
            color={chatting ? 'danger' : 'primary'}
          >
            {chatting ? 'Stop chatting' : 'Start Chatting with GZBot'}
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}

export default Page
