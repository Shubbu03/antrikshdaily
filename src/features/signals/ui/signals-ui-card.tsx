import { ArrowSquareOutIcon, BookmarkIcon } from "@phosphor-icons/react";
import type { Story } from "../data-access/stories";

type SignalsCardProps = {
	story: Story;
	index: number;
	saved: boolean;
	toggleSaved: (id: string) => void;
};

export function SignalsCard({
	story,
	index,
	saved,
	toggleSaved,
}: SignalsCardProps) {
	return (
		<article
			className="relative flex min-h-107.5 flex-col overflow-hidden border-r border-b border-line p-6 transition-colors duration-300 hover:bg-paper/70 before:absolute before:top-0 before:right-full before:left-0 before:h-0.75 before:bg-(--story-accent) before:transition-[right] before:duration-350 hover:before:right-0 lg:min-h-115"
			style={{ "--story-accent": story.accent } as React.CSSProperties}
		>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<span className="font-sans text-xs font-medium text-muted">
						{String(index + 1).padStart(2, "0")}
					</span>
					<span className="border border-line px-1.75 py-1.25 font-sans text-xs font-medium">
						{story.category}
					</span>
				</div>
				<button
					className={`grid size-8.5 place-items-center border-0 bg-transparent ${saved ? "text-signal" : "text-muted"}`}
					onClick={() => toggleSaved(story.id)}
					aria-label={`${saved ? "Remove" : "Save"} ${story.title}`}
				>
					<BookmarkIcon size={17} weight={saved ? "fill" : "regular"} />
				</button>
			</div>
			<div className="mt-10.5 flex items-center gap-2 font-sans text-[13px] font-semibold">
				<span className="size-1.75 rounded-full bg-(--story-accent)" />
				{story.company}
			</div>
			<h3 className="mt-4.5 mb-4 font-serif text-[31px] leading-[1.05] font-normal tracking-[-0.02em]">
				{story.title}
			</h3>
			<p className="m-0 font-sans text-[15px] leading-[1.48] text-card">
				{story.summary}
			</p>
			<div className="mt-auto flex items-end gap-2.5 pt-6.25">
				<strong className="font-serif text-[35px] leading-none font-normal text-(--story-accent)">
					{story.metric}
				</strong>
				<span className="max-w-30 font-sans text-xs leading-tight font-medium">
					{story.metricLabel}
				</span>
			</div>
			<div className="mt-5.5 flex items-center justify-between border-t border-line pt-3.75 font-sans text-[13px] font-medium text-muted">
				<span>{story.date}</span>
				<a
					href={story.url}
					target="_blank"
					rel="noreferrer"
					className="flex items-center gap-1.25 text-ink no-underline"
				>
					{story.source} <ArrowSquareOutIcon size={13} />
				</a>
			</div>
		</article>
	);
}
