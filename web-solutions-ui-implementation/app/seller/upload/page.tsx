import { AppShell } from '@/components/app/app-shell'
import { UploadTemplateForm } from '@/components/seller/upload-template-form'
import { PageHeading } from '@/components/shared/ui-bits'

export const metadata = { title: 'Upload Template — WebSolutions' }

export default function UploadTemplatePage() {
  return (
    <AppShell role="seller">
      <PageHeading title="Upload New Template" description="Share your work with thousands of buyers." />
      <UploadTemplateForm />
    </AppShell>
  )
}
