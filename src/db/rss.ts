export type RssItem = {
  title: string
  url: string
  date: Date
  summary: string
}

function decode(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function tag(block: string, names: string[]) {
  for (const name of names) {
    const match = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'))
    if (match?.[1]) return decode(match[1])
    const attr = block.match(new RegExp(`<${name}[^>]+href=["']([^"']+)["']`, 'i'))
    if (attr?.[1]) return decode(attr[1])
  }
  return ''
}

export function parseFeed(xml: string): RssItem[] {
  const blocks = xml.match(/<(item|entry)\b[\s\S]*?<\/\1>/gi) ?? []

  return blocks.flatMap((block) => {
    const title = tag(block, ['title'])
    const url = tag(block, ['link', 'id', 'guid'])
    const dateValue = tag(block, ['pubDate', 'published', 'updated', 'dc:date'])
    const summary = tag(block, ['description', 'summary', 'content'])
    const date = dateValue ? new Date(dateValue) : new Date()

    if (!title || !url || Number.isNaN(date.getTime())) return []

    return [{
      title,
      url,
      date,
      summary: summary.slice(0, 280),
    }]
  })
}

export async function fetchFeed(url: string) {
  const response = await fetch(url, {
    headers: { 'user-agent': 'AntrikshDaily/0.1 (overview ingest)' },
  })
  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`)
  }
  return parseFeed(await response.text())
}
