import { milestones } from '../data-access/milestones'

export function Trajectory() {
  return (
    <section id="trajectory" className="section-pad pt-[120px] pb-[140px]" aria-labelledby="trajectory-title">
      <div className="mb-[90px] grid grid-cols-1 items-end gap-[30px] md:grid-cols-[100px_1fr_280px] lg:grid-cols-[150px_1fr_350px]">
        <p className="self-start font-sans text-[13px] font-semibold text-signal md:mt-2.5">04 / Timeline</p>
        <h2 id="trajectory-title" className="m-0 font-serif text-[clamp(54px,5.5vw,88px)] leading-[0.92] font-normal tracking-[-0.04em]">
          From supplier to <em className="font-normal text-signal">spacefaring.</em>
        </h2>
        <p className="m-0 max-w-[470px] font-sans text-[17px] leading-[1.5] text-muted lg:max-w-none">
          Six moments that trace how private Indian space moved from a handful of founders to flight-proven hardware.
        </p>
      </div>
      <div className="relative grid grid-cols-2 gap-x-3.5 gap-y-[60px] md:grid-cols-3 md:gap-x-0 md:gap-y-[70px] lg:grid-cols-6 lg:border-t lg:border-ink">
        {milestones.map((milestone, index) => (
          <div className="relative min-h-[240px] border-t border-ink pt-[38px] pr-2 md:pr-6 lg:border-t-0" key={milestone.year}>
            <span className="absolute top-[-8px] left-0 grid size-4 place-items-center rounded-full border border-ink bg-paper">
              <i className="size-1.5 rounded-full bg-signal" />
            </span>
            <span className="font-mono text-[8px] font-medium text-muted">T+{index}</span>
            <strong className="mt-[18px] mb-3 block font-serif text-[32px] leading-none font-normal md:text-[38px]">{milestone.year}</strong>
            <h3 className="mt-0 mb-2.5 font-sans text-[15px] leading-[1.15] font-semibold">{milestone.title}</h3>
            <p className="m-0 max-w-[165px] font-sans text-[13px] leading-[1.4] text-muted">{milestone.detail}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
