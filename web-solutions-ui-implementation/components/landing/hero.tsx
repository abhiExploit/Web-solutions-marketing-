'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Search } from 'lucide-react'

export function Hero() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,rgba(21,101,245,0.35),transparent_60%)]"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
        <div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-balance md:text-5xl">
            Your Vision, Our <span className="text-primary">Web Solutions</span>
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
            Premium website templates and skilled freelancers to bring your ideas to life.
          </p>

          <form
            role="search"
            className="mt-8 flex max-w-lg items-center gap-2 rounded-xl bg-white p-1.5"
            onSubmit={(e) => {
              e.preventDefault()
              router.push(`/templates${query ? `?q=${encodeURIComponent(query)}` : ''}`)
            }}
          >
            <label htmlFor="hero-search" className="sr-only">
              Search templates or freelancers
            </label>
            <input
              id="hero-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search templates, freelancers..."
              className="h-10 flex-1 bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              aria-label="Search"
              className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Search className="size-4" />
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/templates"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Explore Templates
            </Link>
            <Link
              href="/freelancers"
              className="rounded-lg border border-white/25 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Hire Freelancers
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full">
          <Image
            src="/images/hero-laptop.png"
            alt="Laptop and phone displaying a WebSolutions website template"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  )
}
