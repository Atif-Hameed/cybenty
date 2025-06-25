import GetStarted from '@/components/faq/GetStarted'
import Hero from '@/components/faq/Hero'
import QuestionsAnswers from '@/components/faq/QuestionsAnswers'
import Upgrade from '@/components/faq/Upgrade'
import React from 'react'

const page = () => {
  return (
    <div>
      <Hero/>
      <QuestionsAnswers/>
      <GetStarted/>
      <Upgrade/>
    </div>
  )
}

export default page
