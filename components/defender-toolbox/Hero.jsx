'use client'
import React from 'react'
import banner from '@/public/assets/images/defenderBanner.png'
import Image from 'next/image'
import MaxContainer from '@/components/shared/Layout/MaxContainer';
import Button from '../shared/Button';
import { useRouter } from 'next/navigation';

const Hero = () => {

    const router = useRouter();

    return (
        <div>
            <div className='flex justify-center bg-[#DCEEEA] sm:pt-10 lg:pb-0 md:pb-20 pb-8 pt-8' >
                <MaxContainer>
                    <div className='flex justify-center items-center pb-10 gap-6 w-[80%]'>
                        <div className='md:w-[55%] w-full sm:space-y-5 space-y-3' >
                            <div className='flex flex-col sm:items-start items-center gap-1'>
                                <h1 className='lg:text-2xl md:text-xl text-lg font-semibold sm:text-start w-full text-center'>Defender Toolbox</h1>
                                <h1 className='xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl sm:text-start text-center xl:leading-[66px]  font-medium xl:mt-4 mt-2'>Is Your Empower Your Security with the <span className='font-bold'>Defender Toolbox</span> Secure?</h1>
                            </div>
                            <p className='text-gray lg:text-lg md:text-base sm:text-sm text-xs w-full sm:text-start text-center'>
                                Welcome to the Defender Toolbox, your ultimate resource for enhancing your cybersecurity defenses. Access a comprehensive
                                suite of tools, tips, and strategies designed to help you protect your digital assets and stay one step ahead of cyber threats.
                            </p>
                            <div className='flex sm:justify-start justify-center w-full'>
                                <div className='w-fit self-center'>
                                    <Button onClick={()=>router.push('/signup')} label={'Register now!'} />
                                </div>
                            </div>
                        </div>
                        <div className='w-[45%] md:flex justify-center hidden' >
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
