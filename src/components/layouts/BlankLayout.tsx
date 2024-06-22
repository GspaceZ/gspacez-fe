'use client'

import { BlankLayoutProps } from '@/types/props/layouts'
import * as React from 'react'

const BlankLayout = ({ children }: BlankLayoutProps) => {
  return <div>{children}</div>
}

export default BlankLayout
