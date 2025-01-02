'use client'

import MainLayout from '@/components/layouts/MainLayout'
import { fToast } from '@/helpers/toast'
import { useBot } from '@/hooks/useBot'
import { BotCompletionRequestDto } from '@/types/dto/bot'
import { Button } from '@nextui-org/react'
import { IconMicrophone } from '@tabler/icons-react'
import { useLocale } from 'next-intl'
import { useEffect, useState } from 'react'

const Page = () => {
  const [chatting, setChatting] = useState<boolean>(false)
  const [text, setText] = useState<string | undefined>()
  const [language, setLanguage] = useState<string>('')
  const locale = useLocale()
  const languageOptions = {
    en: 'en-US',
    vi: 'vi-VN'
  }
  const { textGenerate } = useBot()

  useEffect(() => {
    if (locale === 'vi') {
      setLanguage(languageOptions.vi)
    } else {
      setLanguage(languageOptions.en)
    }
  }, [languageOptions.en, languageOptions.vi, locale])

  const generateText = async ({ dto }: { dto: BotCompletionRequestDto }) => {
    const response = await textGenerate({ dto })
    if (response.response.candidates && response.response.candidates.length > 0) {
      setText(response.response.candidates[0].content.parts[0].text)
    } else {
      fToast('Error: No candidates found in the response', 'danger')
    }
  }

  const handleOnChat = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = language
    recognition.onresult = async (e) => {
      e.preventDefault()
      generateText({
        dto: { prompt: e.results[0][0].transcript }
      })
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
