import type { Story } from '@/features/signals/data-access/stories'

export type RssSource = {
  companyId: string | null
  company: string
  source: string
  category: Story['category']
  url: string
  accent: string
}

export const rssSources: RssSource[] = [
  {
    companyId: null,
    company: 'ISRO',
    source: 'ISRO',
    category: 'Launch',
    url: 'https://www.isro.gov.in/rss.xml',
    accent: '#e94b2c',
  },
]
