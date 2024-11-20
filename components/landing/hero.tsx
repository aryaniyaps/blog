import React from 'react'
import { Boxes } from '../ui/BackgroundBoxes'
import { cn } from '@/lib/utils'
import Image from '@/components/Image'

export function Hero() {
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
      <p className="relative z-20 mt-2 text-center text-foreground-800">
        Self-driven Software Enthusiast
      </p>
    </div>
  )
}
