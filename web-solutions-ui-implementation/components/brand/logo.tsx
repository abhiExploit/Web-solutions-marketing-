import Link from 'next/link'
import { cn } from '@/lib/utils'

type LogoProps = {
  tone?: 'light' | 'dark'
  className?: string
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn('size-7', className)}>
      <path
        d="M16 2 28 9v14l-12 7L4 23V9z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M10 12.5 16 9l6 3.5M10 16l6 3.5 6-3.5M10 19.5 16 23l6-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Logo({ tone = 'dark', className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn('flex items-center gap-2 font-bold tracking-tight', className)}
      aria-label="WebSolutions home"
    >
      <LogoMark className="text-primary" />
      <span className="text-lg">
        <span className={tone === 'light' ? 'text-white' : 'text-foreground'}>Web</span>
        <span className="text-primary">Solutions</span>
      </span>
    </Link>
  )
}
