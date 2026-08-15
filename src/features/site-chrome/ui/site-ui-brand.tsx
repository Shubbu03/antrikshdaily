type SiteBrandProps = {
	className?: string;
	onClick?: () => void;
};

function BrandMark() {
	return (
		<svg
			className="block size-8.5 shrink-0"
			viewBox="0 0 34 34"
			aria-hidden="true"
		>
			<circle
				cx="17"
				cy="17"
				r="16"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<circle cx="17" cy="17" r="5.5" fill="currentColor" />
			<circle cx="29.26" cy="6.72" r="2.5" fill="#e94b2c" />
		</svg>
	);
}

export function SiteBrand({ className, onClick }: SiteBrandProps) {
	const classes = `inline-flex w-fit cursor-pointer items-center gap-3 border-0 bg-transparent p-0 text-left ${className ?? ""}`;
	const mark = (
		<>
			<BrandMark />
			<span className="grid leading-none">
				<strong className="font-sans text-lg font-bold tracking-[0.08em] sm:text-[18px]">
					ANTRIKSH
				</strong>
				<small className="mt-1.25 font-mono text-[9px] font-medium tracking-[0.04em]">
					अंतरिक्ष Daily
				</small>
			</span>
		</>
	);

	if (onClick) {
		return (
			<button
				className={classes}
				onClick={onClick}
				aria-label="Antriksh Daily home"
			>
				{mark}
			</button>
		);
	}

	return <div className={classes}>{mark}</div>;
}
