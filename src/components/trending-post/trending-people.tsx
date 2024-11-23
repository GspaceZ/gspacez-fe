'use client'

import * as React from 'react'
import { Image } from '@nextui-org/react'
import { TrendingPeopleProps } from '@/types/props/layouts'

const TrendingPeople = ({ user }: TrendingPeopleProps) => {
  return (
    <div className="mx-4 flex cursor-pointer items-center rounded-lg border border-gray-300 p-4 hover:bg-gray-200 md:m-0 md:rounded-none">
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
