import { AppShell } from '@/components/app/app-shell'
import { PageHeading, StatCard } from '@/components/shared/ui-bits'
import { formatINR, sampleTransactions } from '@/lib/sample-data'
import { cn } from '@/lib/utils'

export const metadata = { title: 'Wallet & Earnings — WebSolutions' }

export default function WalletPage() {
  return (
    <AppShell role="seller">
      <PageHeading
        title={'Wallet & Earnings'}
        description="Manage your balance and earnings."
        action={
          <button
            type="button"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Withdraw
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard value="₹20,350" label="Available Balance" className="border-primary/30 bg-secondary/50" />
        <StatCard value="₹26,560" label="Total Earnings" hint="+12% this month" />
        <StatCard value="₹1,03,500" label="Total Withdrawn" />
      </div>

      <section className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="font-semibold">Recent Transactions</h2>
          <button type="button" className="text-sm font-semibold text-primary hover:underline">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium">Type</th>
                <th scope="col" className="px-5 py-3 font-medium">Description</th>
                <th scope="col" className="px-5 py-3 text-right font-medium">Amount</th>
                <th scope="col" className="px-5 py-3 text-right font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sampleTransactions.map((t) => (
                <tr key={t.id}>
                  <td className="whitespace-nowrap px-5 py-3 font-medium">{t.type}</td>
                  <td className="px-5 py-3 text-muted-foreground">{t.description}</td>
                  <td
                    className={cn(
                      'whitespace-nowrap px-5 py-3 text-right font-semibold',
                      t.amount >= 0 ? 'text-success' : 'text-destructive',
                    )}
                  >
                    {t.amount >= 0 ? '+' : '-'}{formatINR(Math.abs(t.amount))}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-right text-muted-foreground">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  )
}
