import Resource from '@/components/resources/Resource'
import Cards from '@/components/tips-tricks/Cards'
import Hero from '@/components/tips-tricks/Hero'
import React from 'react'

const Page = () => {
  return (
    <div>
      <Hero/>
      <Cards/>
      <Resource detail={'hide'}/>
    </div>
  )
}

export default Page
