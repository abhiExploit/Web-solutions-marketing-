import Link from 'next/link'
import { ArrowRight, Headphones, LayoutTemplate, ShieldCheck, Users, Zap } from 'lucide-react'
import { TemplateCard } from '@/components/templates/template-card'
import { sampleTemplates } from '@/lib/sample-data'

const services = [
  {
    icon: LayoutTemplate,
    title: 'Website Templates',
    description: 'Beautiful, responsive and customizable templates for your next project.',
    href: '/templates',
    cta: 'Browse Templates',
  },
  {
    icon: Users,
    title: 'Freelancer Services',
    description: 'Find skilled developers for your custom web development needs.',
    href: '/freelancers',
    cta: 'Browse Freelancers',
  },
]

const features = [
  { icon: LayoutTemplate, label: 'Templates' },
  { icon: Users, label: 'Freelancers' },
  { icon: ShieldCheck, label: 'Secure' },
  { icon: Zap, label: 'Fast' },
  { icon: Headphones, label: '24/7 Support' },
]

export function Services() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <div key={service.title} className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center">
              <span className="flex size-14 items-center justify-center rounded-xl bg-secondary text-primary">
                <Icon className="size-7" aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-lg font-semibold">{service.title}</h2>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{service.description}</p>
              <Link href={service.href} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                {service.cta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          )
        })}
      </div>

      <div className="mt-16">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Featured Templates</h2>
          <Link href="/templates" className="text-sm font-semibold text-primary hover:underline">
            View All
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sampleTemplates.slice(0, 4).map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function FeatureStrip() {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <div className="text-center lg:text-left">
            <p className="text-lg font-bold">
              Web<span className="text-primary">Solutions</span>
            </p>
            <p className="text-sm text-white/60">{'Templates & Freelancers for Your Web Ideas'}</p>
          </div>
          <ul className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/80 md:gap-10">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <li key={feature.label} className="flex items-center gap-2">
                  <Icon className="size-4 text-primary" aria-hidden="true" />
                  {feature.label}
                </li>
              )
            })}
          </ul>
        </div>
        <p className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          {'© 2026 WebSolutions. Build. Sell. Grow.'}
        </p>
      </div>
    </section>
  )
}
