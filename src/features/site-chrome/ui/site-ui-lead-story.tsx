import Image from 'next/image'
import { ArrowUpRightIcon } from '@phosphor-icons/react'

export function LeadStory() {
  return (
    <section
      className="section-pad grid grid-cols-1 items-start gap-[clamp(30px,4vw,70px)] py-20 md:grid-cols-[50px_1fr_1fr] md:py-30 lg:grid-cols-[100px_minmax(400px,1.2fr)_minmax(380px,0.85fr)]"
      aria-labelledby="lead-story-title"
    >
      <div className="font-sans text-[13px] font-semibold text-signal md:justify-self-start md:rotate-180 md:[writing-mode:vertical-rl]">
        01 / Lead
      </div>
      <div className="group relative h-full min-h-85 overflow-hidden bg-photo after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(to_top,rgb(23_23_18/0.5),transparent_45%)] sm:min-h-112.5 lg:min-h-135">
        <Image
          src="/images/vikram-1.webp"
          alt="Skyroot's Vikram-1 rocket on the launch pad at Satish Dhawan Space Centre"
          fill
          loading="lazy"
          quality={70}
          sizes="(max-width: 820px) 100vw, 50vw"
          className="object-cover saturate-[.74] contrast-105 transition-transform duration-800 group-hover:scale-[1.025]"
        />
        <span className="absolute bottom-4 left-4.5 z-2 font-sans text-xs font-medium text-white">Image: ISRO / SDSC SHAR</span>
        <div className="absolute top-0 right-0 z-2 flex size-25 flex-col justify-between bg-sun p-4 font-sans text-[13px] leading-[1.35] font-medium sm:size-31.5">
          <span className="text-7 leading-none font-bold">First</span>
          Private orbital<br />launch
        </div>
      </div>
      <article className="pt-1.25 md:pt-8">
        <p className="font-sans text-[13px] font-medium text-muted">
          <span className="mr-2 bg-signal px-1.75 py-1.25 text-white">Launch</span>
          18 Jul 2026 · 4 min read
        </p>
        <h2 id="lead-story-title" className="mt-7 mb-6 font-serif text-[46px] leading-[0.98] font-normal tracking-[-0.035em] md:text-[clamp(43px,4.5vw,73px)]">
          Vikram-1 puts India’s private space industry <em className="font-normal text-signal">into orbit.</em>
        </h2>
        <p className="font-sans text-lg leading-[1.52] text-body">
          The maiden Mission Aagaman placed two satellites in low Earth orbit on the first attempt. It is the clearest proof yet that India’s private launch industry has moved from promise to flight.
        </p>
        <div className="my-8.5 grid grid-cols-3 border-y border-line py-5">
          <div className="flex flex-col items-start gap-2.5 border-r border-line px-2 md:flex-row md:items-end md:px-3 md:pl-0">
            <strong className="font-serif text-[25px] leading-none font-normal md:text-[30px]">04</strong>
            <span className="font-sans text-xs leading-[1.3] font-medium">Stage<br />vehicle</span>
          </div>
          <div className="flex flex-col items-start gap-2.5 border-r border-line px-2 md:flex-row md:items-end md:px-3">
            <strong className="font-serif text-[25px] leading-none font-normal md:text-[30px]">02</strong>
            <span className="font-sans text-xs leading-[1.3] font-medium">Satellites<br />deployed</span>
          </div>
          <div className="flex flex-col items-start gap-2.5 px-2 md:flex-row md:items-end md:px-3">
            <strong className="font-serif text-[25px] leading-none font-normal md:text-[30px]">350</strong>
            <span className="font-sans text-xs leading-[1.3] font-medium">kg to<br />LEO</span>
          </div>
        </div>
        <a
          className="inline-flex items-center gap-2.5 border-b border-current pb-1.5 font-sans text-sm font-semibold no-underline"
          href="https://www.isro.gov.in/First_private_orbital_launch_lifts_from_Sriharikota.html"
          target="_blank"
          rel="noreferrer"
        >
          Read the official ISRO release <ArrowUpRightIcon size={17} />
        </a>
      </article>
    </section>
  )
}
