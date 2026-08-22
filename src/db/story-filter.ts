import { companies } from '@/features/companies/data-access/companies'
import type { Story } from '@/features/signals/data-access/stories'
import { matchCompany, storyCategoryFor } from './match-company'

export const STORY_MAX_AGE_DAYS = Math.round(2.5 * 30.4375)
const DUPLICATE_WINDOW_DAYS = 14

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'to', 'for', 'of', 'in', 'on', 'with', 'by',
  'from', 'its', 'their', 'india', 'indian', 'after', 'into', 'over', 'new',
  'first', 'latest', 'says', 'said', 'will', 'as', 'at', 'is', 'are',
])

const GENERIC_EVENT_WORDS = new Set([
  'company', 'contract', 'deal', 'engine', 'global', 'launch', 'mission',
  'orbit', 'orbital', 'partner', 'partnership', 'private', 'propulsion',
  'rocket', 'satellite', 'space', 'spacecraft', 'startup', 'technology',
  'test', 'vikram', 'agnibaan', 'firefly', 'drishti',
])

const WORD_NORMALIZATIONS: Record<string, string> = {
  acquired: 'acquire',
  acquires: 'acquire',
  acquisition: 'acquire',
  announced: 'announce',
  announces: 'announce',
  bought: 'acquire',
  buys: 'acquire',
  launched: 'launch',
  launches: 'launch',
  partnered: 'partner',
  partners: 'partner',
  signed: 'sign',
  signs: 'sign',
}

const JUNK_PATTERN = /\b(kbc|kaun banega|amitabh|bachchan|unlisted share|share price|stock price|grey market|gmp|ipo allotment|bonus episode|reality show|independence day special|net profit|quarterly results|q[1-4] results)\b/i

const SPACE_PATTERN = /\b(space|spacetech|space-tech|aerospace|satellite|satellites|launch|launcher|orbit|orbital|rocket|propulsion|spacecraft|constellation|hyperspectral|payload|isro|in-space|inspace|vikram|agnibaan|earth observation|thruster|re-?entry|microgravity|leo|sar)\b/i

const INDIA_CONTEXT = /\b(india|indian|modi|narendra|prime minister|\bpm\b|pmo|in-?space|isro)\b/i

const PRIVATE_SPACE_SECTOR = /\b(start-?ups?|private space|space (ceos?|founders?)|homegrown space|space-tech|spacetech|space (industry|ecosystem|sector))\b/i

const SECTOR_HEADLINE = /\b(space startups?|space-tech startups?|spacetech startups?|private space|space (industry|ecosystem|sector)|ceos? of \d+|founders? (and|&) ceos?)\b/i

export const INDUSTRY_LABEL = 'Industry'
export const INDUSTRY_ACCENT = '#e94b2c'

export function storyCutoffDate(now = new Date()) {
  return new Date(now.getTime() - STORY_MAX_AGE_DAYS * 24 * 60 * 60 * 1000)
}

export function isFreshStory(date: Date, now = new Date()) {
  return date.getTime() >= storyCutoffDate(now).getTime()
}

function aliases() {
  return companies.flatMap((company) => [
    company.name,
    ...company.name.split(' ').filter((part) => part.length > 4 && !/^(space|labs)$/i.test(part)),
  ])
}

function withoutCompanyNames(text: string) {
  let stripped = text
  for (const alias of aliases().sort((left, right) => right.length - left.length)) {
    stripped = stripped.replaceAll(new RegExp(alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), ' ')
  }
  return stripped
}

export function isJunkStory(title: string) {
  return JUNK_PATTERN.test(title)
}

export function isSpaceIndustryStory(title: string, summary = '') {
  return SPACE_PATTERN.test(withoutCompanyNames(`${title} ${summary}`))
}

export function isTrackedFirmStory(title: string, summary = '', officialCompany?: string) {
  if (officialCompany) return true
  return Boolean(matchCompany(title) || matchCompany(`${title} ${summary}`))
}

export function isIndustryStory(title: string, summary = '') {
  const text = `${title} ${summary}`
  return SPACE_PATTERN.test(text) && INDIA_CONTEXT.test(text) && PRIVATE_SPACE_SECTOR.test(text)
}

export function isSectorHeadline(title: string) {
  return SECTOR_HEADLINE.test(title)
}

function industryCategory(title: string): Story['category'] {
  if (/\b(raises?|raised|funding|investment|series [a-c]|pre-series|unicorn|crore|\$\d)/i.test(title)) {
    return 'Capital'
  }
  if (/\b(launch|rocket|orbital flight|vikram|agnibaan)\b/i.test(title)) {
    return 'Launch'
  }
  return 'Industry'
}

export function resolveGoogleNewsStory(title: string, summary = '') {
  const company = matchCompany(title)
  const industry = isIndustryStory(title, summary)
  const sector = isSectorHeadline(title)

  if (industry && (!company || sector)) {
    return {
      companyId: null as string | null,
      company: INDUSTRY_LABEL,
      category: industryCategory(title),
      accent: INDUSTRY_ACCENT,
    }
  }

  if (!company) return null

  return {
    companyId: company.id,
    company: company.name,
    category: storyCategoryFor(company, title),
    accent: company.accent,
  }
}

