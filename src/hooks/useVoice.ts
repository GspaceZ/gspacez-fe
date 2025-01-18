export const useVoice = () => {
  const synthesizeSpeech = async (text: string) => {
    const response = await fetch('/api/voice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })

    return response.json()
  }

  return { synthesizeSpeech }
}
