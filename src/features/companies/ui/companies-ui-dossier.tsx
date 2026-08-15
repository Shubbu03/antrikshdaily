import { ArrowUpRightIcon, XIcon } from "@phosphor-icons/react";
import {
	companyAccountHref,
	companyAccountLabel,
	type Company,
} from "../data-access/companies";

type CompanyDossierProps = {
	company: Company;
	closeDossier: () => void;
};

export function CompanyDossier({ company, closeDossier }: CompanyDossierProps) {
	return (
		<div
			className="fixed inset-0 z-100 flex justify-end bg-[rgb(10_10_8/0.74)] backdrop-blur-[7px] animate-fade"
			role="presentation"
			onMouseDown={(event) => {
				if (event.currentTarget === event.target) closeDossier();
			}}
		>
			<aside
				className="relative h-full w-full max-w-132.5 overflow-y-auto bg-paper text-ink animate-slide-in"
				role="dialog"
				aria-modal="true"
				aria-labelledby="dossier-title"
			>
				<button
					className="absolute top-5.5 right-5.5 z-2 grid size-10 place-items-center border border-paper/34 bg-ink/25 text-paper"
					onClick={closeDossier}
					aria-label="Close company dossier"
				>
					<XIcon size={20} />
				</button>
				<div
					className="dossier-rings relative flex min-h-72.5 flex-col justify-end overflow-hidden bg-night p-7.5 text-paper md:min-h-85"
					style={{ "--company-accent": company.accent } as React.CSSProperties}
				>
					<span className="absolute top-8 left-7.5 font-sans text-[13px] font-medium">
						Company / {company.initials}
					</span>
					<span className="mb-5.5 grid size-15.5 place-items-center rounded-full bg-(--company-accent) font-mono text-[13px] font-semibold text-white">
						{company.initials}
					</span>
					<h2
						id="dossier-title"
						className="m-0 font-serif text-[44px] leading-none font-normal tracking-[-0.03em] md:text-[53px]"
					>
						{company.name}
					</h2>
					<a
						href={companyAccountHref(company)}
						target="_blank"
						rel="noreferrer"
						className="mt-2.5 inline-block font-sans text-[13px] font-medium text-paper/75 no-underline underline-offset-2 transition duration-200 hover:text-paper hover:underline"
					>
						{companyAccountLabel(company)}
					</a>
					<p className="mt-1 mb-0 font-sans text-[13px] font-medium text-paper/55">
						{company.city} · Est. {company.founded}
					</p>
				</div>
				<div className="px-7.5 pt-7 pb-12.5">
					<div className="flex items-center justify-between border-b border-line pb-4.25 font-sans text-[13px] font-medium">
						<span className="flex items-center gap-2">
							<i className="inline-block size-1.75 rounded-full bg-live shadow-[0_0_0_4px_rgb(85_168_117/0.12)]" />
							{company.stage}
						</span>
						<span>{company.focus}</span>
					</div>
					<p className="my-7.5 font-serif text-[23px] leading-[1.35] font-normal">
						{company.summary}
					</p>
					<div className="my-8">
						<small className="font-sans text-[13px] font-semibold text-signal">
							What they’re building
						</small>
						<div className="mt-3.25 flex flex-wrap gap-2">
							{company.building.map((item) => (
								<span
									key={item}
									className="border border-line px-2.75 py-2.25 font-sans text-[13px] font-medium"
								>
									{item}
								</span>
							))}
						</div>
					</div>
					<div className="my-8 bg-sun p-5">
						<small className="font-sans text-[13px] font-semibold text-ink">
							Recent win
						</small>
						<p className="mt-2.5 mb-0 font-sans text-[17px] leading-[1.35] font-semibold">
							{company.win}
						</p>
					</div>
					<a
						href={company.url}
						target="_blank"
						rel="noreferrer"
						className="inline-flex w-full items-center justify-center gap-3 bg-ink px-4.5 py-3.5 font-sans text-[15px] font-semibold text-paper no-underline transition duration-200 hover:-translate-y-0.5 hover:bg-signal"
					>
						Visit official site <ArrowUpRightIcon size={17} />
					</a>
				</div>
			</aside>
		</div>
	);
}
