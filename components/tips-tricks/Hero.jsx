import React from 'react'
import banner from '@/public/assets/images/trickbanner.png'
import Image from 'next/image'
import MaxContainer from '@/components/shared/Layout/MaxContainer';

const Hero = () => {
    return (
        <div>
            <div className='flex justify-center bg-[#F2EAE5] sm:pt-20 lg:pb-0 md:pb-20 pb-8 pt-8' >
                <MaxContainer>
                    <div className='flex justify-center items-center gap-6 w-[80%]'>
                        <div className='md:w-[58%] w-full sm:space-y-5 pb-5 space-y-3' >
                            <div className='flex flex-col sm:items-start items-center gap-2 '>
                                <h1 className='lg:text-2xl md:text-xl text-lg font-medium sm:text-start w-full text-center'>Tips and Tricks</h1>
                                <h1 className='xl:text-5xl xl:leading-[66px] lg:text-4xl md:text-3xl sm:text-start  text-center text-2xl   font-medium xl:mt-4 mt-2'>Enhance Your Cybersecurity with Expert  <span className='font-semibold'>Tips and Tricks</span></h1>
                                {/* <h1 className='xl:text-5xl lg:text-4xl md:text-3xl text-2xl  font-medium'>with Expert  <span className='font-semibold'>Tips and Tricks</span> Tips</h1> */}
                            </div>
                            <p className='text-gray lg:text-lg md:text-base sm:text-sm text-xs w-full sm:text-start text-center'>
                                Welcome to our &quot;Did You Know?&quot; page, where we share intriguing facts, surprising statistics, and valuable
                                tips to enhance your cybersecurity knowledge. Stay informed, stay protected, and stay ahead of cyber threats
                                with our expert insights.
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
