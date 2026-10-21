'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { BadgeCheck, ChevronLeft, Clock, MapPin } from 'lucide-react'
import { Rating } from '@/components/shared/ui-bits'
import { formatINR, sampleTemplates, type Freelancer } from '@/lib/sample-data'
import { cn } from '@/lib/utils'

const tabs = ['About', 'Portfolio', 'Reviews'] as const

export function FreelancerProfile({ freelancer }: { freelancer: Freelancer }) {
  const [tab, setTab] = useState<(typeof tabs)[number]>('About')

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <Link href="/freelancers" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="size-4" aria-hidden="true" />
        Back to freelancers
      </Link>

      <section className="mt-4 rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <Image
            src={freelancer.avatar || '/placeholder.svg'}
            alt={freelancer.name}
            width={112}
            height={112}
            className="size-28 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">{freelancer.name}</h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-primary">
                <BadgeCheck className="size-3.5" aria-hidden="true" />
                Top Rated
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{freelancer.role}</p>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <Rating value={freelancer.rating} reviews={freelancer.reviews} />
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3.5" aria-hidden="true" />
                {freelancer.location}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <p className="text-2xl font-bold">
              {formatINR(freelancer.rate)}
              <span className="text-sm font-normal text-muted-foreground">/hr</span>
            </p>
            <div className="flex gap-2">
              <Link href="/messages" className="rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-secondary">
                Contact
              </Link>
              <Link href="/checkout" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                Hire Now
              </Link>
            </div>
          </div>
        </div>

        <div role="tablist" className="mt-6 flex gap-6 border-b border-border">
          {tabs.map((t) => (
            <button
              key={t}
              role="tab"
              type="button"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={cn(
                '-mb-px border-b-2 pb-2 text-sm font-medium',
                tab === t ? 'border-primary text-primary' : 'border-transparent text-muted-foreground',
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'About' && (
          <div className="grid gap-6 pt-6 md:grid-cols-[1fr_240px]">
            <div>
              <h2 className="font-semibold">About Me</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {"I'm a full-stack developer with 5+ years of experience in building modern web applications. I specialize in "}
                {freelancer.skills.join(', ')}.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[...freelancer.skills, 'JavaScript', 'Tailwind'].map((s) => (
                  <span key={s} className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-border p-4">
              <h2 className="text-sm font-semibold">Availability</h2>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-success" aria-hidden="true" />
                  Available for work
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="size-3.5" aria-hidden="true" />
                  Response time: within 1 hour
                </li>
              </ul>
            </div>
          </div>
        )}
        {tab === 'Reviews' && (
          <p className="pt-6 text-sm text-muted-foreground">
            {freelancer.reviews} clients rated {freelancer.name.split(' ')[0]} {freelancer.rating.toFixed(1)} out of 5.
          </p>
        )}
      </section>

      <section className="mt-6 rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Portfolio</h2>
          <button type="button" onClick={() => setTab('Portfolio')} className="text-sm font-semibold text-primary hover:underline">
            View All
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {sampleTemplates.slice(0, 3).map((t) => (
            <div key={t.id} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
              <Image src={t.image || '/placeholder.svg'} alt={`${t.name} project`} fill sizes="33vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
