import { SiteHeader } from '@/components/site/site-header'
import { TemplatesMarketplace } from '@/components/templates/templates-marketplace'

export const metadata = { title: 'Website Templates — WebSolutions' }

export default async function TemplatesPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams
  return (
    <>
      <SiteHeader tone="light" />
      <main>
        <TemplatesMarketplace initialQuery={q ?? ''} />
      </main>
    </>
  )
}
