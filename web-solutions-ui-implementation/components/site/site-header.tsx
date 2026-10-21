'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, Search, ShoppingCart, X } from 'lucide-react'
import { Logo } from '@/components/brand/logo'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/templates', label: 'Templates' },
  { href: '/freelancers', label: 'Freelancers' },
  { href: '/#about', label: 'About' },
  { href: '/messages', label: 'Contact' },
]

export function SiteHeader({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const [open, setOpen] = useState(false)
  const isDark = tone === 'dark'

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b backdrop-blur',
        isDark ? 'border-white/10 bg-navy/90 text-white' : 'border-border bg-white/90 text-foreground',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 md:px-6">
        <Logo tone={isDark ? 'light' : 'dark'} />

        <nav aria-label="Main" className="hidden items-center gap-7 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                'transition-colors',
                isDark ? 'text-white/75 hover:text-white' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/templates"
            aria-label="Search"
            className={cn('rounded-md p-2', isDark ? 'hover:bg-white/10' : 'hover:bg-muted')}
          >
            <Search className="size-4" />
          </Link>
          <Link
            href="/checkout"
            aria-label="Cart"
            className={cn('rounded-md p-2', isDark ? 'hover:bg-white/10' : 'hover:bg-muted')}
          >
            <ShoppingCart className="size-4" />
          </Link>
          <Link
            href="/login"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {'Login / Sign Up'}
          </Link>
        </div>

        <button
          type="button"
          className="rounded-md p-2 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className={cn('flex flex-col gap-1 border-t px-4 py-3 md:hidden', isDark ? 'border-white/10' : 'border-border')}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn('rounded-md px-3 py-2 text-sm', isDark ? 'hover:bg-white/10' : 'hover:bg-muted')}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="mt-2 rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
          >
            {'Login / Sign Up'}
          </Link>
        </nav>
      )}
    </header>
  )
}
