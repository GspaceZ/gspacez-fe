'use client'

import { ReactNode } from 'react'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  disabled?: boolean
}

export const FActionIcon = ({ icon, onClick, disabled }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center ${disabled && 'cursor-not-allowed'}`}
    >
      {icon}
    </button>
  )
}
