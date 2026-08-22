import Image from 'next/image'
import { ArrowUpRightIcon } from '@phosphor-icons/react'
import type { Story } from '@/features/signals/data-access/stories'
import { coverFor } from '../data-access/cover'

type LeadStoryProps = {
  story: Story
}

export function LeadStory({ story }: LeadStoryProps) {
  const cover = coverFor(story)

  return (
    <section
      className="section-pad grid grid-cols-1 items-start gap-[clamp(30px,4vw,70px)] py-20 md:grid-cols-[50px_1fr_1fr] md:py-30 lg:grid-cols-[100px_minmax(400px,1.2fr)_minmax(380px,0.85fr)]"
      aria-labelledby="lead-story-title"
    >
      <div className="font-sans text-[13px] font-semibold text-signal md:justify-self-start md:rotate-180 md:[writing-mode:vertical-rl]">
        01 / Lead
      </div>
      <div className="group relative h-full min-h-85 overflow-hidden bg-photo after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(to_top,rgb(23_23_18/0.5),transparent_45%)] sm:min-h-112.5 lg:min-h-135">
        {cover.image ? (
          <Image
            src={cover.image}
            alt={cover.imageAlt}
            fill
            loading="lazy"
            quality={70}
            sizes="(max-width: 820px) 100vw, 50vw"
            className="object-cover saturate-[.74] contrast-105 transition-transform duration-800 group-hover:scale-[1.025]"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col justify-end bg-paper-deep p-7">
            <p className="font-sans text-[13px] font-semibold text-signal">{story.company}</p>
            <p className="mt-3 font-serif text-[34px] leading-[0.95] font-normal tracking-[-0.03em]">
              {story.title}
            </p>
          </div>
        )}
        {cover.imageCredit && (
          <span className="absolute bottom-4 left-4.5 z-2 font-sans text-xs font-medium text-white">
            Image: {cover.imageCredit}
          </span>
        )}
        <div className="absolute top-0 right-0 z-2 flex size-25 flex-col justify-between bg-sun p-4 font-sans text-[13px] leading-[1.35] font-medium whitespace-pre-line sm:size-31.5">
          <span className="text-7 leading-none font-bold">{cover.badge}</span>
          {cover.badgeLabel}
        </div>
      </div>
      <article className="pt-1.25 md:pt-8">
        <p className="font-sans text-[13px] font-medium text-muted">
          <span className="mr-2 bg-signal px-1.75 py-1.25 text-white">{story.category}</span>
          {story.date}
        </p>
        <h2 id="lead-story-title" className="mt-7 mb-6 font-serif text-[46px] leading-[0.98] font-normal tracking-[-0.035em] md:text-[clamp(43px,4.5vw,73px)]">
          {story.title}
        </h2>
        <p className="font-sans text-lg leading-[1.52] text-body">
          {story.summary}
        </p>
        {cover.stats.length > 0 && (
          <div className={`my-8.5 grid border-y border-line py-5 ${cover.stats.length === 1 ? 'grid-cols-1' : cover.stats.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {cover.stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex flex-col items-start gap-2.5 px-2 md:flex-row md:items-end md:px-3 ${
                  index === 0 ? 'md:pl-0' : ''
                } ${index < cover.stats.length - 1 ? 'border-r border-line' : ''}`}
              >
                <strong className="font-serif text-[25px] leading-none font-normal md:text-[30px]">{stat.value}</strong>
                <span className="font-sans text-xs leading-[1.3] font-medium whitespace-pre-line">{stat.label}</span>
              </div>
            ))}
          </div>
        )}
        <a
          className="inline-flex items-center gap-2.5 border-b border-current pb-1.5 font-sans text-sm font-semibold no-underline"
          href={story.url}
          target="_blank"
          rel="noreferrer"
        >
          {cover.linkLabel} <ArrowUpRightIcon size={17} />
        </a>
      </article>
    </section>
  )
}
