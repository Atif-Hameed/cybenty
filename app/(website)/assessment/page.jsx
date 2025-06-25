import Hero from '@/components/assessment/Hero'
import HowWork from '@/components/assessment/HowWork'
import PlayAssessment from '@/components/assessment/play-assessment'
import Welcom from '@/components/assessment/Welcom'
import WhyTake from '@/components/assessment/WhyTake'
import Upgrade from '@/components/faq/Upgrade'
import React from 'react'

const Page = () => {
  return (
    <div>
      <Hero/>
      <Welcom/>
      <HowWork/>
      <WhyTake/>
      <PlayAssessment/>
      <Upgrade/>
    </div>
  )
}

export default Page
