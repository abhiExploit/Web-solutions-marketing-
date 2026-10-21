import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site/site-header'
import { TemplatePreview } from '@/components/templates/template-preview'
import { sampleTemplates } from '@/lib/sample-data'

export function generateStaticParams() {
  return sampleTemplates.map((t) => ({ id: t.id }))
}

export default async function TemplateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const template = sampleTemplates.find((t) => t.id === id)
  if (!template) notFound()

  return (
    <>
      <SiteHeader tone="light" />
      <main>
        <TemplatePreview key={template.id} template={template} />
      </main>
    </>
  )
}
