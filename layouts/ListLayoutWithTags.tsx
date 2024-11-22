/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import { Button, Pagination } from '@nextui-org/react'
import Image from '@/components/Image'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function PaginationComponent({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="flex flex-col gap-5">
      <Pagination total={totalPages} color="secondary" page={currentPage} />
      <div className="flex gap-2">
        <Link
          href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
          rel="prev"
        >
          <Button size="sm" variant="flat" color="secondary" disabled={!prevPage}>
            Previous
          </Button>
        </Link>
        <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
          <Button size="sm" variant="flat" color="secondary" disabled={!nextPage}>
            Next
          </Button>
        </Link>
      </div>
    </div>
  )
}
export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div className="flex h-full">
        {/* Static Sidebar */}
        <div className="hidden h-screen min-w-[280px] max-w-[280px] overflow-auto rounded bg-gray-50 pt-5 dark:bg-background/70 sm:flex">
          <div className="px-6 py-4">
            {pathname.startsWith('/blog') ? (
              <h3 className="text-primary font-bold uppercase">All Posts</h3>
            ) : (
              <Link href={`/blog`} className="font-bold uppercase">
                All Posts
              </Link>
            )}
            <ul>
              {sortedTags.map((t) => {
                return (
                  <li key={t} className="my-3">
                    {decodeURI(pathname.split('/tags/')[1]) === slug(t) ? (
                      <h3 className="text-primary inline px-3 py-2 text-sm font-bold uppercase">
                        {`${t} (${tagCounts[t]})`}
                      </h3>
                    ) : (
                      <Link
                        href={`/tags/${slug(t)}`}
                        className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                        aria-label={`View posts tagged ${t}`}
                      >
                        {`${t} (${tagCounts[t]})`}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Scrollable Posts Container */}
        <div className="flex-1 overflow-auto pl-12">
          <ul>
            {displayPosts.map((post) => {
              const { path, date, title, summary, tags, images } = post

              const coverImage = images?.[0]

              return (
                <li key={path} className="py-5">
                  <article className="flex flex-col space-y-2 xl:space-y-0">
                    <div className="space-y-8">
                      <div className="flex w-full flex-col gap-6">
                        {coverImage && (
                          <Link href={`/${path}`}>
                            <div className="relative aspect-[2/1] w-full">
                              <Image
                                alt={title}
                                fill
                                className="rounded-lg object-cover"
                                src={coverImage}
                              />
                            </div>
                          </Link>
                        )}
                        <h2 className="text-2xl font-medium">
                          <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                            {title}
                          </Link>
                        </h2>
                        <div className="flex flex-wrap gap-3">
                          {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                        </div>
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {summary}
                      </div>
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date} suppressHydrationWarning>
                            {formatDate(date, siteMetadata.locale)}
                          </time>
                        </dd>
                      </dl>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
          {pagination && pagination.totalPages > 1 && (
            <PaginationComponent
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
            />
          )}
        </div>
      </div>
    </>
  )
}
