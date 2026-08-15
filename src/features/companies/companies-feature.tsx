'use client'

import { useEffect, useState } from 'react'
import type { Company } from './data-access/companies'
import { CompanyDossier } from './ui/companies-ui-dossier'
import { CompanyIndex } from './ui/companies-ui-index'

type CompaniesFeatureProps = {
  companies: Company[]
}

export function CompaniesFeature({ companies }: CompaniesFeatureProps) {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)

  useEffect(() => {
    document.body.style.overflow = selectedCompany ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedCompany])

  return (
    <>
      <CompanyIndex companies={companies} openDossier={setSelectedCompany} />
      {selectedCompany && (
        <CompanyDossier company={selectedCompany} closeDossier={() => setSelectedCompany(null)} />
      )}
    </>
  )
}
