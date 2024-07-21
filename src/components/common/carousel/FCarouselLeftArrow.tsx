import { Button } from '@nextui-org/react'
import React from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { ArrowProps } from 'react-multi-carousel'

const CustomLeftArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      isIconOnly
      size='sm'
      className="absolute left-0 rounded-full"
    >
      <FaChevronLeft className="m-auto w-3 h-3" />
    </Button>
  )
}

export default CustomLeftArrow
