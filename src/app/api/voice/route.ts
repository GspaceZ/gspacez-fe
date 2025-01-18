import textToSpeech from '@google-cloud/text-to-speech'
import { google } from '@google-cloud/text-to-speech/build/protos/protos'

interface ISynthesizeSpeechRequest {
  input?: google.cloud.texttospeech.v1.ISynthesisInput | null
  voice?: google.cloud.texttospeech.v1.IVoiceSelectionParams | null
  audioConfig?: google.cloud.texttospeech.v1.IAudioConfig | null
  advancedVoiceOptions?: google.cloud.texttospeech.v1.IAdvancedVoiceOptions | null
}

const client = new textToSpeech.TextToSpeechClient()

export async function POST(req: Request) {
  try {
    const { text, voiceOptions } = await req.json()

    if (!text) {
      return new Response(JSON.stringify({ error: 'Missing text in request body' }), {
        status: 400
      })
    }

    const request: ISynthesizeSpeechRequest = {
      input: { text },
      voice: voiceOptions,
      audioConfig: { audioEncoding: 'MP3' }
    }

    const [response] = await client.synthesizeSpeech(request)

    if (!response.audioContent) {
      throw new Error('Audio content is missing from the response')
    }

    return new Response(
      JSON.stringify({ audioContent: Buffer.from(response.audioContent).toString('base64') }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 })
  }
}
