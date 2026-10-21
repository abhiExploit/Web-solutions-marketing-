import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Rating({ value, reviews, className }: { value: number; reviews?: number; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1 text-xs text-muted-foreground', className)}>
      <Star className="size-3.5 fill-warning text-warning" aria-hidden="true" />
      <span className="font-medium text-foreground">{value.toFixed(1)}</span>
      {reviews !== undefined && <span>({reviews} reviews)</span>}
    </span>
  )
}

export function StatCard({
  label,
  value,
  hint,
  className,
}: {
  label: string
  value: string
  hint?: string
  className?: string
}) {
  return (
    <div className={cn('rounded-xl border border-border bg-card p-5', className)}>
      <p className="text-2xl font-bold tracking-tight">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
      {hint && <p className="mt-2 text-xs font-medium text-success">{hint}</p>}
    </div>
  )
}

export function PageHeading({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-balance">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  )
}

const statusStyles: Record<string, string> = {
  Completed: 'bg-success/10 text-success',
  Published: 'bg-success/10 text-success',
  Pending: 'bg-warning/15 text-amber-700',
  Draft: 'bg-muted text-muted-foreground',
  Rejected: 'bg-destructive/10 text-destructive',
  Refunded: 'bg-destructive/10 text-destructive',
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn('inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium', statusStyles[status])}>
      {status}
    </span>
  )
}

export function PriceBadge({ premium }: { premium: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold',
        premium ? 'bg-secondary text-primary' : 'bg-success/10 text-success',
      )}
    >
      {premium ? 'Premium' : 'Free'}
    </span>
  )
}
