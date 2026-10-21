'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { MoreVertical } from 'lucide-react'
import { PriceBadge, StatusBadge } from '@/components/shared/ui-bits'
import { formatPrice, sampleTemplates } from '@/lib/sample-data'
import { cn } from '@/lib/utils'

const statuses = ['Published', 'Pending', 'Rejected'] as const
type Status = (typeof statuses)[number]

const sellerTemplates = sampleTemplates.map((t, i) => ({
  ...t,
  status: (i < 3 ? 'Published' : i === 3 ? 'Pending' : 'Rejected') as Status,
  sales: [42, 31, 18, 0, 0, 0][i] ?? 0,
}))

export function MyTemplatesList() {
  const [tab, setTab] = useState<Status>('Published')
  const items = sellerTemplates.filter((t) => t.status === tab)

  return (
    <section className="rounded-xl border border-border bg-card">
      <div role="tablist" className="flex gap-6 border-b border-border px-5 pt-4">
        {statuses.map((s) => (
          <button
            key={s}
            role="tab"
            type="button"
            aria-selected={tab === s}
            onClick={() => setTab(s)}
            className={cn(
              '-mb-px border-b-2 pb-3 text-sm font-medium',
              tab === s ? 'border-primary text-primary' : 'border-transparent text-muted-foreground',
            )}
          >
            {s}
            <span className="ml-1.5 text-xs text-muted-foreground">
              ({sellerTemplates.filter((t) => t.status === s).length})
            </span>
          </button>
        ))}
      </div>

      <ul className="divide-y divide-border">
        {items.map((t) => (
          <li key={t.id} className="flex flex-wrap items-center gap-4 p-4">
            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
              <Image src={t.image || '/placeholder.svg'} alt="" fill sizes="96px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{t.name}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <PriceBadge premium={t.premium} />
                <span className="font-semibold text-foreground">{formatPrice(t.price)}</span>
                <StatusBadge status={t.status} />
                <span>{t.sales} sales</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/seller/upload" className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted">
                Edit
              </Link>
              <Link href={`/templates/${t.id}`} className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted">
                View
              </Link>
              <button type="button" aria-label={`More actions for ${t.name}`} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted">
                <MoreVertical className="size-4" />
              </button>
            </div>
          </li>
        ))}
        {items.length === 0 && <li className="p-10 text-center text-sm text-muted-foreground">No templates here yet.</li>}
      </ul>
    </section>
  )
}
