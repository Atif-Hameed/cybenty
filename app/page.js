
import Approach from '@/components/landingPage/Approach'
import BestDefence from '@/components/landingPage/BestDefence'
import Challenges from '@/components/landingPage/Challenges'
import EmailSend from '@/components/landingPage/EmailSend'
import EverythingNeed from '@/components/landingPage/EverythingNeed'
import Feature from '@/components/landingPage/Feature'
import GetRegister from '@/components/landingPage/GetRegister'
import Hero from '@/components/landingPage/Hero'
import OurCourses from '@/components/landingPage/OurCourses'
import Testimonial from '@/components/landingPage/Testimonial'
import Training from '@/components/landingPage/Training'
import WhyInturity from '@/components/landingPage/WhyInturity'
import CookieConsentBanner from '@/components/shared/CookieConsentBanner'
import Footer from '@/components/shared/Layout/Footer'
import Navbar from '@/components/shared/Layout/Navbar'
import React from 'react'


const Page = () => {
  return (
    <div className='overflow-hidden '>
      <div className="fixed w-full top-0  z-30">
        <Navbar />
      </div>
      <div className='pt-16'>
      <Hero />
      </div>
      <EverythingNeed />
      <EmailSend />
      <Challenges />
      <Approach />
      <GetRegister />
      <WhyInturity />
      <Training />
      <OurCourses />
      <BestDefence />
      <Testimonial />
      <Feature />
      <Footer />
      <CookieConsentBanner />
      {/* <CookieConsentBannerNew /> */}
    </div>
  )
}

export default Page
