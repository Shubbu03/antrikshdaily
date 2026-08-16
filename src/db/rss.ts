export const INGEST_USER_AGENT = 'AntrikshDaily/0.1 (overview ingest)'

export type RssItem = {
  title: string
  url: string
  date: Date
  summary: string
  publication?: string
}

export function decodeMarkup(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#x27;|&apos;/gi, "'")
    .replace(/&#0?39;/g, "'")
    .replace(/&#8217;|&#x2019;/gi, "'")
    .replace(/&#8216;|&#x2018;/gi, "'")
    .replace(/&#8220;|&#8221;|&ldquo;|&rdquo;/gi, '"')
    .replace(/&#038;|&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function cleanUrl(url: string) {
  try {
    const parsed = new URL(url)
    for (const key of [...parsed.searchParams.keys()]) {
      if (key.startsWith('utm_')) parsed.searchParams.delete(key)
    }
    return parsed.toString()
  } catch {
    return url
  }
}

function tag(block: string, names: string[]) {
  for (const name of names) {
    const match = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'))
    if (match?.[1]) return decodeMarkup(match[1])
    const attr = block.match(new RegExp(`<${name}[^>]+href=["']([^"']+)["']`, 'i'))
    if (attr?.[1]) return decodeMarkup(attr[1])
  }
  return ''
}

export function parseFeed(xml: string): RssItem[] {
  const blocks = xml.match(/<(item|entry)\b[\s\S]*?<\/\1>/gi) ?? []

  return blocks.flatMap((block) => {
    const publication = tag(block, ['source'])
    let title = tag(block, ['title'])
    if (publication && title.endsWith(` - ${publication}`)) {
      title = title.slice(0, -(publication.length + 3)).trim()
    }
    const url = cleanUrl(tag(block, ['link', 'id', 'guid']))
    const dateValue = tag(block, ['pubDate', 'published', 'updated', 'dc:date'])
    const summary = tag(block, ['description', 'summary', 'content'])
    const date = dateValue ? new Date(dateValue) : new Date()

    if (!title || !url || Number.isNaN(date.getTime())) return []

    return [{
      title,
      url,
      date,
      summary: summary.slice(0, 280),
      publication: publication || undefined,
    }]
  })
}

export async function fetchText(url: string) {
  const response = await fetch(url, {
    headers: {
      'user-agent': INGEST_USER_AGENT,
      accept: 'application/rss+xml,application/xml,text/html;q=0.9,*/*;q=0.8',
    },
    redirect: 'follow',
    signal: AbortSignal.timeout(20000),
  })
  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`)
  }
  return { url: response.url, text: await response.text() }
}

export async function fetchFeed(url: string) {
  const { text } = await fetchText(url)
  return parseFeed(text)
}
