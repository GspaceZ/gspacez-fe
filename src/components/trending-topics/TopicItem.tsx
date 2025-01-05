'use client'
import { TrendingTopicItem } from '@/types/dto/post'
import Link from 'next/link'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image } from '@nextui-org/react'
import { IconLink } from '@tabler/icons-react'

interface Props {
  topic: TrendingTopicItem
}

export const TopicItem = ({ topic }: Props) => {
  const decodeHTMLText = (text: string) => {
    const txt = document.createElement('textarea')
    txt.innerHTML = text
    return txt.value
  }

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between">
        <span className="rounded-md bg-blue-200 px-1 text-sm text-blue-500">#{topic.query}</span>
        <Link href={topic.exploreLink}></Link>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        {topic.articles.map((article) => {
          return (
            <div key={article.url}>
              <div className="flex w-full flex-col gap-2 rounded-lg border-gray-200 bg-white p-4 shadow-md">
                <div className="flex items-start justify-between">
                  <div className="flex max-w-[70%] flex-col gap-1">
                    <Link href={article.url} className="font-semibold">
                      {decodeHTMLText(article.title)}
                    </Link>
                    <span className="text-sm">{article.timeAgo}</span>
                  </div>
                  <Dropdown>
                    <DropdownTrigger>
                      <span className="flex cursor-pointer items-center gap-1 text-blue-500">
                        <IconLink size={16} />
                        Link article
                      </span>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem key={'copy'}>Copy</DropdownItem>
                      <DropdownItem key={'goto'}>Go to article</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                {article.image && <Image src={article.image.imageUrl} alt={`Article's image`} />}
                <span className="text-xs">Source: {article.source}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
