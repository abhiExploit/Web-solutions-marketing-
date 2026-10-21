import { PaymentForm } from '@/components/checkout/payment-form'
import { SiteHeader } from '@/components/site/site-header'

export const metadata = { title: 'Payment — WebSolutions' }

export default function CheckoutPage() {
  return (
    <>
      <SiteHeader tone="light" />
      <main>
        <PaymentForm />
      </main>
    </>
  )
}
