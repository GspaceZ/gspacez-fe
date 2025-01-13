import { createContext, ReactNode, useContext } from 'react'
import { FIcon } from './FIcon'
import toast, { Renderable } from 'react-hot-toast'

export interface FToastContextProps {
  fToast: (message: string, variant: string) => void
}

const ToastContext = createContext<FToastContextProps | undefined>(undefined)

export interface FToastProviderProps {
  children: ReactNode
}

export const FToastProvider = ({ children }: FToastProviderProps) => {
  const toastIcons: Record<string, ReactNode> = {
    success: <FIcon name="CircleCheckFilled" size={20} color="green" />,
    danger: <FIcon name="CircleXFilled" size={20} color="red" />,
    default: <FIcon name="InfoCircleFilled" size={20} color="blue" />
  }

  const fToast = (message: string, variant: string) => {
    toast(message, {
      icon: toastIcons[variant || 'default'] as Renderable,
      style: {
        borderRadius: '12px',
        border: '0.5px solid #ccc',
        minHeight: '30px',
        width: '1000px',
        padding: '10px 16px'
      }
    })
  }

  return <ToastContext.Provider value={{ fToast }}>{children}</ToastContext.Provider>
}

export const useFToastContext = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useFToastContext must be used within a FToastProvider')
  }
  return context
}
