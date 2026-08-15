'use client'

import { useState } from 'react'
import { ListIcon, MagnifyingGlassIcon, XIcon } from '@phosphor-icons/react'
import { scrollToId } from '../../../lib/scroll-to'
import { SiteBrand } from './site-ui-brand'

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  const go = (id: string) => {
    scrollToId(id)
    setMenuOpen(false)
  }

  const focusSearch = () => {
    go('signals')
    window.setTimeout(() => document.getElementById('story-search')?.focus(), 500)
  }

  return (
    <header className="relative z-40 grid min-h-18 grid-cols-[1fr_auto] items-center border-b border-line bg-paper/94 px-[clamp(20px,3.5vw,56px)] backdrop-blur-[18px] md:min-h-21 md:grid-cols-[1fr_auto_1fr]">
      <SiteBrand onClick={() => go('top')} />

      <nav
        className={`${menuOpen ? 'flex' : 'hidden'} absolute inset-x-0 top-18 flex-col items-stretch gap-0 border-b border-line bg-paper p-5 md:static md:flex md:flex-row md:items-center md:gap-[clamp(20px,3vw,48px)] md:border-0 md:bg-transparent md:p-0`}
        aria-label="Primary navigation"
      >
        {(['signals', 'companies', 'trajectory'] as const).map((id, index) => (
          <button
            key={id}
            onClick={() => go(id)}
            className="relative border-b border-line bg-transparent py-4 text-left font-sans text-[15px] font-medium md:border-0 md:py-2 md:text-center after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-signal after:transition-[width] after:duration-200 hover:after:w-full"
          >
            {['News', 'Companies', 'Timeline'][index]}
          </button>
        ))}
      </nav>

      <div className="flex items-center justify-end gap-4">
        <button
          className="hidden size-9.5 place-items-center border border-line bg-transparent transition duration-200 hover:bg-ink hover:text-paper md:grid"
          onClick={focusSearch}
          aria-label="Search stories"
        >
          <MagnifyingGlassIcon size={18} />
        </button>
        <button
          className="grid size-9.5 place-items-center border border-line bg-transparent transition duration-200 hover:bg-ink hover:text-paper md:hidden"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <XIcon size={20} /> : <ListIcon size={20} />}
        </button>
      </div>
    </header>
  )
}
