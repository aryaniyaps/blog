import { ReactNode } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { Divider } from '@nextui-org/react'
import TOCInline from 'pliny/ui/TOCInline'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export default function PostLayout({ content, next, prev, children }: LayoutProps) {
  const { path, slug, date, title, readingTime, toc } = content

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <header>
          <div className="mt-12 space-y-8 pb-10 text-center">
            <div>
              <PageTitle>{title}</PageTitle>
            </div>
            <div className="flex w-full items-center justify-center divide-x-1 divide-foreground-600 text-base font-medium leading-6 text-foreground-600">
              <div className="pr-2">
                <dt className="sr-only">Published on</dt>
                <dd>
                  <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                </dd>
              </div>
              <p className="pl-2">{readingTime.text}</p>
            </div>
          </div>
        </header>
        <div className="pt-10 xl:grid xl:grid-cols-4 xl:gap-x-12">
          {/* TOC */}
          <div className="hidden xl:block">
            <div className="prose hidden max-w-none pb-8 dark:prose-invert xl:sticky xl:top-24 xl:block">
              <h4>Table of Contents</h4>
              <TOCInline toc={toc} />
            </div>
          </div>

          {/* Main Content */}
          <div className="xl:col-span-3">
            <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0">
              <div className="prose max-w-none pb-8 dark:prose-invert">{children}</div>
              {siteMetadata.comments && (
                <div
                  className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300"
                  id="comment"
                >
                  <Comments slug={slug} />
                </div>
              )}
              <footer>
                <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                  {prev && prev.path && (
                    <div className="pt-4 xl:pt-8">
                      <Link
                        href={`/${prev.path}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label={`Previous post: ${prev.title}`}
                      >
                        &larr; {prev.title}
                      </Link>
                    </div>
                  )}
                  {next && next.path && (
                    <div className="pt-4 xl:pt-8">
                      <Link
                        href={`/${next.path}`}
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label={`Next post: ${next.title}`}
                      >
                        {next.title} &rarr;
                      </Link>
                    </div>
                  )}
                </div>
              </footer>
            </div>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
