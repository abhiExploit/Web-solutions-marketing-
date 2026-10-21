'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  BarChart3,
  Bell,
  CloudUpload,
  FileText,
  LayoutDashboard,
  LayoutTemplate,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  Settings,
  ShoppingBag,
  User,
  Users,
  Wallet,
  X,
  type LucideIcon,
} from 'lucide-react'
import { Logo } from '@/components/brand/logo'
import { currentUser } from '@/lib/sample-data'
import { cn } from '@/lib/utils'

type NavItem = { href: string; label: string; icon: LucideIcon }

const navByRole: Record<'user' | 'seller' | 'admin', NavItem[]> = {
  user: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/templates', label: 'Templates', icon: LayoutTemplate },
    { href: '/freelancers', label: 'Freelancers', icon: Users },
    { href: '/order-confirmation', label: 'My Purchases', icon: ShoppingBag },
    { href: '/messages', label: 'Messages', icon: MessageSquare },
    { href: '/seller/wallet', label: 'Wallet', icon: Wallet },
    { href: '/freelancers/emily-chen', label: 'Profile', icon: User },
  ],
  seller: [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/seller/upload', label: 'Upload Template', icon: CloudUpload },
    { href: '/seller/templates', label: 'My Templates', icon: LayoutTemplate },
    { href: '/seller/wallet', label: 'Earnings', icon: Wallet },
    { href: '/messages', label: 'Messages', icon: MessageSquare },
    { href: '/freelancers/emily-chen', label: 'Profile', icon: User },
    { href: '/admin', label: 'Settings', icon: Settings },
  ],
  admin: [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin#users', label: 'Users', icon: Users },
    { href: '/templates', label: 'Templates', icon: LayoutTemplate },
    { href: '/freelancers', label: 'Freelancers', icon: User },
    { href: '/admin#orders', label: 'Orders', icon: ShoppingBag },
    { href: '/admin#reports', label: 'Reports', icon: BarChart3 },
    { href: '/admin#pages', label: 'Pages', icon: FileText },
    { href: '/admin#settings', label: 'Settings', icon: Settings },
  ],
}

type AppShellProps = {
  role?: 'user' | 'seller' | 'admin'
  children: React.ReactNode
}

export function AppShell({ role = 'user', children }: AppShellProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const items = navByRole[role]
  const darkSidebar = role !== 'user'

  const sidebar = (
    <div
      className={cn(
        'flex h-full flex-col gap-6 px-4 py-5',
        darkSidebar ? 'bg-navy text-white' : 'border-r border-border bg-white',
      )}
    >
      <Logo tone={darkSidebar ? 'light' : 'dark'} />
      <nav aria-label="Dashboard" className="flex flex-1 flex-col gap-1">
        {items.map((item) => {
          const active = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-primary text-primary-foreground'
                  : darkSidebar
                    ? 'text-white/70 hover:bg-white/10 hover:text-white'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <Link
        href="/login"
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium',
          darkSidebar ? 'text-white/70 hover:bg-white/10' : 'text-muted-foreground hover:bg-muted',
        )}
      >
        <LogOut className="size-4" aria-hidden="true" />
        Logout
      </Link>
    </div>
  )

  return (
    <div className="flex min-h-svh bg-background">
      <aside className="sticky top-0 hidden h-svh w-60 shrink-0 lg:block">{sidebar}</aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <aside className="relative h-full w-64">{sidebar}</aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-white px-4 md:px-6">
          <button
            type="button"
            className="rounded-md p-2 hover:bg-muted lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" />
          </button>
          <label className="relative hidden max-w-md flex-1 sm:block">
            <span className="sr-only">Search</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search templates, freelancers..."
              className="h-10 w-full rounded-lg border border-input bg-muted/60 pl-9 pr-3 text-sm outline-none focus:border-primary focus:bg-white"
            />
          </label>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/messages" aria-label="Messages" className="rounded-md p-2 text-muted-foreground hover:bg-muted">
              <MessageSquare className="size-5" />
            </Link>
            <button type="button" aria-label="Notifications" className="relative rounded-md p-2 text-muted-foreground hover:bg-muted">
              <Bell className="size-5" />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-destructive" />
            </button>
            <div className="ml-1 flex items-center gap-2">
              <Image
                src={currentUser.avatar || '/placeholder.svg'}
                alt={currentUser.name}
                width={36}
                height={36}
                className="size-9 rounded-full object-cover"
              />
              <span className="hidden text-sm font-medium md:inline">{currentUser.name}</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>

      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed right-4 top-4 z-50 rounded-full bg-white p-2 shadow lg:hidden"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
