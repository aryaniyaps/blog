'use client'

import { Comments as CommentsComponent } from 'pliny/comments'
import siteMetadata from '@/data/siteMetadata'
import { useTheme } from 'next-themes'

export default function Comments({ slug }: { slug: string }) {
  const { theme } = useTheme()
  const getStoredTheme = () => (theme === 'dark' ? 'transparent_dark' : 'light')
  if (!siteMetadata.comments?.provider || siteMetadata.comments.provider !== 'giscus') {
    return null
  }
  return (
    <CommentsComponent
      commentsConfig={{
        ...siteMetadata.comments,
        giscusConfig: { ...siteMetadata.comments.giscusConfig, theme: getStoredTheme() },
      }}
      slug={slug}
    />
  )
}
