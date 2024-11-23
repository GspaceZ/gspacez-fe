import { ShowPasswordProps } from '@/types/props/common'
import { IconEye, IconEyeOff } from '@tabler/icons-react'

const ShowPassword: React.FC<ShowPasswordProps> = ({ isVisible, toggleShowPassword }) => {
  return (
    <span className="my-auto cursor-pointer text-xl" onClick={toggleShowPassword}>
      {isVisible ? <IconEye /> : <IconEyeOff />}
    </span>
  )
}

export default ShowPassword
