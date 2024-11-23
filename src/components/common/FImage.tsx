import { FImageProps } from '@/types/props/common'
import { Image } from '@nextui-org/react'

const FImage = ({ src, alt, className }: FImageProps) => {
  return (
    <div className="z-0 h-fit w-fit overflow-hidden rounded-full">
      <Image src={src} alt={alt} className={className} />
    </div>
  )
}

export default FImage
