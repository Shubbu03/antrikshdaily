'use client'

import { useSavedStories } from './data-access/use-saved-stories'
import type { Story } from './data-access/stories'
import { SignalsFeed } from './ui/signals-ui-feed'

type SignalsFeatureProps = {
  stories: Story[]
}

export function SignalsFeature({ stories }: SignalsFeatureProps) {
  const { saved, toggleSaved } = useSavedStories()
  return <SignalsFeed stories={stories} saved={saved} toggleSaved={toggleSaved} />
}
