'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'antriksh-saved'

export function useSavedStories() {
  const [saved, setSaved] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as string[]
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
  }, [saved])

  const toggleSaved = (id: string) => {
    setSaved((current) => (
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    ))
  }

  return { saved, toggleSaved }
}
