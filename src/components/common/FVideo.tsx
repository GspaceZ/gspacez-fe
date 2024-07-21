import { FVideoProps } from '@/types/props/common'

const FVideo: React.FC<FVideoProps> = ({ src, className }) => {
  return (
    <video className={className} autoPlay controls={true}>
      <source src={src} type="video/mp4" />
    </video>
  )
}

export default FVideo
