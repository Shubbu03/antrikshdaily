'use client'

import { CompaniesFeature } from '@/features/companies/companies-feature'
import type { Company } from '@/features/companies/data-access/companies'
import { SignalsFeature } from '@/features/signals/signals-feature'
import type { Story } from '@/features/signals/data-access/stories'
import { Hero } from '@/features/site-chrome/ui/site-ui-hero'
import { LeadStory } from '@/features/site-chrome/ui/site-ui-lead-story'
import { SiteFooter } from '@/features/site-chrome/ui/site-ui-footer'
import { SiteHeader } from '@/features/site-chrome/ui/site-ui-header'
import { Ticker } from '@/features/site-chrome/ui/site-ui-ticker'
import { Trajectory } from '@/features/trajectory/ui/trajectory-ui-line'

type HomePageProps = {
  stories: Story[]
  companies: Company[]
}

export function HomePage({ stories, companies }: HomePageProps) {
  return (
    <div className="overflow-clip">
      <SiteHeader />
      <main id="top">
        <Hero />
        <Ticker />
        <LeadStory />
        <SignalsFeature stories={stories} />
        <CompaniesFeature companies={companies} />
        <Trajectory />
      </main>
      <SiteFooter />
    </div>
  )
}
