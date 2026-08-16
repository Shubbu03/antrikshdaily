import { cleanUrl, decodeMarkup, fetchText, type RssItem } from './rss'

function absoluteUrl(href: string, pageUrl: string) {
  return cleanUrl(new URL(href, pageUrl).toString())
}

function parseFlexibleDate(value: string) {
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

export function parseDhruvaPress(html: string, pageUrl: string): RssItem[] {
  const pattern = /href="(\/press-releases\/[^"]+)"[^>]*>[\s\S]*?news_item-title">([^<]+)<\/div>[\s\S]*?news_item-date">([^<]+)/gi
  const items: RssItem[] = []

  for (const match of html.matchAll(pattern)) {
    const date = parseFlexibleDate(decodeMarkup(match[3]))
    const title = decodeMarkup(match[2])
    if (!date || !title) continue
    items.push({
      title,
      url: absoluteUrl(match[1], pageUrl),
      date,
      summary: title,
    })
  }

  return items
}

export function parseBellatrixUpdates(html: string, pageUrl: string): RssItem[] {
  const pattern = /href="(\.\/updates\/[^"]+|\/updates\/[^"]+)"[^>]*>([^<]+)<\/a>[\s\S]{0,600}?data-framer-name="Date"[\s\S]{0,400}?>([A-Z][a-z]+ \d{1,2}, \d{4})/gi
  const seen = new Set<string>()
  const items: RssItem[] = []

  for (const match of html.matchAll(pattern)) {
    const date = parseFlexibleDate(match[3])
    const title = decodeMarkup(match[2])
    const url = absoluteUrl(match[1], pageUrl)
    if (!date || !title || seen.has(url)) continue
    seen.add(url)
    items.push({ title, url, date, summary: title })
  }

  return items
}

export function parseSkyrootNewsroom(html: string, pageUrl: string): RssItem[] {
  const pattern = /href="(https?:\/\/[^"]+)"[\s\S]{0,2500}?newsroom_detail-text[^>]*>\s*(\d{1,2}\s+[A-Za-z]{3}\s+\d{4})\s*<\/div>[\s\S]{0,500}?newsroom_subheading[^>]*>([^<]+)<\/h3>/gi
  const seen = new Set<string>()
  const items: RssItem[] = []

  for (const match of html.matchAll(pattern)) {
    const date = parseFlexibleDate(decodeMarkup(match[2]))
    const title = decodeMarkup(match[3])
    const url = absoluteUrl(match[1], pageUrl)
    if (!date || !title || seen.has(url)) continue
    seen.add(url)
    items.push({ title, url, date, summary: title })
  }

  return items
}

export async function fetchNewsroom(url: string, parse: (html: string, pageUrl: string) => RssItem[]) {
  const page = await fetchText(url)
  return parse(page.text, page.url)
}
