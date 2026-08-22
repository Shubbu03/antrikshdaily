import { companies } from '@/features/companies/data-access/companies'
import type { Story } from '@/features/signals/data-access/stories'
import { googleNewsIndustrySearchUrl, googleNewsSearchUrl } from './match-company'
import {
  parseBellatrixUpdates,
  parseDhruvaPress,
  parseSkyrootNewsroom,
} from './newsrooms'
import type { RssItem } from './rss'

export type NewsSource = {
  id: string
  kind: 'rss' | 'google-news' | 'html'
  companyId: string | null
  company: string
  source: string
  category: Story['category']
  url: string
  accent: string
  maxItems: number
  parseHtml?: (html: string, pageUrl: string) => RssItem[]
}

function companySource(
  id: string,
  extras: Omit<NewsSource, 'id' | 'companyId' | 'company' | 'accent' | 'category'> & {
    category?: Story['category']
  },
): NewsSource {
  const company = companies.find((item) => item.id === id)
  if (!company) throw new Error(`Unknown company source: ${id}`)

  return {
    id,
    companyId: company.id,
    company: company.name,
    accent: company.accent,
    category: extras.category ?? 'Satellites',
    ...extras,
  }
}

export const newsSources: NewsSource[] = [
  {
    id: 'google-news',
    kind: 'google-news',
    companyId: null,
    company: '',
    source: 'Google News',
    category: 'Satellites',
    url: googleNewsSearchUrl(),
    accent: '#e94b2c',
    maxItems: 24,
  },
  {
    id: 'google-news-industry',
    kind: 'google-news',
    companyId: null,
    company: '',
    source: 'Google News',
    category: 'Industry',
    url: googleNewsIndustrySearchUrl(),
    accent: '#e94b2c',
    maxItems: 10,
  },
  companySource('satsure', {
    kind: 'rss',
    source: 'SatSure',
    category: 'Earth data',
    url: 'https://www.satsure.co/feed/',
    maxItems: 6,
  }),
  companySource('xdlinx', {
    kind: 'rss',
    source: 'XDLINX',
    category: 'Satellites',
    url: 'https://xdlinx.space/feed/',
    maxItems: 6,
  }),
  companySource('dhruva', {
    kind: 'html',
    source: 'Dhruva Space',
    category: 'Satellites',
    url: 'https://www.dhruvaspace.com/press-releases',
    maxItems: 6,
    parseHtml: parseDhruvaPress,
  }),
  companySource('bellatrix', {
    kind: 'html',
    source: 'Bellatrix',
    category: 'Propulsion',
    url: 'https://bellatrix.aero/updates',
    maxItems: 6,
    parseHtml: parseBellatrixUpdates,
  }),
  companySource('skyroot', {
    kind: 'html',
    source: 'Skyroot',
    category: 'Launch',
    url: 'https://www.skyroot.in/newsroom',
    maxItems: 6,
    parseHtml: parseSkyrootNewsroom,
  }),
]
