'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CreditCard, Lock, Smartphone, Wallet } from 'lucide-react'
import { formatINR, sampleTemplates } from '@/lib/sample-data'
import { cn } from '@/lib/utils'

const methods = [
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
  { id: 'paypal', label: 'PayPal', icon: Wallet },
  { id: 'upi', label: 'UPI', icon: Smartphone },
  { id: 'wallet', label: 'Wallet', icon: Wallet },
] as const

const PLATFORM_FEE_RATE = 0.1

export function PaymentForm() {
  const router = useRouter()
  const item = sampleTemplates[0]
  const [method, setMethod] = useState<(typeof methods)[number]['id']>('card')
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '' })

  const fee = item.price * PLATFORM_FEE_RATE
  const total = item.price + fee

  return (
    <div className="mx-auto grid max-w-5xl gap-6 px-4 py-10 md:px-6 lg:grid-cols-[1.2fr_1fr]">
      <section className="rounded-xl border border-border bg-card p-6">
        <h1 className="text-xl font-bold tracking-tight">Payment Method</h1>

        <fieldset className="mt-5 flex flex-col gap-2">
          <legend className="sr-only">Choose a payment method</legend>
          {methods.map((m) => {
            const Icon = m.icon
            return (
              <label
                key={m.id}
                className={cn(
                  'flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm',
                  method === m.id ? 'border-primary bg-secondary/60' : 'border-border hover:bg-muted',
                )}
              >
                <input
                  type="radio"
                  name="method"
                  value={m.id}
                  checked={method === m.id}
                  onChange={() => setMethod(m.id)}
                  className="accent-primary"
                />
                <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
                {m.label}
              </label>
            )
          })}
        </fieldset>

        <form
          className="mt-6 flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            router.push('/order-confirmation')
          }}
        >
          {method === 'card' && (
            <>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="card-number" className="text-sm font-medium">
                  Card Number
                </label>
                <input
                  id="card-number"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="1234 5678 9012 3456"
                  value={card.number}
                  onChange={(e) => setCard({ ...card, number: e.target.value })}
                  className="h-11 rounded-lg border border-input px-3 text-sm outline-none focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="expiry" className="text-sm font-medium">
                    Expiry Date
                  </label>
                  <input
                    id="expiry"
                    autoComplete="cc-exp"
                    placeholder="12/28"
                    value={card.expiry}
                    onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                    className="h-11 rounded-lg border border-input px-3 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cvv" className="text-sm font-medium">
                    CVV
                  </label>
                  <input
                    id="cvv"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    placeholder="123"
                    value={card.cvv}
                    onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                    className="h-11 rounded-lg border border-input px-3 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>
            </>
          )}
          <button
            type="submit"
            className="mt-2 h-11 rounded-lg bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Pay Now - {formatINR(total)}
          </button>
          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="size-3.5" aria-hidden="true" />
            Your payment is secured and encrypted
          </p>
        </form>
      </section>

      <aside className="h-fit rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-bold">Order Summary</h2>
        <div className="mt-4 flex items-center gap-3">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
            <Image src={item.image || '/placeholder.svg'} alt="" fill sizes="64px" className="object-cover" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">{item.name} Template</p>
            <p className="text-xs text-muted-foreground">Premium Template</p>
          </div>
          <p className="text-sm font-semibold">{formatINR(item.price)}</p>
        </div>
        <dl className="mt-6 flex flex-col gap-2 border-t border-border pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd>{formatINR(item.price)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Platform Fee (10%)</dt>
            <dd>{formatINR(fee)}</dd>
          </div>
          <div className="mt-2 flex justify-between border-t border-border pt-3 text-base font-bold">
            <dt>Total</dt>
            <dd>{formatINR(total)}</dd>
          </div>
        </dl>
      </aside>
    </div>
  )
}
