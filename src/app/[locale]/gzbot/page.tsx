'use client'

import { FActionIcon } from '@/components/common/FActionIcon'
import { FIcon } from '@/components/common/FIcon'
import { useFToastContext } from '@/components/common/FToast'
import { BotMessagesBox } from '@/components/gzbot/BotMessagesBox'
import { BotNotice } from '@/components/gzbot/BotNotice'
import MainLayout from '@/components/layouts/MainLayout'
import { useBot } from '@/hooks/useBot'
import { useVoice } from '@/hooks/useVoice'
import { BotCompletionRequestDto } from '@/types/dto/bot'
import { BotMessage } from '@/types/gzbot'
import { Input } from '@nextui-org/react'
import { useLocale } from 'next-intl'
import { useEffect, useState } from 'react'

const Page = () => {
  const synth = window.speechSynthesis
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new SpeechRecognition()
  const [text, setText] = useState<string>('')
  const [chatting, setChatting] = useState<boolean>(false)
  const [language, setLanguage] = useState<string>('')
  const { fToast } = useFToastContext()
  const locale = useLocale()
  const languageOptions = {
    en: 'en-US',
    vi: 'vi-VN'
  }
  const { textGenerate } = useBot()
  const { synthesizeSpeech } = useVoice()
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
      setText('')

      const utterance = new SpeechSynthesisUtterance(answer)
      utterance.lang = language
      recognition.stop()

      // synth.speak(utterance)
      if (answer) {
        await synthesizeSpeech(answer)
      }
      setChatting(false)
    } else {
      fToast('Error: No candidates found in the response', 'danger')
    }
  }

  const handleOnChat = () => {
    synth.cancel()
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

  recognition.onspeechend = () => {
    if (!synth.speaking) {
      setChatting(false)
    }
  }

  return (
    <MainLayout>
      <div className="mx-auto flex w-full max-w-[600px] grow flex-col items-center justify-between">
        <div className="mt-8 w-full">
          <BotNotice />
        </div>
        {chatting && (
          <div className="mt-4 w-full text-center">
            <div className="mx-4 rounded-md bg-red-500 py-2 text-sm text-white">
              You are currently chatting with GZBot using voice recognition
            </div>
          </div>
        )}
        <div className="mx-auto mt-8 flex w-full grow flex-col items-center justify-between">
          <BotMessagesBox messages={messages} />
          <div className="flex w-full items-center gap-4 px-6 pb-6">
            <FActionIcon
              icon={chatting ? <FIcon name="PlayerStopFilled" /> : <FIcon name="Microphone" />}
              onClick={() => {
                setChatting(!chatting)
                if (chatting) {
                  recognition.stop()
                  synth.cancel()
                } else {
                  handleOnChat()
                }
              }}
            />
            <Input
              size="md"
              className="rounded-md"
              placeholder="Ask GZBot anything..."
              value={text}
              onKeyUp={(e) => {
                if (e.key === 'Enter' && text !== '') {
                  const newMessage: BotMessage = { fromUser: true, message: text }
                  setMessages((prevMessages) => [...prevMessages, newMessage])
                  generateText({ dto: { prompt: text } })
                }
              }}
              onChange={(e) => setText(e.target.value)}
              disabled={chatting}
            />
            <FActionIcon
              icon={<FIcon name="Send" />}
              onClick={() => {
                generateText({ dto: { prompt: text } })
                const newMessage: BotMessage = { fromUser: true, message: text }
                setMessages((prevMessages) => [...prevMessages, newMessage])
              }}
              disabled={chatting || text === ''}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Page
