import { useState } from 'react'
import { HeroSection } from './sections/HeroSection'
import { MetricsSection } from './sections/MetricsSection'
import { ExperienceSection } from './sections/ExperienceSection'
import { AdvantagesSection } from './sections/AdvantagesSection'
import { MethodsSection } from './sections/MethodsSection'
import { FooterSection } from './sections/FooterSection'

export default function App() {
  const [entranceComplete, setEntranceComplete] = useState(false)

  return (
    <main style={{ fontFamily: '"Microsoft YaHei", "PingFang SC", sans-serif' }}>
      <HeroSection entranceComplete={entranceComplete} onEntrance={setEntranceComplete} />
      <MetricsSection />
      <ExperienceSection />
      <AdvantagesSection />
      <MethodsSection />
      <FooterSection />
    </main>
  )
}
