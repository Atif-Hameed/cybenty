
import EmailSend from '@/components/landingPage/EmailSend'
import CyberAttack from '@/components/leak-check/CyberAttack'
import Hero from '@/components/leak-check/Hero'
import HowWork from '@/components/leak-check/HowWork'
import React from 'react'

const Page = () => {
    return (
        <div>
            <Hero />
            <HowWork />
            <EmailSend />
            <CyberAttack />
        </div>
    )
}

export default Page
