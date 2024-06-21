'use client'

import * as React from 'react'
import { Image } from '@nextui-org/react'
import { TrendingPeopleProps } from '@/types/props/layouts'

const TrendingPeople = ({ user }: TrendingPeopleProps) => {
  return (
    <div className="flex items-center rounded-lg md:rounded-none border border-gray-300 mx-4 md:m-0 p-4 cursor-pointer hover:bg-gray-200">
      <Image
        src={user.profileImage}
        alt={user.name}
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="ml-4">
        <span className="text-sm font-bold">{user.name}</span>
      </div>
    </div>
  )
}

export default TrendingPeople
