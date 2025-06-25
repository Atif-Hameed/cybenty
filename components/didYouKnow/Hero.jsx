import React from 'react'
import banner from '@/public/assets/images/tipBanner.png'
import Image from 'next/image'
import MaxContainer from '@/components/shared/Layout/MaxContainer';

const Hero = () => {
    return (
        <div>
            <div className='flex justify-center bg-[#FDF5E0] sm:pt-10 lg:pb-0 md:pb-20 pb-8 pt-8' >
                <MaxContainer>
                    <div className='flex justify-center items-center gap-6 w-[80%]'>
                        <div className='md:w-[58%] w-full sm:space-y-5 space-y-3' >
                            <div className='flex flex-col sm:items-start items-center gap-1'>
                                <h1 className='lg:text-2xl md:text-xl text-lg font-semibold sm:text-start w-full text-center'>Did You Know</h1>
                                <h1 className='xl:text-5xl xl:leading-[66px] lg:text-4xl md:text-3xl sm:text-2xl text-xl sm:text-start text-center  font-medium xl:mt-4 mt-2'>Discover Fascinating Facts and Essential <span className='font-[700]'>Cybersecurity</span> Tips</h1>
                                {/* <h1 className='xl:text-5xl sm:leading-loose lg:text-4xl md:text-3xl text-2xl sm:text-start text-center font-medium'>Essential <span className='font-[700]'>Cybersecurity</span> Tips</h1> */}
                            </div>
                            <p className='text-gray lg:text-lg md:text-base sm:text-sm text-xs w-full sm:text-start text-center'>
                                Welcome to our &quot;Did You Know?&quot; page, where we share intriguing facts, surprising statistics, and valuable
                                tips to enhance your cybersecurity knowledge. Stay informed, stay protected, and stay ahead of cyber threats
                                with our expert insights.
                            </p>
                        </div>
                        <div className='w-[42%] md:flex justify-center hidden' >
                            <div className='w-full h-full  flex  justify-center items-end ' >
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
