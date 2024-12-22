import { FVideoProps } from '@/types/props/common'

const FVideo: React.FC<FVideoProps> = ({ src, className, onError }) => {
  return (
    <video className={className} controls={true} onError={onError}>
      <source src={src} type="video/mp4" />
    </video>
  )
}

export default FVideo
