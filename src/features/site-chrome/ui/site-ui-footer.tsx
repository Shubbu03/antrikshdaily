import { SiteBrand } from './site-ui-brand'

export function SiteFooter() {
  return (
    <footer className="section-pad relative grid min-h-45 grid-cols-1 items-center gap-7.5 bg-night py-10 text-paper sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]">
      <SiteBrand className="text-paper" />
      <p className="hidden font-sans text-[15px] text-paper/50 md:block">Coverage of India’s private space industry.</p>
      <div className="flex flex-wrap gap-5.5 max-sm:row-start-2">
        <a href="#signals" className="font-sans text-sm font-medium no-underline">News</a>
        <a href="#companies" className="font-sans text-sm font-medium no-underline">Companies</a>
        <a href="#trajectory" className="font-sans text-sm font-medium no-underline">Timeline</a>
      </div>
      <small className="col-span-full border-t border-paper/14 pt-4.5 font-sans text-[13px] text-paper/34">Curated in India · 2026</small>
    </footer>
  )
}
