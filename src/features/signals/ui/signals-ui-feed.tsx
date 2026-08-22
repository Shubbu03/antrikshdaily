import { useMemo, useState } from "react";
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import { categories, type Category, type Story } from "../data-access/stories";
import { SignalsCard } from "./signals-ui-card";

type SignalsFeedProps = {
	stories: Story[];
	saved: string[];
	toggleSaved: (id: string) => void;
};

export function SignalsFeed({ stories, saved, toggleSaved }: SignalsFeedProps) {
	const [category, setCategory] = useState<Category>("All");
	const [query, setQuery] = useState("");

	const filteredStories = useMemo(() => {
		const normalized = query.trim().toLowerCase();
		return stories.filter((story) => {
			const matchesCategory = category === "All" || story.category === category;
			const matchesQuery =
				!normalized ||
				`${story.title} ${story.company} ${story.summary}`
					.toLowerCase()
					.includes(normalized);
			return matchesCategory && matchesQuery;
		});
	}, [stories, category, query]);

	return (
		<section
			id="signals"
			className="section-pad border-t border-line bg-paper-dim pt-27.5 pb-30"
			aria-labelledby="signals-title"
		>
			<div className="mb-13 grid grid-cols-1 items-end gap-7.5 md:grid-cols-[1fr_360px]">
				<div>
					<p className="font-sans text-[13px] font-semibold text-signal">
						02 / News
					</p>
					<h2
						id="signals-title"
						className="mt-3.5 mb-0 font-serif text-[clamp(54px,5.5vw,88px)] leading-[0.92] font-normal tracking-[-0.04em]"
					>
						Latest news
					</h2>
				</div>
				<p className="m-0 max-w-110 font-sans text-[17px] leading-[1.45] text-heading md:max-w-none">
					Stories from the companies — and the policy room — building India’s private space industry.
				</p>
			</div>

			<div className="mb-7.5 flex flex-col items-stretch justify-between gap-7.5 border-y border-line py-3.25 md:flex-row md:items-center">
				<div
					className="flex flex-nowrap gap-1.5 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible md:pb-0"
					role="tablist"
					aria-label="Filter stories by category"
				>
					{categories.map((item) => (
						<button
							key={item}
							className={`cursor-pointer border px-3 py-2.25 font-sans text-sm font-medium whitespace-nowrap ${category === item ? "border-ink bg-ink text-paper" : "border-transparent bg-transparent hover:border-line"}`}
							onClick={() => setCategory(item)}
							role="tab"
							aria-selected={category === item}
						>
							{item}
						</button>
					))}
				</div>
				<label className="flex min-h-9 w-full items-center gap-2 border-b border-ink md:w-57.5">
					<MagnifyingGlassIcon size={16} />
					<span className="sr-only">Search stories</span>
					<input
						id="story-search"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Search news..."
						className="min-w-0 flex-1 border-0 bg-transparent font-sans text-sm font-medium outline-none placeholder:text-[#777365]"
					/>
					{query && (
						<button
							onClick={() => setQuery("")}
							aria-label="Clear search"
							className="grid border-0 bg-transparent p-1.25"
						>
							<XIcon size={14} />
						</button>
					)}
				</label>
			</div>

			<div className="grid grid-cols-1 border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
				{filteredStories.map((story, index) => (
					<SignalsCard
						key={story.id}
						story={story}
						index={index}
						saved={saved.includes(story.id)}
						toggleSaved={toggleSaved}
					/>
				))}
				{filteredStories.length === 0 && (
					<div className="col-span-full grid min-h-82.5 place-items-center content-center gap-2.5 border-r border-b border-line text-center">
						<MagnifyingGlassIcon size={25} />
						<h3 className="mt-1 mb-0 font-serif text-[34px] font-normal">
							No stories found
						</h3>
						<p className="mb-2.5 font-sans text-[15px] text-muted">
							Try another company or clear the current filter.
						</p>
						<button
							className="cursor-pointer border border-ink bg-transparent px-3.25 py-2.25 font-sans text-sm font-semibold"
							onClick={() => {
								setQuery("");
								setCategory("All");
							}}
						>
							Clear filters
						</button>
					</div>
				)}
			</div>
		</section>
	);
}
