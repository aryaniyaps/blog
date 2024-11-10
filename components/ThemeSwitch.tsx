// app/components/ThemeSwitcher.tsx
'use client'

import type { SwitchProps } from '@nextui-org/react'
import { VisuallyHidden, useSwitch } from '@nextui-org/react'
import { useIsSSR } from '@react-aria/ssr'
import clsx from 'clsx'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import type { FC } from 'react'
export interface ThemeSwitchProps {
  className?: string
  classNames?: SwitchProps['classNames']
}

const ThemeSwitch: FC<ThemeSwitchProps> = ({ className, classNames }) => {
  const { theme, setTheme } = useTheme()
  const isSSR = useIsSSR()

  const onChange = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }

  const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } = useSwitch({
    isSelected: theme === 'light' || isSSR,
    'aria-label': `Switch to ${theme === 'light' || isSSR ? 'dark' : 'light'} mode`,
    onChange,
  })

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          'px-px transition-opacity hover:opacity-80 cursor-pointer',
          className,
          classNames?.base
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              'h-auto w-auto',
              'bg-transparent',
              'rounded-lg',
              'flex items-center justify-center',
              'group-data-[selected=true]:bg-transparent',
              '!text-default-500',
              'pt-1.5',
              'px-0',
              'mx-0',
            ],
            classNames?.wrapper
          ),
        })}
      >
        {!isSelected || isSSR ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
      </div>
    </Component>
  )
}

export default ThemeSwitch
