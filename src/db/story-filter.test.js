import { describe, expect, test } from 'bun:test'
import {
  acceptFetchedStory,
  dedupeStories,
  isFreshStory,
  storiesAreDuplicates,
  storyCutoffDate,
} from './story-filter'

const NOW = new Date('2026-08-16T12:00:00.000Z')

function candidate(title, date = NOW) {
  return { company: 'Skyroot Aerospace', title, date, url: title }
}

describe('story freshness', () => {
  test('accepts the exact 2.5-month cutoff and rejects anything older', () => {
    const cutoff = storyCutoffDate(NOW)
    expect(isFreshStory(cutoff, NOW)).toBe(true)
    expect(isFreshStory(new Date(cutoff.getTime() - 1), NOW)).toBe(false)
  })
})

describe('fetched story acceptance', () => {
  test('keeps recent space news about a tracked private firm', () => {
    expect(acceptFetchedStory({
      title: 'Pixxel-led consortium will build a private Earth observation constellation',
      date: NOW,
      requireCompanyInTitle: true,
    })).toBe(true)
  })

  test('rejects market and entertainment noise', () => {
    expect(acceptFetchedStory({
      title: 'GalaxEye unlisted share price: is the premium justified?',
      date: NOW,
      requireCompanyInTitle: true,
    })).toBe(false)
  })

  test('rejects unrelated news even when it comes from a company feed', () => {
    expect(acceptFetchedStory({
      title: 'Delayed sowing and rising monsoon risk for Kharif crops',
      date: NOW,
      officialCompany: 'SatSure',
    })).toBe(false)
  })
})

describe('story deduplication', () => {
  test('recognizes syndicated coverage of the same event', () => {
    expect(storiesAreDuplicates(
      candidate('GalaxEye Acquires StarOps To Strengthen Satellite Engineering'),
      candidate('GalaxEye Buys StarOps, Expands Space Capabilities'),
    )).toBe(true)
  })

  test('does not merge separate stories that share a recurring product', () => {
    expect(storiesAreDuplicates(
      candidate('Skyroot signs three-launch deal with HEX20 for Vikram-1'),
      candidate('Skyroot founders discuss Vikram-1 manufacturing roadmap'),
    )).toBe(false)
  })

  test('does not merge similar events outside the duplicate window', () => {
    expect(storiesAreDuplicates(
      candidate('Skyroot signs a launch agreement with HEX20', new Date('2026-06-01')),
      candidate('Skyroot signs another launch agreement with HEX20', new Date('2026-08-01')),
    )).toBe(false)
  })

  test('prefers an official company URL over duplicate coverage', () => {
    const stories = dedupeStories([
      candidate('Dhruva Space launches LEAP-1 satellite mission'),
      {
        ...candidate('Dhruva Space launches the LEAP-1 spacecraft mission'),
        url: 'https://www.dhruvaspace.com/press-releases/leap-1',
      },
    ])
    expect(stories).toHaveLength(1)
    expect(stories[0]?.url).toContain('dhruvaspace.com')
  })
})
