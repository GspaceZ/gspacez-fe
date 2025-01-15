'use client'

import { FActionIcon } from '@/components/common/FActionIcon'
import MainLayout from '@/components/layouts/MainLayout'
import { Button, Input } from '@nextui-org/react'
import { IconSearch } from '@tabler/icons-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

const Page = () => {
  const params = useSearchParams()
  const [text, setText] = useState<string>(params.get('q') || '')
  const router = useRouter()

  const handleSearch = () => {
    router.push(`?q=${text}`)
  }

  const types = [
    {
      label: 'All',
      value: null
    },
    {
      label: 'Post',
      value: 'post'
    },
    {
      label: 'User',
      value: 'user'
    }
  ]

  return (
    <MainLayout>
      <div className="flex w-full flex-col items-center">
        <div className="mx-auto w-full max-w-[632px]">
          <div className="mx-4">
            <div className="mt-4">
              <Input
                placeholder="Search something..."
                endContent={
                  <FActionIcon
                    icon={<IconSearch size={16} />}
                    onClick={() => {
                      if (text !== '') {
                        handleSearch()
                      }
                    }}
                  />
                }
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === 'Enter' && text !== '') {
                    handleSearch()
                  }
                }}
              />
            </div>
            <div className="mt-4 flex items-center gap-2 overflow-y-auto">
              {types.map((type) => (
                <Button
                  key={type.value}
                  color="default"
                  size="sm"
                  className="rounded-full"
                  variant={type.value === params.get('type') ? 'solid' : 'bordered'}
                  onPress={() => {
                    if (type.value !== params.get('type')) {
                      router.push(`?q=${params.get('q')}${type.value && `&type=${type.value}`}`)
                    }
                  }}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Page
