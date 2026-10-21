import { AppShell } from '@/components/app/app-shell'
import { PageHeading, StatCard, StatusBadge } from '@/components/shared/ui-bits'
import { formatPrice, sampleOrders } from '@/lib/sample-data'

export const metadata = { title: 'Admin Dashboard — WebSolutions' }

export default function AdminPage() {
  return (
    <AppShell role="admin">
      <PageHeading title="Admin Dashboard" description="Overview of platform activity." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard value="124" label="Total Users" />
        <StatCard value="86" label="Total Templates" />
        <StatCard value="42" label="Total Orders" />
        <StatCard value="₹1,03,500" label="Total Revenue" />
      </div>

      <section id="orders" className="mt-8 overflow-hidden rounded-xl border border-border bg-card">
        <h2 className="px-5 py-4 font-semibold">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium">Order ID</th>
                <th scope="col" className="px-5 py-3 font-medium">Customer</th>
                <th scope="col" className="px-5 py-3 font-medium">Template</th>
                <th scope="col" className="px-5 py-3 text-right font-medium">Amount</th>
                <th scope="col" className="px-5 py-3 text-right font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sampleOrders.map((o) => (
                <tr key={o.id}>
                  <td className="px-5 py-3 font-medium">{o.id}</td>
                  <td className="whitespace-nowrap px-5 py-3">{o.customer}</td>
                  <td className="whitespace-nowrap px-5 py-3 text-muted-foreground">{o.item}</td>
                  <td className="px-5 py-3 text-right font-semibold">{formatPrice(o.amount)}</td>
                  <td className="px-5 py-3 text-right">
                    <StatusBadge status={o.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  )
}
