import Image from 'next/image'
import Link from 'next/link'
import { PriceBadge } from '@/components/shared/ui-bits'
import { formatPrice, type Template } from '@/lib/sample-data'

export function TemplateCard({ template, compact = false }: { template: Template; compact?: boolean }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg">
      <Link href={`/templates/${template.id}`} className="relative block aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={template.image || '/placeholder.svg'}
          alt={`${template.name} template preview`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold">
            <Link href={`/templates/${template.id}`}>{template.name}</Link>
          </h3>
          <span className="text-sm font-bold">{formatPrice(template.price)}</span>
        </div>
        {!compact && (
          <div className="flex items-center justify-between gap-2">
            <PriceBadge premium={template.premium} />
            <div className="flex gap-1.5">
              <Link
                href={`/templates/${template.id}`}
                className="rounded-md border border-border px-2.5 py-1 text-xs font-medium hover:bg-muted"
              >
                Preview
              </Link>
              <Link
                href={template.premium ? '/checkout' : `/templates/${template.id}`}
                className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90"
              >
                {template.premium ? 'Buy Now' : 'Download'}
              </Link>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
