
import Defender from '@/components/defender-toolbox/Defender'
import Hero from '@/components/defender-toolbox/Hero'
import Resource from '@/components/resources/Resource'
import React from 'react'

const Page = () => {
    return (
        <div>
            <Hero />
            <Defender/>
            <Resource detail={'hide'}/>
        </div>
    )
}

export default Page
