'use client'

import Image from 'next/image'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { scrollToId } from '../../../lib/scroll-to'

export function Hero() {
  return (
    <section
      className="hero-grid section-pad relative grid min-h-0 grid-cols-1 items-center gap-[clamp(28px,4vw,72px)] border-b border-line pt-17.5 pb-10 sm:min-h-172.5 md:grid-cols-2 md:pb-17.5 lg:grid-cols-[minmax(380px,1.05fr)_minmax(420px,1.2fr)_170px] lg:py-0"
      aria-labelledby="hero-title"
    >
      <div className="relative z-10 max-w-160 animate-reveal md:max-w-none">
        <p className="mb-6.5 font-sans text-sm font-medium text-muted">India’s private space industry</p>
        <h1 id="hero-title" className="m-0 font-serif text-[clamp(65px,21vw,92px)] leading-[0.74] font-normal tracking-[-0.055em] sm:text-[clamp(72px,10vw,110px)] lg:text-[clamp(78px,8.2vw,138px)]">
          India is<br />building <em className="font-normal text-signal">up.</em>
        </h1>
        <p className="mt-7.5 mb-7.5 ml-1.25 max-w-130 font-sans text-[19px] leading-[1.45] tracking-[0.015em] text-copy sm:mt-9.5">
          News and company notes from the people turning a national space programme into an industry.
        </p>
        <div className="ml-1.25 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-7">
          <button
            className="inline-flex items-center justify-center gap-3 border-0 bg-ink px-4.5 py-3.5 font-sans text-[15px] font-semibold text-paper transition duration-200 hover:-translate-y-0.5 hover:bg-signal"
            onClick={() => scrollToId('signals')}
          >
            Latest news <ArrowRightIcon size={17} />
          </button>
          <button
            className="flex items-center gap-2 border-0 border-b border-ink bg-transparent py-2.5 font-sans text-[15px] font-semibold"
            onClick={() => scrollToId('companies')}
          >
            Companies <ArrowRightIcon size={17} />
          </button>
        </div>
      </div>

      <figure className="relative z-10 mt-2.5 h-90 animate-reveal overflow-hidden bg-photo shadow-stamp [animation-delay:0.12s] sm:mt-0 sm:h-110 md:h-117.5 lg:h-130">
        <Image
          src="/images/vikram-1.webp"
          alt="Skyroot’s Vikram-1 rocket on the launch pad at Satish Dhawan Space Centre"
          fill
          priority
          loading="eager"
          fetchPriority="high"
          quality={75}
          sizes="(max-width: 820px) 100vw, 50vw"
          className="object-cover saturate-[.74] contrast-[1.05]"
        />
        <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/70 to-transparent px-5 pt-4.5 pb-4 font-sans text-[13px] leading-[1.4] text-paper">
          Skyroot Vikram-1 at Sriharikota, 18 July 2026. Image: ISRO / SDSC SHAR
        </figcaption>
      </figure>

      <div className="relative z-10 hidden animate-reveal flex-col justify-end self-stretch border-l border-line py-10 pr-0 pl-7 [animation-delay:0.24s] lg:flex">
        <span className="absolute top-11 right-0 font-sans text-xs font-medium text-muted [writing-mode:vertical-rl]">This month</span>
        <strong className="font-sans text-[26px] leading-[0.95] font-semibold tracking-[-0.02em]">
          Vikram-1<br />reaches orbit
        </strong>
        <div className="mt-4.5 flex flex-col gap-1.25 border-t border-line pt-3 font-sans text-[13px] font-medium text-muted">
          <span>Skyroot</span>
          <span>18 July 2026</span>
        </div>
      </div>
    </section>
  )
}
