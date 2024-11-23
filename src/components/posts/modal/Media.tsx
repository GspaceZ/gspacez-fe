import { MediaFile } from '@/types/props/common'

interface MediaProps {
  file: MediaFile
  handleRemoveFile: (id: number) => void
}

const Media: React.FC<MediaProps> = ({ file, handleRemoveFile }) => {
  return (
    <div className="flex gap-2 items-start">
      {file.file.type.startsWith('image') ? (
        <img
          src={file.url}
          alt={`Preview ${file.id}`}
          className="rounded-lg w-[100px] border border-gray-300"
        />
      ) : (
        <video
          src={file.url}
          poster={file.preview}
          controls
          className="rounded-lg w-[100px] h-[80px] border border-gray-300"
        />
      )}
      <button
        onClick={() => handleRemoveFile(file.id)}
        className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center"
      >
        <span className="text-sm">&times;</span>
      </button>
    </div>
  )
}

export default Media
