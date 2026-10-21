'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Check, ChevronLeft, ExternalLink } from 'lucide-react'
import { PriceBadge, Rating } from '@/components/shared/ui-bits'
import { formatPrice, sampleTemplates, type Template } from '@/lib/sample-data'
import { cn } from '@/lib/utils'

const features = [
  'Fully Responsive',
  'Modern Design',
  'SEO Optimized',
  'Easy to Customize',
  'Lifetime Updates',
]

export function TemplatePreview({ template }: { template: Template }) {
  const gallery = [template, ...sampleTemplates.filter((t) => t.id !== template.id)].slice(0, 6)
  const [activeImage, setActiveImage] = useState(template.image)
  const [tab, setTab] = useState<'details' | 'reviews'>('details')

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <Link href="/templates" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ChevronLeft className="size-4" aria-hidden="true" />
        Templates
        <span aria-hidden="true">{'›'}</span>
        <span className="text-foreground">{template.name}</span>
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-navy">
            <Image
              src={activeImage || '/placeholder.svg'}
              alt={`${template.name} template preview`}
              fill
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="mt-3 grid grid-cols-6 gap-2">
            {gallery.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setActiveImage(g.image)}
                aria-label={`Show ${g.name} preview`}
                className={cn(
                  'relative aspect-[4/3] overflow-hidden rounded-md border-2',
                  activeImage === g.image ? 'border-primary' : 'border-transparent',
                )}
              >
                <Image src={g.image || '/placeholder.svg'} alt="" fill sizes="10vw" className="object-cover" />
              </button>
            ))}
          </div>

          <div className="mt-6">
            <div role="tablist" className="flex gap-6 border-b border-border">
              {(['details', 'reviews'] as const).map((t) => (
                <button
                  key={t}
                  role="tab"
                  type="button"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={cn(
                    '-mb-px border-b-2 pb-2 text-sm font-medium capitalize',
                    tab === t ? 'border-primary text-primary' : 'border-transparent text-muted-foreground',
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="pt-4 text-sm leading-relaxed text-muted-foreground">
              {tab === 'details' ? (
                <p>{template.description}</p>
              ) : (
                <p>
                  Rated {template.rating.toFixed(1)} out of 5 by {template.reviews} customers. Buyers love the clean
                  code and how easy it is to customize.
                </p>
              )}
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-xl border border-border bg-card p-6 lg:sticky lg:top-20">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{template.category}</span>
            <PriceBadge premium={template.premium} />
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">{template.name}</h1>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-3xl font-bold">{formatPrice(template.price)}</span>
            <Rating value={template.rating} reviews={template.reviews} />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{template.description}</p>

          <h2 className="mt-6 text-sm font-semibold">Features</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm">
                <Check className="size-4 text-success" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/checkout"
              className="h-11 rounded-lg bg-primary text-center text-sm font-semibold leading-[2.75rem] text-primary-foreground hover:bg-primary/90"
            >
              {template.premium ? 'Buy Now' : 'Download Free'}
            </Link>
            <button
              type="button"
              className="flex h-11 items-center justify-center gap-2 rounded-lg border border-primary text-sm font-semibold text-primary hover:bg-secondary"
            >
              Live Preview
              <ExternalLink className="size-4" aria-hidden="true" />
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
