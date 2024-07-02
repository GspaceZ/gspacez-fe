import { FImageProps } from '@/types/props/common'
import { Image } from '@nextui-org/react'

const FImage = ({ src, alt, className }: FImageProps) => {
  return (
    <div className="w-fit h-fit rounded-full z-0">
      <Image src={src} alt={alt} className={className} />
    </div>
  )
}

export default FImage
