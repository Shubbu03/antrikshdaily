'use client'

import { CaretRightIcon } from '@phosphor-icons/react'
import type { Story } from '@/features/signals/data-access/stories'
import { scrollToId } from '../../../lib/scroll-to'

type TickerProps = {
  stories: Story[]
}

function tickerLabel(story: Story) {
  return story.company === 'Industry' ? 'India' : story.company.replace(/ Aerospace| Space Labs| Cosmos| Space$/, '')
}

export function Ticker({ stories }: TickerProps) {
  const highlights = stories.slice(0, 3)

  return (
    <section
      className="grid min-h-14 grid-cols-[90px_1fr] items-center overflow-hidden border-b border-line sm:grid-cols-[110px_1fr] md:grid-cols-[140px_1fr_auto]"
      aria-label="Current highlights"
    >
      <div className="flex items-center self-stretch bg-signal pl-3.5 font-sans text-[13px] font-semibold text-white sm:pl-5 md:pl-[clamp(20px,3.5vw,56px)]">
        Latest
      </div>
      <div className="flex gap-12 overflow-hidden px-3.5 font-sans text-[9px] font-medium whitespace-nowrap sm:px-7 sm:text-sm">
        {highlights.map((item, index) => (
          <span key={item.id} className={`flex gap-2.5 ${index === 0 ? 'overflow-hidden text-ellipsis' : 'hidden md:flex'}`}>
            <strong className="font-semibold text-signal">{tickerLabel(item)}</strong> {item.title}
          </span>
        ))}
      </div>
      <button
        className="hidden items-center gap-2.5 self-stretch border-0 border-l border-line bg-transparent px-7.5 font-sans text-sm font-semibold md:flex"
        onClick={() => scrollToId('signals')}
      >
        See all <CaretRightIcon size={16} />
      </button>
    </section>
  )
}
