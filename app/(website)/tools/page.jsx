
import EmailSend from '@/components/landingPage/EmailSend'
import Hero from '@/components/tools/Hero'
import Minimize from '@/components/tools/Minimize'
import Tools from '@/components/tools/Tools'
import React from 'react'

const Page = () => {
    return (
        <div>
            <Hero/>
            <Tools/>
            <EmailSend/>
            <Minimize/>
        </div>
    )
}

export default Page
