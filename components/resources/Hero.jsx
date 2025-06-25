import React from 'react'
import banner from '@/public/assets/images/resourcesBanner.png'
import Image from 'next/image'
import MaxContainer from '@/components/shared/Layout/MaxContainer';

const Hero = () => {
    return (
        <div>
            <div className='flex justify-center bg-[#F1F4E0] sm:py-20 py-8' >
                <MaxContainer>
                    <div className='flex justify-center items-center gap-6 w-[80%] sm:px-0 px-2'>
                        <div className='md:w-[58%] w-full sm:space-y-5 space-y-3' >
                            <div className='flex flex-col sm:items-start items-center gap-1'>
                                <h1 className='lg:text-2xl md:text-xl text-lg font-semibold sm:text-start w-full text-center'>Cybersecurity Resources</h1>
                                <h1 className='xl:text-5xl xl:leading-[66px] lg:text-4xl md:text-3xl sm:text-2xl text-xl sm:text-start text-center font-semibold xl:mt-4 mt-2'>Welcome to Our <span className='font-bold'>Cybersecurity</span> Resources </h1>
                                {/* <h1 className='xl:text-[60px] lg:text-5xl md:text-4xl sm:text-3xl text-2xl '><span className='font-bold'>Cybersecurity</span> Resources  </h1> */}
                            </div>
                            <p className='text-gray lg:text-lg md:text-base sm:text-sm text-xs w-full sm:text-start text-center'>
                                Equip yourself with the latest tools, guides, and insights to enhance your cybersecurity
                                knowledge and practices. Whether you&apos;re looking to secure your personal accounts or
                                protect your organization, our resources are designed to help you stay safe in the digital world.
                            </p>
                        </div>
                        <div className='w-[42%] md:flex  justify-center hidden' >
                            <div className='w-full h-full  flex  justify-center' >
                                <Image alt='' src={banner} unoptimized />
                            </div>
                        </div>
                    </div>
                </MaxContainer>
            </div>
        </div>
    )
}

export default Hero
