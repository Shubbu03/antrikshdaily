import { companies, type Company } from '@/features/companies/data-access/companies'
import type { Story } from '@/features/signals/data-access/stories'

const aliasesById: Record<string, string[]> = {
  skyroot: ['Skyroot Aerospace', 'Skyroot', 'Vikram-1', 'Vikram-I'],
  pixxel: ['Pixxel'],
  agnikul: ['Agnikul Cosmos', 'Agnikul', 'Agnibaan'],
  bellatrix: ['Bellatrix Aerospace', 'Bellatrix'],
  dhruva: ['Dhruva Space', 'Dhruva'],
  galaxeye: ['GalaxEye', 'Galaxeye'],
  manastu: ['Manastu Space', 'Manastu'],
  aadyah: ['Aadyah Aerospace', 'Aadyah'],
  azista: ['Azista BST', 'Azista'],
  xdlinx: ['XDLINX', 'Xdlinx'],
  digantara: ['Digantara'],
  satsure: ['SatSure', 'Sat Sure'],
  skyserve: ['SkyServe'],
  piersight: ['PierSight'],
  orbitaid: ['OrbitAID', 'OrbitAid'],
  serendipity: ['Serendipity Space'],
}

const aliasIndex = companies.flatMap((company) =>
  (aliasesById[company.id] ?? [company.name]).map((alias) => ({
    company,
    alias: alias.toLowerCase(),
  })),
).sort((left, right) => right.alias.length - left.alias.length)

export function matchCompany(text: string): Company | null {
  const haystack = text.toLowerCase()
  return aliasIndex.find(({ alias }) => haystack.includes(alias))?.company ?? null
}

export function storyCategoryFor(company: Company, title: string): Story['category'] {
  if (/\b(raises?|raised|funding|series [a-c]|pre-series|unicorn|crore|\$\d)/i.test(title)) {
    return 'Capital'
  }

  switch (company.focus) {
    case 'Launch vehicles':
      return 'Launch'
    case 'Earth observation':
    case 'Earth analytics':
    case 'Maritime observation':
      return 'Earth data'
    case 'In-space mobility':
    case 'Green propulsion':
    case 'Launch subsystems':
    case 'On-orbit servicing':
      return 'Propulsion'
    default:
      return 'Satellites'
  }
}

export function googleNewsSearchUrl() {
  const query = `${companies.map((company) => `"${company.name}"`).join(' OR ')} when:11w`
  return `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-IN&gl=IN&ceid=IN:en`
}

export function googleNewsIndustrySearchUrl() {
  const query = '("space startups" OR "space-tech startups" OR "IN-SPACe" OR "private space" OR "Indian space industry") when:11w'
  return `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-IN&gl=IN&ceid=IN:en`
}
