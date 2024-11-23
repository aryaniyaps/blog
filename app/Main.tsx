import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { Hero } from '@/components/landing/hero'
import { HoverBorderGradient } from '@/components/ui/HoverBorderGradient'
import Image from '@/components/Image'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="flex h-full flex-col items-center px-3 sm:min-h-screen">
        <Hero />
        <div className="flex w-full items-center justify-center py-4">
          <Link href="/blog">
            <button className="bg-background-800 shadow-background-900 group relative inline-block cursor-pointer rounded-full p-px text-xs font-semibold leading-6 text-foreground  no-underline shadow-2xl">
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
              </span>
              <div className="bg-background-950 relative z-10 flex items-center space-x-2 rounded-full px-4 py-0.5 ring-1 ring-foreground/10 ">
                <span>{`All Blog Posts`}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                  ></path>
                </svg>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-sky-400/0 via-sky-400/90 to-sky-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
            </button>
          </Link>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags, images } = post

            const coverImage = images?.[0]
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2">
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-8">
                        <div className="flex w-full flex-col gap-6">
                          {coverImage && (
                            <Link href={`/blog/${slug}`}>
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
                            <Link href={`/blog/${slug}`} className="text-foreground-800">
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap gap-3">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="flex w-full items-center justify-start gap-4">
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-foreground-400">
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </dd>
                        <div className="text-base font-medium leading-6">
                          <Link
                            href={`/blog/${slug}`}
                            aria-label={`Read more: "${title}"`}
                            color="primary"
                          >
                            Read more &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {siteMetadata.newsletter?.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
