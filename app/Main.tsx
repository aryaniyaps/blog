import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import { Hero } from '@/components/landing/hero'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="flex h-full flex-col items-center px-3 sm:min-h-screen">
        <Hero />

        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags, images } = post

            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2">
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-8">
                        <div className="flex w-full flex-col gap-6">
                          <h2 className="text-2xl font-medium">
                            <Link href={`/blog/${slug}`} className="text-foreground-800">
                              {title}
                            </Link>
                          </h2>
                        </div>
                        <Link href={`/blog/${slug}`}>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </Link>
                        <div className="flex flex-wrap gap-3">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
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
