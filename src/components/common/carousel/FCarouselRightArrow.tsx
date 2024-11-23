import { Button } from '@nextui-org/react'
import { IconCaretRightFilled } from '@tabler/icons-react'
import React from 'react'
import { ArrowProps } from 'react-multi-carousel'

const CustomRightArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick} isIconOnly size="sm" className="absolute right-0 rounded-full">
      <IconCaretRightFilled size="20" />
    </Button>
  )
}

export default CustomRightArrow
