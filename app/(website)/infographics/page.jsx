

import Awareness from '@/components/infographics/Awareness'
import Hero from '@/components/infographics/Hero'
import Resource from '@/components/resources/Resource'
import React from 'react'

const Page = () => {
    return (
        <div>
            <Hero />
            <Awareness/>
            <Resource detail={'hide'}/>
        </div>
    )
}

export default Page
