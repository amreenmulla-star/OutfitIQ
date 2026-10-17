import { useEffect } from 'react'
import { Hero } from '../components/home/Hero'
import { ProblemSolution } from '../components/home/ProblemSolution'
import { Features } from '../components/home/Features'
import { HowItWorksPreview } from '../components/home/HowItWorks'
import { OutfitPreview } from '../components/home/OutfitPreview'
import { Benefits } from '../components/home/Benefits'
import { EarlyAccess } from '../components/home/EarlyAccess'
import { FAQ } from '../components/home/FAQ'

export function HomePage() {
  useEffect(() => {
    document.title = 'OutfitIQ — Your Wardrobe. Reimagined.'
  }, [])

  return (
    <>
      <Hero />
      <ProblemSolution />
      <Features />
      <HowItWorksPreview />
      <OutfitPreview />
      <Benefits />
      <EarlyAccess />
      <FAQ />
    </>
  )
}
