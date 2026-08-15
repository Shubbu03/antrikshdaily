export type Company = {
	id: string;
	name: string;
	city: string;
	focus: string;
	stage: string;
	founded: string;
	summary: string;
	building: string[];
	win: string;
	url: string;
	accent: string;
	initials: string;
	xHandle: string | null;
};

export function companyAccountLabel(company: Company) {
	return company.xHandle
		? `@${company.xHandle}`
		: `@${company.name.replace(/\s+/g, "")}`;
}

export function companyAccountHref(company: Company) {
	return company.xHandle ? `https://x.com/${company.xHandle}` : company.url;
}

export const companies: Company[] = [
	{
		id: "skyroot",
		name: "Skyroot Aerospace",
		city: "Hyderabad",
		focus: "Launch vehicles",
		stage: "Orbital",
		founded: "2018",
		summary:
			"Building a family of on-demand small-satellite launch vehicles with carbon-composite structures and 3D-printed engines.",
		building: ["Vikram-I", "Vikram-II", "Raman engine"],
		win: "Reached low Earth orbit on Vikram-1’s first flight in July 2026.",
		url: "https://www.skyroot.in/",
		accent: "#e94b2c",
		initials: "SK",
		xHandle: "SkyrootA",
	},
	{
		id: "pixxel",
		name: "Pixxel",
		city: "Bengaluru",
		focus: "Earth observation",
		stage: "Commercial",
		founded: "2019",
		summary:
			"Operating hyperspectral satellites and the Aurora platform to reveal environmental and industrial signals invisible to conventional imagery.",
		building: ["Firefly", "Honeybee", "Aurora"],
		win: "Completed phase one of the six-satellite Firefly constellation.",
		url: "https://www.pixxel.space/",
		accent: "#7e5bef",
		initials: "PX",
		xHandle: "PixxelSpace",
	},
	{
		id: "agnikul",
		name: "Agnikul Cosmos",
		city: "Chennai",
		focus: "Launch vehicles",
		stage: "Flight-proven",
		founded: "2017",
		summary:
			"Developing customizable small-satellite launch vehicles powered by semi-cryogenic, single-piece 3D-printed engines.",
		building: ["Agnibaan", "Agnilet", "Launchpad-01"],
		win: "Flew the world’s first single-piece 3D-printed rocket engine.",
		url: "https://www.agnikul.in/",
		accent: "#b44c43",
		initials: "AG",
		xHandle: "AgnikulCosmos",
	},
	{
		id: "bellatrix",
		name: "Bellatrix Aerospace",
		city: "Bengaluru",
		focus: "In-space mobility",
		stage: "Scaling",
		founded: "2015",
		summary:
			"Designing electric and green propulsion systems plus an orbital transfer vehicle for satellites across multiple orbit classes.",
		building: ["Arka", "Rudra", "Pushpak"],
		win: "Raised $20M to expand propulsion manufacturing in March 2026.",
		url: "https://bellatrix.aero/",
		accent: "#d49422",
		initials: "BX",
		xHandle: "bellatrixaero",
	},
	{
		id: "dhruva",
		name: "Dhruva Space",
		city: "Hyderabad",
		focus: "Full-stack space",
		stage: "Commercial",
		founded: "2012",
		summary:
			"Providing spacecraft platforms, launch integration and ground infrastructure as one integrated space-engineering stack.",
		building: ["P-30 platform", "Project Garud", "AstraView"],
		win: "Secured ₹105 crore in RDIF backing for a 500 kg-class platform.",
		url: "https://www.dhruvaspace.com/",
		accent: "#2a6f97",
		initials: "DS",
		xHandle: "DhruvaSpace",
	},
	{
		id: "galaxeye",
		name: "GalaxEye",
		city: "Bengaluru",
		focus: "Earth observation",
		stage: "Pre-launch",
		founded: "2021",
		summary:
			"Combining radar and optical sensors on one satellite for aligned, analysis-ready imagery in darkness and cloud cover.",
		building: ["Mission Drishti", "OptoSAR", "Data platform"],
		win: "Built India’s largest privately developed satellite for Mission Drishti.",
		url: "https://galaxeye.space/",
		accent: "#337357",
		initials: "GX",
		xHandle: "GalaxEye",
	},
	{
		id: "manastu",
		name: "Manastu Space",
		city: "Mumbai",
		focus: "Green propulsion",
		stage: "Flight-proven",
		founded: "2017",
		summary:
			"Building hydrogen-peroxide green thrusters and in-space refuelling kit so satellites can manoeuvre without hydrazine.",
		building: ["MS289 propellant", "Vyom 2U", "GP-LAM"],
		win: "Flew the Vyom 2U thruster and supplied green propulsion for a re-entry demonstration.",
		url: "https://manastuspace.com/",
		accent: "#2f9e6b",
		initials: "MS",
		xHandle: "ManastuSpace",
	},
	{
		id: "aadyah",
		name: "Aadyah Aerospace",
		city: "Bengaluru",
		focus: "Launch subsystems",
		stage: "Scaling",
		founded: "2016",
		summary:
			"Designing propulsion, avionics, and guidance hardware that other launch vehicles and spacecraft depend on.",
		building: ["Propulsion stacks", "Avionics", "Guidance and navigation"],
		win: "Raised a $3.3M Series A in 2026 to expand production and a US presence.",
		url: "https://aadyah.com/",
		accent: "#4a6fa5",
		initials: "AA",
		xHandle: "AadyahAerospace",
	},
	{
		id: "azista",
		name: "Azista BST Aerospace",
		city: "Ahmedabad",
		focus: "Satellite manufacturing",
		stage: "Commercial",
		founded: "2019",
		summary:
			"An Indo-German joint venture running a factory for 50–200 kg small-satellite buses at a rate of two vehicles a week.",
		building: ["ABLean line", "Modular buses", "AFR-1"],
		win: "Rolled out AFR-1 from its Ahmedabad plant and launched it on SpaceX in 2023.",
		url: "https://www.azistabst.com/",
		accent: "#c45c26",
		initials: "AZ",
		xHandle: "AzistaAerospace",
	},
	{
		id: "xdlinx",
		name: "XDLINX Space Labs",
		city: "Hyderabad",
		focus: "Small satellites",
		stage: "Flight-proven",
		founded: "2022",
		summary:
			"Building software-defined nano and micro satellites for defence and commercial hosted-payload missions.",
		building: ["Janus-1", "XDSAT M600", "Hosted payloads"],
		win: "Flew Janus-1, a 6U satellite built in ten months, in February 2023.",
		url: "https://xdlinx.space/",
		accent: "#1a8a9d",
		initials: "XL",
		xHandle: "XdlinxSpaceLabs",
	},
	{
		id: "digantara",
		name: "Digantara",
		city: "Bengaluru",
		focus: "Space surveillance",
		stage: "Scaling",
		founded: "2020",
		summary:
			"Building space-based sensors and a tracking network so operators can see objects and threats in orbit.",
		building: ["SCOT", "Space Watch", "Command centre"],
		win: "Raised $50M in late 2025 to expand space-based surveillance and missile-defence sensing.",
		url: "https://www.digantara.co.in/",
		accent: "#5c4d7a",
		initials: "DG",
		xHandle: "Digantarahq",
	},
	{
		id: "satsure",
		name: "SatSure",
		city: "Bengaluru",
		focus: "Earth analytics",
		stage: "Commercial",
		founded: "2017",
		summary:
			"Turning satellite and aerial imagery into decisions for agriculture, banking, infrastructure, and climate risk.",
		building: ["SatSure Sprout", "Credit models", "EO models"],
		win: "Won a ₹24.6 crore IN-SPACe grant in 2026 to build India-specific Earth observation models.",
		url: "https://www.satsure.co/",
		accent: "#3d8b5a",
		initials: "SS",
		xHandle: "sat_sure",
	},
	{
		id: "skyserve",
		name: "SkyServe",
		city: "Bengaluru",
		focus: "Onboard computing",
		stage: "Flight-proven",
		founded: "2020",
		summary:
			"Putting AI and edge computers on satellites so insights come down instead of raw imagery.",
		building: ["STORM", "Onboard models", "Hosted compute"],
		win: "Ran JPL models on STORM aboard a D-Orbit carrier in low Earth orbit.",
		url: "https://www.skyserve.ai/",
		accent: "#c9a227",
		initials: "SV",
		xHandle: "SkyServe_AI",
	},
	{
		id: "piersight",
		name: "PierSight",
		city: "Ahmedabad",
		focus: "Maritime observation",
		stage: "Pre-launch",
		founded: "2023",
		summary:
			"Combining SAR and AIS on one constellation for all-weather, persistent ocean surveillance.",
		building: ["SAR satellites", "AIS payloads", "Ocean intelligence"],
		win: "Selected by IN-SPACe, with Pixxel, Dhruva and SatSure, for India’s first PPP Earth observation constellation.",
		url: "https://piersight.space/",
		accent: "#1d6a8a",
		initials: "PS",
		xHandle: "piersightspace",
	},
	{
		id: "orbitaid",
		name: "OrbitAID Aerospace",
		city: "Chennai",
		focus: "On-orbit servicing",
		stage: "Flight-proven",
		founded: "2021",
		summary:
			"Developing docking ports and refuelling hardware so satellites can be topped up and serviced in orbit.",
		building: ["SIDRP", "Zero-G missions", "Servicing stack"],
		win: "Demonstrated docking and propellant transfer on Zero-G1 in November 2024.",
		url: "https://www.orbitaid.com/",
		accent: "#8b3d5a",
		initials: "OA",
		xHandle: "OrbitAID",
	},
	{
		id: "serendipity",
		name: "Serendipity Space",
		city: "Bhubaneswar",
		focus: "Space manufacturing",
		stage: "Flight-proven",
		founded: "2024",
		summary:
			"Building reusable satellites that make pharmaceuticals in microgravity and bring the product back to Earth.",
		building: ["Alchemy", "Reusable satellites", "Re-entry payloads"],
		win: "Tested Alchemy, an autonomous pharma factory, on a near-space flight and recovered the prototype.",
		url: "https://www.serendipityspace.in/",
		accent: "#6b4c9a",
		initials: "SE",
		xHandle: "serendipityind",
	},
];
