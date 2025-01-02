import { BotCompletionRequestDto } from '@/types/dto/bot'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const useBot = () => {
  const textGenerate = async ({ dto }: { dto: BotCompletionRequestDto }) => {
    const generativeAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '')
    const model = generativeAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    return await model.generateContent([dto.prompt])
  }

  return { textGenerate }
}
