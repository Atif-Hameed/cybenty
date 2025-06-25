import Testimonial from '@/components/landingPage/Testimonial'
import CyberAttack from '@/components/resources/CyberAttack'
import Hero from '@/components/resources/Hero'
import Resource from '@/components/resources/Resource'
import React from 'react'

const page = () => {
  return (
    <div>
      <Hero/>
      <Resource/>
      <Testimonial/>
      <CyberAttack/>
    </div>
  )
}

export default page
