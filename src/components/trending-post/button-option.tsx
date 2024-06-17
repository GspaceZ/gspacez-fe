'use client'

import * as React from 'react'
import { iconMap } from '@/utils/icons/icon-map'

export interface ButtonOptionsProps {
  button: {
    name: string
    icon: string
    path: string
    count?: number
  }
  onClick?: () => void
  isActive?: boolean; 
}

const ButtonOption = ({ button, onClick, isActive }: ButtonOptionsProps) => {
  const IconComponent = iconMap[button.icon]

  return (
    <div className="relative flex-shrink-0">
      {(button.count !== undefined && button.count > 0) && (
        <div className="absolute -top-3 -right-2 bg-rose-500 text-white rounded-full w-5 h-5 flex items-center justify-center z-10 transform translate-y-0.5">
          <span className="text-xs">{button.count}</span>
        </div>
      )}
      <button 
        className={`rounded-lg p-2 border border-gray-100 cursor-pointer text-center relative z-0 transition-colors duration-200 ${isActive ? 'bg-black text-white' : 'bg-zinc-200 hover:bg-zinc-300'}`}
        onClick={onClick}
        aria-label={button.name}
      >
        <IconComponent className="text-xl" aria-hidden="true" />
      </button>
    </div>
  )
}

export default ButtonOption
