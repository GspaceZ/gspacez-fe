import { Button } from '@nextui-org/react'
import { IconCaretLeftFilled } from '@tabler/icons-react'
import React from 'react'
import { ArrowProps } from 'react-multi-carousel'

const CustomLeftArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick} isIconOnly size="sm" className="absolute left-0 rounded-full">
      <IconCaretLeftFilled size="20" />
    </Button>
  )
}

export default CustomLeftArrow
