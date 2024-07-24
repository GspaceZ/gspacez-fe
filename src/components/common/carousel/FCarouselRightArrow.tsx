import { Button } from '@nextui-org/react'
import React from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { ArrowProps } from 'react-multi-carousel'

const CustomRightArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      isIconOnly
      size='sm'
      className="absolute right-0 rounded-full"
    >
      <FaChevronRight className="m-auto w-3 h-3" />
    </Button>
  )
}

export default CustomRightArrow
