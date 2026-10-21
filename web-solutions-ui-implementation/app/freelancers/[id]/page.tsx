import { notFound } from 'next/navigation'
import { FreelancerProfile } from '@/components/freelancers/freelancer-profile'
import { SiteHeader } from '@/components/site/site-header'
import { sampleFreelancers } from '@/lib/sample-data'

export function generateStaticParams() {
  return sampleFreelancers.map((f) => ({ id: f.id }))
}

export default async function FreelancerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const freelancer = sampleFreelancers.find((f) => f.id === id)
  if (!freelancer) notFound()

  return (
    <>
      <SiteHeader tone="light" />
      <main>
        <FreelancerProfile key={freelancer.id} freelancer={freelancer} />
      </main>
    </>
  )
}
