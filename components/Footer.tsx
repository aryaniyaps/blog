import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import SectionContainer from './SectionContainer'

export default function Footer() {
  return (
    <footer className="w-full border-t-1 border-foreground-100 bg-background py-12">
      <SectionContainer>
        <div className="flex w-full flex-col items-center justify-between gap-6 px-4 text-gray-500 dark:text-gray-400 sm:flex-row sm:px-3">
          <div className="flex space-x-4">
            <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
            <SocialIcon kind="github" href={siteMetadata.github} size={6} />
            <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
            <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
            <SocialIcon kind="x" href={siteMetadata.x} size={6} />
            <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} />
            <SocialIcon kind="threads" href={siteMetadata.threads} size={6} />
            <SocialIcon kind="medium" href={siteMetadata.medium} size={6} />
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div>{siteMetadata.author}</div>
            <div>{` • `}</div>
            <div>{`© ${new Date().getFullYear()}`}</div>
          </div>
        </div>
      </SectionContainer>
    </footer>
  )
}
