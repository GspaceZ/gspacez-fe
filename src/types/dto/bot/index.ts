export type BotCompletionResponseDto = {
  candidates: {
    content: {
      parts: {
        text: string
      }[]
      role: string
    }
    finishReason: string
    avgLogprobs: number
  }[]
  usageMetadata: {
    promptTokenCount: number
    candidatesTokenCount: number
    totalTokenCount: number
  }
  modelVersion: string
}

export type BotCompletionRequestDto = {
  prompt: string
}