export function acceptFetchedStory(input: {
  title: string
  summary?: string
  date: Date
  requireCompanyInTitle?: boolean
  officialCompany?: string
  allowIndustry?: boolean
}) {
  if (!isFreshStory(input.date)) return false
  if (isJunkStory(input.title)) return false
  if (!isSpaceIndustryStory(input.title, input.summary)) return false
  if (input.title.trim().length < 24) return false

  const industry = Boolean(input.allowIndustry && isIndustryStory(input.title, input.summary))
  if (input.requireCompanyInTitle && !matchCompany(input.title) && !industry) return false
  if (!isTrackedFirmStory(input.title, input.summary, input.officialCompany) && !industry) return false
  return true
}

function tokens(title: string) {
  let text = title.toLowerCase()
  for (const alias of aliases()) {
    text = text.replaceAll(alias.toLowerCase(), ' ')
  }
  return text
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .map((word) => WORD_NORMALIZATIONS[word] ?? word.replace(/s$/, ''))
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word))
}

function entityTokens(title: string) {
  const stripped = withoutCompanyNames(title)
  return new Set(
    (stripped.match(/\b(?:[A-Z][a-z0-9]+[A-Z][A-Za-z0-9]*|[A-Za-z]+\d[A-Za-z0-9-]*)\b/g) ?? [])
      .map((word) => word.toLowerCase().replace(/[^a-z0-9]/g, ''))
      .filter((word) => word.length > 2 && !GENERIC_EVENT_WORDS.has(word)),
  )
}

function jaccard(left: string[], right: string[]) {
  const a = new Set(left)
  const b = new Set(right)
  let overlap = 0
  for (const word of a) {
    if (b.has(word)) overlap += 1
  }
  const union = a.size + b.size - overlap
  return union === 0 ? 0 : overlap / union
}

function eventKeys(title: string) {
  const text = title.toLowerCase()
  const keys: string[] = []
  if (/\b(modi|narendra|prime minister|\bpm\b|pmo)\b/.test(text)) keys.push('modi')
  if (/\bstart-?ups?\b/.test(text)) keys.push('startup')
  if (/\bin-?space\b/.test(text)) keys.push('inspace')
  if (/\bseva teerth\b/.test(text)) keys.push('sevateerth')
  return keys
}

export function storiesAreDuplicates(
  left: { company: string; title: string; date: Date },
  right: { company: string; title: string; date: Date },
) {
  if (left.company !== right.company) return false
  const timeApart = Math.abs(left.date.getTime() - right.date.getTime())
  if (timeApart > DUPLICATE_WINDOW_DAYS * 24 * 60 * 60 * 1000) return false

  const leftTokens = tokens(left.title)
  const rightTokens = tokens(right.title)
  const score = jaccard(leftTokens, rightTokens)
  if (score >= 0.5) return true

  if (left.company === INDUSTRY_LABEL) {
    const shared = eventKeys(left.title).filter((key) => eventKeys(right.title).includes(key))
    if (shared.includes('modi') && shared.includes('startup')) return true
    if (score >= 0.35) return true
  }

  const distinctive = leftTokens.filter((word) => (
    word.length >= 5 && !GENERIC_EVENT_WORDS.has(word) && rightTokens.includes(word)
  ))
  if (distinctive.length >= 2) return true

  const rightEntities = entityTokens(right.title)
  return [...entityTokens(left.title)].some((word) => rightEntities.has(word))
}

export function isOfficialCompanyUrl(url: string) {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '')
    if (host === 'pib.gov.in' || host === 'pmindia.gov.in' || host.endsWith('.pib.gov.in')) {
      return true
    }
    return companies.some((company) => {
      const companyHost = new URL(company.url).hostname.replace(/^www\./, '')
      return host === companyHost || host.endsWith(`.${companyHost}`)
    })
  } catch {
    return false
  }
}

export function preferStory<T extends { url: string; title: string; date: Date }>(left: T, right: T) {
  const leftOfficial = isOfficialCompanyUrl(left.url)
  const rightOfficial = isOfficialCompanyUrl(right.url)
  if (leftOfficial !== rightOfficial) return leftOfficial ? left : right

  const leftGoogle = left.url.includes('news.google.com')
  const rightGoogle = right.url.includes('news.google.com')
  if (leftGoogle !== rightGoogle) return leftGoogle ? right : left

  if (left.date.getTime() !== right.date.getTime()) {
    return left.date > right.date ? left : right
  }

  return left.title.length >= right.title.length ? left : right
}

export function dedupeStories<T extends { company: string; title: string; url: string; date: Date }>(items: T[]) {
  const kept: T[] = []

  for (const item of items) {
    const duplicateAt = kept.findIndex((existing) => (
      existing.url === item.url || storiesAreDuplicates(existing, item)
    ))
    if (duplicateAt === -1) {
      kept.push(item)
      continue
    }
    kept[duplicateAt] = preferStory(kept[duplicateAt], item)
  }

  return kept
}
