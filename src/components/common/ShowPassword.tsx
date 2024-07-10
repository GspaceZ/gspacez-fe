import { ShowPasswordProps } from '@/types/props/common'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const ShowPassword: React.FC<ShowPasswordProps> = ({ isVisible, toggleShowPassword }) => {
  return (
    <span className="cursor-pointer my-auto text-xl" onClick={toggleShowPassword}>
      {isVisible ? <FaEye /> : <FaEyeSlash />}
    </span>
  )
}

export default ShowPassword
