export const generateVideoThumbnail = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    const canvas = document.createElement('canvas')
    const url = URL.createObjectURL(file)

    video.src = url
    video.load()
    video.addEventListener('loadeddata', () => {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        const dataURL = canvas.toDataURL('image/png')
        resolve(dataURL)
      } else {
        reject(new Error('Failed to get canvas context'))
      }
    })
    video.addEventListener('error', (err) => {
      reject(err)
    })
  })
}
