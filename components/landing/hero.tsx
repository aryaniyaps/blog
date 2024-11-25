import React from 'react'
import { cn } from '@/lib/utils'
import Image from '@/components/Image'

export function Hero() {
  return (
    <div className="relative flex w-full max-w-4xl flex-col items-center justify-center gap-6 overflow-hidden rounded-lg bg-background py-12 sm:flex-row">
      <div className="flex w-full flex-col items-start justify-center gap-4">
        <h1
          className={cn(
            'text-xl font-semibold sm:text-4xl sm:font-semibold md:text-6xl md:font-bold'
          )}
        >
          Hi, I'm Aryan Iyappan👋
        </h1>
        <h2>Self-driven software Enthusiast with a knack for building things</h2>
      </div>
      <Image
        src={'/static/images/avatar.jpg'}
        alt="avatar"
        width={192}
        height={192}
        className="z-20 h-36 w-36 rounded-lg"
      />
    </div>
  )
}
