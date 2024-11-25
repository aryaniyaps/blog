import Link from 'next/link'
import { slug } from 'github-slugger'
import { Chip } from '@nextui-org/react'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link href={`/tags/${slug(text)}`}>
      <Chip color="default" size="sm" className="uppercase tracking-widest">
        {text.split(' ').join('-')}
      </Chip>
    </Link>
  )
}

export default Tag
