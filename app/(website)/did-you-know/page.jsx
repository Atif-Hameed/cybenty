import Hero from '@/components/didYouKnow/Hero'
import YouKnow from '@/components/didYouKnow/YouKnow'
import Resource from '@/components/resources/Resource'
import React from 'react'

const Page = () => {
  return (
    <div>
      <Hero />
      <YouKnow />
      <Resource detail={'hide'}/>
    </div>
  )
}

export default Page
