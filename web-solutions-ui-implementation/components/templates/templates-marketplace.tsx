'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { TemplateCard } from '@/components/templates/template-card'
import { sampleTemplates, templateCategories } from '@/lib/sample-data'
import { cn } from '@/lib/utils'

type PriceFilter = 'all' | 'free' | 'premium'

export function TemplatesMarketplace({ initialQuery = '' }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery)
  const [category, setCategory] = useState('All')
  const [price, setPrice] = useState<PriceFilter>('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return sampleTemplates.filter((t) => {
      if (category !== 'All' && t.category !== category) return false
      if (price === 'free' && t.premium) return false
      if (price === 'premium' && !t.premium) return false
      return !q || t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
    })
  }, [query, category, price])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      <label className="relative block max-w-md">
        <span className="sr-only">Search templates</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search templates..."
          className="h-10 w-full rounded-lg border border-input bg-white pl-9 pr-3 text-sm outline-none focus:border-primary"
        />
      </label>

      <h1 className="mt-8 text-2xl font-bold tracking-tight">Website Templates</h1>
      <p className="mt-1 text-sm text-muted-foreground">Professionally designed templates for every need.</p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[200px_1fr]">
        <aside aria-label="Filters">
          <h2 className="mb-3 text-sm font-semibold">Categories</h2>
          <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {templateCategories.map((c) => (
              <li key={c}>
                <button
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-sm',
                    category === c ? 'bg-secondary font-medium text-primary' : 'text-muted-foreground hover:bg-muted',
                  )}
                >
                  <span
                    className={cn(
                      'size-3 rounded-full border',
                      category === c ? 'border-primary bg-primary' : 'border-input',
                    )}
                    aria-hidden="true"
                  />
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div>
          <div role="tablist" aria-label="Price" className="mb-5 flex gap-2">
            {(
              [
                ['all', 'All Templates'],
                ['free', 'Free Templates'],
                ['premium', 'Premium Templates'],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                role="tab"
                type="button"
                aria-selected={price === value}
                onClick={() => setPrice(value)}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm font-medium',
                  price === value ? 'bg-primary text-primary-foreground' : 'border border-border bg-white hover:bg-muted',
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          ) : (
            <p className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              No templates match your filters.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
