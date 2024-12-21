import { MediaFile } from '@/types/props/common'
import { Button, Image } from '@nextui-org/react'
import { IconX } from '@tabler/icons-react'

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
      <Button isIconOnly size="sm" onPress={() => handleRemoveFile(file.url)}>
        <IconX size={12} />
      </Button>
    </div>
  )
}

export default Media
