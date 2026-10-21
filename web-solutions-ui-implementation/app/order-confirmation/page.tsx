import Link from 'next/link'
import { Check } from 'lucide-react'
import { SiteHeader } from '@/components/site/site-header'

export const metadata = { title: 'Order Confirmed — WebSolutions' }

const orderDetails = [
  { label: 'Order ID', value: '#WS123456' },
  { label: 'Date', value: 'Apr 27, 2026 - 10:42 AM' },
  { label: 'Total Paid', value: '₹1,758.90' },
]

export default function OrderConfirmationPage() {
  return (
    <>
      <SiteHeader tone="light" />
      <main className="flex min-h-[calc(100svh-4rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-success text-white">
            <Check className="size-8" strokeWidth={3} aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-2xl font-bold tracking-tight">Payment Successful!</h1>
          <p className="mt-2 text-sm text-muted-foreground">Your order has been placed successfully.</p>

          <dl className="mt-6 flex flex-col gap-3 rounded-xl bg-muted p-4 text-sm">
            {orderDetails.map((d) => (
              <div key={d.label} className="flex justify-between">
                <dt className="text-muted-foreground">{d.label}</dt>
                <dd className="font-semibold">{d.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/dashboard"
              className="h-11 rounded-lg bg-primary text-sm font-semibold leading-[2.75rem] text-primary-foreground hover:bg-primary/90"
            >
              View My Purchases
            </Link>
            <Link
              href="/"
              className="h-11 rounded-lg border border-border text-sm font-semibold leading-[2.75rem] hover:bg-muted"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
