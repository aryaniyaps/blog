import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 sm:px-3 xl:max-w-5xl">{children}</section>
  )
}
