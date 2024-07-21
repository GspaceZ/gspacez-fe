import Carousel from 'react-multi-carousel'
import { FCarouselItemProps } from '@/types/props/common'
import 'react-multi-carousel/lib/styles.css'
import CustomRightArrow from './carousel/FCarouselRightArrow'
import CustomLeftArrow from './carousel/FCarouselLeftArrow'
import FImage from './FImage'
import FVideo from './FVideo'

interface FCarouselProps {
  items: FCarouselItemProps[]
}

const FCarousel: React.FC<FCarouselProps> = ({ items }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 9999, min: 1 },
      items: 1
    }
  }

  return (
    <Carousel
      customRightArrow={<CustomRightArrow />}
      customLeftArrow={<CustomLeftArrow />}
      responsive={responsive}
      className="w-full h-fit my-6"
    >
      {items.map((item) => (
        <div key={item.id} className="min-h-[100px] h-full px-10 items-center flex justify-center">
          {item.type === 'video' ? (
            <FVideo className='w-fit' src={item.mediaUrl} />
          ) : (
            <FImage src={item.mediaUrl} alt="Image"></FImage>
          )}
        </div>
      ))}
    </Carousel>
  )
}

export default FCarousel
