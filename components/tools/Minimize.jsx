import React from 'react'
import MaxContainer from '../shared/Layout/MaxContainer'

const Minimize = () => {
    return (
        <div className='flex justify-center bg-white sm:py-20 py-8' >
            <MaxContainer>
                <div className='flex flex-col items-center justify-center  md:gap-6 gap-2 sm:w-[80%] w-[90%] sm:px-0 px-2'>
                    <h1 className='font-bold text-center xl:text-5xl lg:text-4xl sm:text-3xl text-2xl'>Minimize Risk, Maximize Awareness</h1>
                    <div className="bg-[#FF876C12] sm:h-[50vh] py-8 my-8 flex flex-col items-center justify-center" >
                        <div className='flex flex-col xl:w-[65%] sm:w-[75%] w-[90%] items-center justify-center gap-3'>
                            <p className='text-center lg:text-xl md:text-lg'>A cyberattack happens every 39 seconds, you could be the next victim.
                                Learn how to protect yourself and your family members now before it&apos;s too late.</p>
                            <p className='text-orangeMain text-center lg:text-2xl md:text-xl text-lg'>Security is not a product, but a process. — Bruce Schneier</p>
                        </div>
                    </div>
                </div>
            </MaxContainer>
        </div>
    )
}

export default Minimize
