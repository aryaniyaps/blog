import React from 'react'
import { Boxes } from '../ui/BackgroundBoxes'
import { cn } from '@/lib/utils'
import Image from '@/components/Image'
import { FlipWords } from '../ui/FlipWords'

export function Hero() {
  const titles = [
    'Fullstack Developer',
    'MLOps Engineer',
    'GraphQL Enthusiast',
    'AWS Cloud Developer',
    'Student Entreprenuer',
  ]
  return (
    <div className="relative flex h-96 w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
      <div className="w-ful pointer-events-none absolute inset-0 z-20 h-full bg-background [mask-image:radial-gradient(transparent,white)]" />

      <Boxes />
      <Image
        src={'/static/images/avatar.jpg'}
        alt="avatar"
        width={192}
        height={192}
        className="z-20 h-36 w-36 rounded-full"
      />
      <h1 className={cn('relative z-20 mt-4 text-xl md:text-4xl')}>Aryan Iyappan</h1>
      <div className="mt-4 flex w-full justify-center">
        <FlipWords words={titles} className="text-xl" duration={3600} />
      </div>
    </div>
  )
}
