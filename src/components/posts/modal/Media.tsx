import { MediaFile } from '@/types/props/common'
import { Image } from '@nextui-org/react'

interface MediaProps {
  file: MediaFile
  handleRemoveFile: (url: string) => void
}

const Media: React.FC<MediaProps> = ({ file, handleRemoveFile }) => {
  return (
    <div className="flex items-start gap-2">
      {file.file.type.startsWith('image') ? (
        <Image
          src={file.url}
          alt={`Preview ${file.url}`}
          className="w-[100px] rounded-lg border border-gray-300"
        />
      ) : (
        <video
          src={file.url}
          poster={file.preview}
          controls
          className="h-[80px] w-[100px] rounded-lg border border-gray-300"
        />
      )}
      <button
        onClick={() => handleRemoveFile(file.url)}
        className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200"
      >
        <span className="text-sm">&times;</span>
      </button>
    </div>
  )
}

export default Media
