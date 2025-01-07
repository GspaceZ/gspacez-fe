import Carousel from 'react-multi-carousel'
import { FCarouselItemProps } from '@/types/props/common'
import 'react-multi-carousel/lib/styles.css'
import CustomRightArrow from './carousel/FCarouselRightArrow'
import CustomLeftArrow from './carousel/FCarouselLeftArrow'
import FVideo from './FVideo'
import { Image } from '@nextui-org/react'
import { useEffect, useState } from 'react'

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

  const [mediaFiles, setMediaFiles] = useState<FCarouselItemProps[]>([])

  const hideFile = (id: string) => {
    setMediaFiles(
      mediaFiles.map((file) => {
        if (file.id === id) {
          return file
        }

        return {
          ...file,
          error: true
        }
      })
    )
  }

  useEffect(() => {
    setMediaFiles(items)
  }, [items])

  return (
    <Carousel
      customRightArrow={<CustomRightArrow />}
      customLeftArrow={<CustomLeftArrow />}
      responsive={responsive}
      className="my-6 h-fit w-full"
    >
      {mediaFiles.map((item) => {
        return (
          <div
            key={item.id}
            className="flex h-full min-h-[100px] items-center justify-center px-10"
          >
            {item.error ? (
              <div className="text-center text-gray-300 hover:text-gray-500">
                This media is not available now
              </div>
            ) : item.type === 'video' ? (
              <FVideo
                className="w-fit"
                src={item.url}
                onError={() => {
                  hideFile(item.id)
                }}
              />
            ) : (
              <Image
                src={item.url}
                alt="Image"
                onError={() => {
                  hideFile(item.id)
                }}
              />
            )}
          </div>
        )
      })}
    </Carousel>
  )
}

export default FCarousel
