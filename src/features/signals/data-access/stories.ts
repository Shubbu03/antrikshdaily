export type Category = 'All' | 'Launch' | 'Earth data' | 'Satellites' | 'Propulsion' | 'Capital'

export type Story = {
  id: string
  company: string
  category: Exclude<Category, 'All'>
  date: string
  title: string
  summary: string
  source: string
  url: string
  metric: string
  metricLabel: string
  accent: string
}

export const categories: Category[] = ['All', 'Launch', 'Earth data', 'Satellites', 'Propulsion', 'Capital']

export const stories: Story[] = [
  {
    id: 'skyroot-orbit',
    company: 'Skyroot Aerospace',
    category: 'Launch',
    date: '18 Jul 2026',
    title: 'Vikram-1 reaches orbit on its first attempt',
    summary: 'The four-stage launcher deployed SCOPE and Grahaa into low Earth orbit, making Skyroot the first private Indian company to launch successfully to orbit from Indian soil.',
    source: 'ISRO',
    url: 'https://www.isro.gov.in/First_private_orbital_launch_lifts_from_Sriharikota.html',
    metric: '1st',
    metricLabel: 'private Indian orbital launch',
    accent: '#e94b2c',
  },
  {
    id: 'dhruva-ascent',
    company: 'Dhruva Space',
    category: 'Satellites',
    date: '15 Jul 2026',
    title: 'Dhruva and MAHE establish the ASCENT space centre',
    summary: 'The planned centre will combine cleanroom facilities, spacecraft testing and student-led missions, with three CubeSat missions targeted by 2028.',
    source: 'Dhruva Space',
    url: 'https://www.dhruvaspace.com/press-releases/dhruva-space-and-manipal-academy-higher-education-to-co-develop-ascent-powering-india-next-generation-of-space-technologies-research-and-talent',
    metric: '03',
    metricLabel: 'CubeSat missions by 2028',
    accent: '#2a6f97',
  },
  {
    id: 'galaxeye-drishti',
    company: 'GalaxEye',
    category: 'Earth data',
    date: '07 Jul 2026',
    title: 'Mission Drishti combines optical and SAR on one satellite',
    summary: 'GalaxEye’s first satellite is designed to deliver co-located all-weather radar and multispectral imagery, removing the usual compromise between clarity and availability.',
    source: 'GalaxEye',
    url: 'https://galaxeye.space/',
    metric: '1.8m',
    metricLabel: 'planned fused resolution',
    accent: '#337357',
  },
  {
    id: 'pixxel-nro',
    company: 'Pixxel',
    category: 'Earth data',
    date: '05 May 2026',
    title: 'Pixxel wins a US NRO hyperspectral study contract',
    summary: 'The Strategic Commercial Enhancements award advances the use of commercial hyperspectral remote sensing capabilities for government missions.',
    source: 'Pixxel',
    url: 'https://www.pixxel.space/newsroom',
    metric: '135+',
    metricLabel: 'spectral bands on Firefly',
    accent: '#7e5bef',
  },
  {
    id: 'bellatrix-round',
    company: 'Bellatrix Aerospace',
    category: 'Capital',
    date: '28 Mar 2026',
    title: 'Bellatrix raises $20M to scale propulsion production',
    summary: 'The Pre-Series B round supports high-throughput manufacturing as the company moves its electric and green propulsion portfolio from flight-proven to factory-ready.',
    source: 'Bellatrix',
    url: 'https://bellatrix.aero/updates/bellatrix-aerospace-secures-20-million-in-pre-series-b',
    metric: '$20M',
    metricLabel: 'Pre-Series B round',
    accent: '#d49422',
  },
  {
    id: 'agnikul-sorted',
    company: 'Agnikul Cosmos',
    category: 'Propulsion',
    date: '30 May 2024',
    title: 'Agnibaan SOrTeD proves a single-piece printed engine in flight',
    summary: 'The controlled suborbital flight launched from India’s first private launchpad and demonstrated the country’s first semi-cryogenic engine flight.',
    source: 'Agnikul',
    url: 'https://www.agnikul.in/missions/',
    metric: '66s',
    metricLabel: 'powered flight',
    accent: '#b44c43',
  },
]
