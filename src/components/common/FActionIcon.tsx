'use client'

import React, { ReactNode, forwardRef } from 'react'

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  disabled?: boolean
}

export const FActionIcon = forwardRef<HTMLButtonElement, Props>(
  ({ icon, onClick, disabled, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        className={`flex items-center justify-center ${disabled ? 'cursor-not-allowed' : ''} ${className || ''}`}
        {...props}
      >
        {icon}
      </button>
    )
  }
)

FActionIcon.displayName = 'FActionIcon'
