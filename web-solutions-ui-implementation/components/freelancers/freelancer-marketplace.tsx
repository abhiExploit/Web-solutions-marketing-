'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Rating } from '@/components/shared/ui-bits'
import { formatINR, freelancerCategories, freelancerSkillTabs, sampleFreelancers, type Freelancer } from '@/lib/sample-data'
import { cn } from '@/lib/utils'

function FreelancerCard({ freelancer }: { freelancer: Freelancer }) {
  return (
    <article className="flex flex-col items-center rounded-xl border border-border bg-card p-5 text-center transition-shadow hover:shadow-lg">
      <Image
        src={freelancer.avatar || '/placeholder.svg'}
        alt={freelancer.name}
        width={88}
        height={88}
        className="size-22 rounded-full object-cover"
      />
      <h3 className="mt-3 font-semibold">
        <Link href={`/freelancers/${freelancer.id}`}>{freelancer.name}</Link>
      </h3>
      <p className="text-xs text-muted-foreground">{freelancer.role}</p>
      <div className="mt-2 flex items-center gap-2 text-xs">
        <Rating value={freelancer.rating} reviews={freelancer.reviews} />
      </div>
      <p className="mt-2 text-sm font-bold">{formatINR(freelancer.rate)}/hr</p>
      <Link
        href={`/freelancers/${freelancer.id}`}
        className="mt-3 w-full rounded-md border border-primary py-1.5 text-xs font-semibold text-primary hover:bg-secondary"
      >
        View Profile
      </Link>
    </article>
  )
}

export function FreelancerMarketplace() {
  const [query, setQuery] = useState('')
  const [skill, setSkill] = useState('All')
  const [category, setCategory] = useState('All Categories')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return sampleFreelancers.filter(
      (f) =>
        !q ||
        f.name.toLowerCase().includes(q) ||
        f.role.toLowerCase().includes(q) ||
        f.skills.some((s) => s.toLowerCase().includes(q)),
    )
  }, [query])

  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center md:px-6">
          <h1 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
            Find Top-Tier Web {'&'} Tech Experts
          </h1>
          <p className="mt-2 text-white/70">Your Team for Projects, Teams, and Business.</p>
          <label className="relative mx-auto mt-6 block max-w-xl">
            <span className="sr-only">Search freelancers</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search freelancers..."
              className="h-12 w-full rounded-xl bg-white pl-4 pr-14 text-sm text-foreground outline-none"
            />
            <span className="absolute right-1.5 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg bg-primary">
              <Search className="size-4" aria-hidden="true" />
            </span>
          </label>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div role="tablist" aria-label="Skills" className="flex flex-wrap gap-2">
          {freelancerSkillTabs.map((t) => (
            <button
              key={t}
              role="tab"
              type="button"
              aria-selected={skill === t}
              onClick={() => setSkill(t)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium',
                skill === t ? 'bg-primary text-primary-foreground' : 'border border-border bg-white hover:bg-muted',
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[200px_1fr]">
          <aside aria-label="Categories">
            <h2 className="mb-3 text-sm font-semibold">Categories</h2>
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {freelancerCategories.map((c) => (
                <li key={c}>
                  <button
                    type="button"
                    onClick={() => setCategory(c)}
                    aria-pressed={category === c}
                    className={cn(
                      'w-full rounded-md px-3 py-1.5 text-left text-sm',
                      category === c ? 'bg-secondary font-medium text-primary' : 'text-muted-foreground hover:bg-muted',
                    )}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {filtered.map((f) => (
              <FreelancerCard key={f.id} freelancer={f} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
