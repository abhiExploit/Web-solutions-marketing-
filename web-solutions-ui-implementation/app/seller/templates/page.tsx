import Link from 'next/link'
import { AppShell } from '@/components/app/app-shell'
import { MyTemplatesList } from '@/components/seller/my-templates-list'
import { PageHeading } from '@/components/shared/ui-bits'

export const metadata = { title: 'My Templates — WebSolutions' }

export default function MyTemplatesPage() {
  return (
    <AppShell role="seller">
      <PageHeading
        title="My Templates"
        description="Manage your uploaded templates."
        action={
          <Link
            href="/seller/upload"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Upload Template
          </Link>
        }
      />
      <MyTemplatesList />
    </AppShell>
  )
}
