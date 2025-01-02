'use client'

import { BotMessagesBox } from '@/components/gzbot/BotMessagesBox'
import MainLayout from '@/components/layouts/MainLayout'
import { fToast } from '@/helpers/toast'
import { useBot } from '@/hooks/useBot'
import { BotCompletionRequestDto } from '@/types/dto/bot'
import { BotMessage } from '@/types/gzbot'
import { Button } from '@nextui-org/react'
import { IconMicrophone } from '@tabler/icons-react'
import { useLocale } from 'next-intl'
import { useEffect, useState } from 'react'

const Page = () => {
  const synth = window.speechSynthesis
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new SpeechRecognition()
  const [chatting, setChatting] = useState<boolean>(false)
  const [language, setLanguage] = useState<string>('')
  const locale = useLocale()
  const languageOptions = {
    en: 'en-US',
    vi: 'vi-VN'
  }
  const { textGenerate } = useBot()
  const [messages, setMessages] = useState<BotMessage[]>([])

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
      const answer = response.response.candidates[0].content.parts[0].text
      const newMessage: BotMessage = { fromUser: false, message: answer }
      setMessages((prevMessages) => [...prevMessages, newMessage])
      const utterance = new SpeechSynthesisUtterance(answer)
      utterance.lang = language

      utterance.onstart = () => {
        recognition.stop()
      }

      utterance.onend = () => {
        recognition.start()
      }

      synth.speak(utterance)

      handleOnChat()
    } else {
      fToast('Error: No candidates found in the response', 'danger')
      setChatting(false)
    }
  }

  const handleOnChat = () => {
    recognition.lang = language
    recognition.onresult = async (e) => {
      e.preventDefault()
      const transcript = e.results[0][0].transcript
      const newMessage: BotMessage = { fromUser: true, message: transcript }
      setMessages((prevMessages) => [...prevMessages, newMessage])
      generateText({
        dto: { prompt: transcript }
      })
    }
    recognition.start()
  }

  // recognition.onspeechend = () => {
  //   if (!synth.speaking) {
  //     setChatting(false)
  //   }
  // }

  return (
    <MainLayout title={'GZBot'}>
      <div className="flex w-full flex-col items-center">
        <div className="mx-auto mt-8 flex min-h-screen w-screen flex-col items-center">
          <Button
            startContent={!chatting && <IconMicrophone />}
            onPress={() => {
              setChatting(!chatting)
              if (chatting) {
                recognition.stop()
                synth.cancel()
              } else {
                handleOnChat()
              }
            }}
            color={chatting ? 'danger' : 'primary'}
          >
            {chatting ? 'Stop chatting' : 'Start Chatting with GZBot'}
          </Button>
          <BotMessagesBox messages={messages} />
        </div>
      </div>
    </MainLayout>
  )
}

export default Page
