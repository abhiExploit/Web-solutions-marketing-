import { FreelancerMarketplace } from '@/components/freelancers/freelancer-marketplace'
import { SiteHeader } from '@/components/site/site-header'

export const metadata = { title: 'Freelancers — WebSolutions' }

export default function FreelancersPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <FreelancerMarketplace />
      </main>
    </>
  )
}
