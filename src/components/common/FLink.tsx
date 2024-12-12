'use client'

import { pathWithLocale } from '@/helpers/url/path-with-locale'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface FLinkProps {
  path: string
  children: ReactNode
}

export const FLink = ({ path, children }: FLinkProps) => {
  const pathname = usePathname()

  const destinationPath = pathWithLocale(pathname, path)

  return <Link href={destinationPath}>{children}</Link>
}
