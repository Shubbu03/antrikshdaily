import { listCompanies, listStories } from '@/db/queries'
import { HomePage } from '@/features/home/home-page'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const [stories, companies] = await Promise.all([listStories(), listCompanies()])
  return <HomePage stories={stories} companies={companies} />
}
