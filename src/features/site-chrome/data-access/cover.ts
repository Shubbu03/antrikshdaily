import type { Story } from '@/features/signals/data-access/stories'

export type CoverVisual = {
  image: string | null
  imageCredit: string
  imageAlt: string
  badge: string
  badgeLabel: string
  stats: { value: string; label: string }[]
  linkLabel: string
  railTitle: string
}

function ageDays(story: Story, now = new Date()) {
  const date = new Date(story.date)
  if (Number.isNaN(date.getTime())) return 99
  return (now.getTime() - date.getTime()) / (24 * 60 * 60 * 1000)
}

function leadScore(story: Story, now = new Date()) {
  const recency = Math.max(0, 14 - ageDays(story, now)) * 4
  const industry = story.company === 'Industry' || story.category === 'Industry' ? 18 : 0
  const national = /\b(modi|prime minister|\bpm\b|in-?space)\b/i.test(story.title) ? 16 : 0
  const visual = coverFor(story).image ? 8 : 0
  const editorial = story.metric && story.metricLabel !== 'Source update' ? 6 : 0
  return recency + industry + national + visual + editorial
}

export function selectLeadStory(stories: Story[], now = new Date()) {
  return [...stories].sort((left, right) => leadScore(right, now) - leadScore(left, now))[0]
}

function isPmCeoMeeting(story: Story) {
  if (story.id === 'pm-space-ceos') return true
  return (
    /\b(modi|prime minister|\bpm\b)\b/i.test(story.title)
    && /\b(space startups?|space-tech startups?)\b/i.test(story.title)
  )
}

export function coverFor(story: Story): CoverVisual {
  if (isPmCeoMeeting(story)) {
    return {
      image: '/images/pm-space-ceos.webp',
      imageCredit: 'PMO',
      imageAlt: 'Prime Minister Narendra Modi with founders of Indian space startups at Seva Teerth',
      badge: '20',
      badgeLabel: 'Space startups\nat Seva Teerth',
      stats: [
        { value: '20', label: 'Startups\nin the room' },
        { value: 'PMO', label: 'Seva Teerth\nNew Delhi' },
        { value: '21 Aug', label: 'Date of\nthe meeting' },
      ],
      linkLabel: 'Read the official PMO note',
      railTitle: 'PM meets India’s space CEOs',
    }
  }

  if (story.id === 'skyroot-orbit') {
    return {
      image: '/images/vikram-1.webp',
      imageCredit: 'ISRO / SDSC SHAR',
      imageAlt: "Skyroot's Vikram-1 rocket on the launch pad at Satish Dhawan Space Centre",
      badge: 'First',
      badgeLabel: 'Private orbital\nlaunch',
      stats: [
        { value: '04', label: 'Stage\nvehicle' },
        { value: '02', label: 'Satellites\ndeployed' },
        { value: '350', label: 'kg to\nLEO' },
      ],
      linkLabel: 'Read the official ISRO release',
      railTitle: 'Vikram-1 reaches orbit',
    }
  }

  const words = story.title.split(' ')
  return {
    image: null,
    imageCredit: '',
    imageAlt: story.title,
    badge: story.metric || story.company.slice(0, 4),
    badgeLabel: story.metricLabel || story.category,
    stats: story.metric
      ? [{ value: story.metric, label: story.metricLabel }]
      : [],
    linkLabel: story.source === 'PMO' || story.source === 'PIB'
      ? `Read the official ${story.source} note`
      : `Read the ${story.source} report`,
    railTitle: words.length <= 6 ? story.title : words.slice(0, 6).join(' '),
  }
}
