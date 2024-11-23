'use client'

import * as React from 'react'
import { ButtonOptionsProps } from '@/types/props/layouts'

const ButtonOption = ({ button, onClick, isActive }: ButtonOptionsProps) => {
  return (
    <div className="relative m-2 flex-shrink-0">
      {button.count !== undefined && button.count > 0 && (
        <div className="absolute -right-4 -top-2 z-10 flex h-5 w-5 translate-y-0.5 transform items-center justify-center rounded-full bg-rose-500 text-white">
          <span className="text-xs">{button.count}</span>
        </div>
      )}
      <button
        className={`relative z-0 -mx-3 cursor-pointer rounded-2xl border border-gray-100 p-3 text-center transition-colors duration-200 ${isActive ? 'bg-black text-white' : 'bg-zinc-200 hover:bg-zinc-300'}`}
        onClick={onClick}
        aria-label={button.name}
      >
        {button.icon}
      </button>
    </div>
  )
}

export default ButtonOption
