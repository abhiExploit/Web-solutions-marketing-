import Link from 'next/link'
import { AppShell } from '@/components/app/app-shell'
import { PageHeading, StatCard } from '@/components/shared/ui-bits'
import { TemplateCard } from '@/components/templates/template-card'
import { currentUser, sampleTemplates } from '@/lib/sample-data'

export const metadata = { title: 'Dashboard — WebSolutions' }

export default function DashboardPage() {
  return (
    <AppShell role="user">
      <PageHeading
        title={`Welcome back, ${currentUser.firstName}!`}
        description="Here's what's happening with your account."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard value="5" label="Total Purchases" />
        <StatCard value="₹10,000" label="Wallet Balance" />
        <StatCard value="3" label="Messages" />
      </div>

      <section className="mt-8 rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Recently Viewed Templates</h2>
          <Link href="/templates" className="text-sm font-semibold text-primary hover:underline">
            View All
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {sampleTemplates.slice(0, 4).map((template) => (
            <TemplateCard key={template.id} template={template} compact />
          ))}
        </div>
      </section>
    </AppShell>
  )
}
