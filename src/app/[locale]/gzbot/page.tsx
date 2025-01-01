'use client'

import MainLayout from '@/components/layouts/MainLayout'
import { Button } from '@nextui-org/react'
import { IconMicrophone } from '@tabler/icons-react'
import { useLocale } from 'next-intl'
import { useEffect, useState } from 'react'

const Page = () => {
  const [chatting, setChatting] = useState<boolean>(false)
  const [text, setText] = useState<string>('')
  const [language, setLanguage] = useState<string>('')
  const locale = useLocale()
  const languageOptions = {
    en: 'en-US',
    vi: 'vi-VN'
  }

  useEffect(() => {
    if (locale === 'vi') {
      setLanguage(languageOptions.vi)
    } else {
      setLanguage(languageOptions.en)
    }
  }, [languageOptions.en, languageOptions.vi, locale])

  const handleOnChat = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = language
    console.log('a')
    recognition.onresult = async (e) => {
      console.log(e)
      setText(e.results[0][0].transcript)
      setChatting(false)
    }
    recognition.start()
  }

  return (
    <MainLayout title={'GZBot'}>
      <div className="flex w-full flex-col items-center">
        <div className="mx-auto mt-8 flex min-h-screen w-screen flex-col items-center">
          <Button
            startContent={!chatting && <IconMicrophone />}
            onPress={() => {
              setChatting(true)
              handleOnChat()
            }}
            color={chatting ? 'danger' : 'primary'}
          >
            {chatting ? 'Stop chatting' : 'Start Chatting with GZBot'}
          </Button>
          <span>Text recorded: {text}</span>
        </div>
      </div>
    </MainLayout>
  )
}

export default Page
