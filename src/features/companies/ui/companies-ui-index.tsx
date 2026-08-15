'use client'

import { useState } from 'react'
import { ArrowUpRightIcon, CaretLeftIcon, CaretRightIcon, ShieldCheckIcon } from '@phosphor-icons/react'
import type { Company } from '../data-access/companies'

const PAGE_SIZE = 6

type CompanyIndexProps = {
  companies: Company[]
  openDossier: (company: Company) => void
}

export function CompanyIndex({ companies, openDossier }: CompanyIndexProps) {
  const [page, setPage] = useState(0)
  const pageCount = Math.max(1, Math.ceil(companies.length / PAGE_SIZE))
  const start = page * PAGE_SIZE
  const visible = companies.slice(start, start + PAGE_SIZE)
  const rangeStart = companies.length === 0 ? 0 : start + 1
  const rangeEnd = start + visible.length

  return (
    <section
      id="companies"
      className="section-pad bg-night pt-27.5 pb-22.5 text-paper"
      aria-labelledby="companies-title"
    >
      <div className="mb-13 grid grid-cols-1 items-end gap-7.5 md:grid-cols-[1fr_360px]">
        <div>
          <p className="font-sans text-[13px] font-semibold text-sun">
            03 / Companies
          </p>
          <h2
            id="companies-title"
            className="mt-3.5 mb-0 font-serif text-[clamp(54px,5.5vw,88px)] leading-[0.92] font-normal tracking-[-0.04em]"
          >
            Meet the builders.
          </h2>
        </div>
        <p className="m-0 max-w-110 font-sans text-[17px] leading-[1.45] text-paper/58 md:max-w-none">
          Launch, satellites, sensors and propulsion—the emerging stack is
          broader than any single mission.
        </p>
      </div>

      <div className="border-t border-paper/18">
        {visible.map((company, index) => (
          <button
            className="grid min-h-25.75 w-full grid-cols-[28px_44px_1fr_26px] items-center gap-3 border-0 border-b border-paper/18 bg-transparent py-3.75 text-left text-inherit transition-[padding,background] duration-200 hover:bg-paper/5 hover:pl-1.25 sm:grid-cols-[35px_52px_1fr_32px] sm:gap-5 md:grid-cols-[48px_54px_minmax(240px,1.5fr)_1fr_0.7fr_40px] md:hover:pr-3 md:hover:pl-4.5"
            key={company.id}
            onClick={() => openDossier(company)}
          >
            <span className="font-mono text-[8px] font-medium text-paper/38">
              {String(start + index + 1).padStart(2, '0')}
            </span>
            <span
              className="grid size-10 place-items-center rounded-full font-mono text-[10px] font-semibold text-white sm:size-11.5"
              style={{ background: company.accent }}
            >
              {company.initials}
            </span>
            <span className="grid">
              <strong className="font-serif text-[22px] leading-[1.1] font-normal md:text-[27px]">
                {company.name}
              </strong>
              <small className="mt-1.5 font-sans text-xs font-medium text-paper/45">
                {company.city} · Est. {company.founded}
              </small>
            </span>
            <span className="hidden font-sans text-sm font-medium text-paper/68 md:block">
              {company.focus}
            </span>
            <span className="hidden items-center gap-2 font-sans text-[13px] font-medium md:flex">
              <i className="inline-block size-1.75 rounded-full bg-live shadow-[0_0_0_4px_rgb(85_168_117/0.12)]" />
              {company.stage}
            </span>
            <span className="grid place-items-center text-paper/45">
              <ArrowUpRightIcon size={20} />
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="m-0 font-sans text-[13px] text-paper/45">
          {rangeStart}–{rangeEnd} of {companies.length}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 border border-paper/25 bg-transparent px-3 py-2 font-sans text-sm font-medium text-paper disabled:cursor-not-allowed disabled:opacity-35"
            onClick={() => setPage((current) => Math.max(0, current - 1))}
            disabled={page === 0}
          >
            <CaretLeftIcon size={16} />
            Previous
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 border border-paper/25 bg-transparent px-3 py-2 font-sans text-sm font-medium text-paper disabled:cursor-not-allowed disabled:opacity-35"
            onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))}
            disabled={page >= pageCount - 1}
          >
            Next
            <CaretRightIcon size={16} />
          </button>
        </div>
      </div>

      <p className="mt-5 mb-0 flex items-center gap-2 font-sans text-[13px] text-paper/38">
        <ShieldCheckIcon size={15} /> Profiles are built from company-published
        information and primary-source announcements.
      </p>
    </section>
  )
}
