'use client'
import React from 'react'
import banner from '@/public/assets/images/leakBanner.png'
import Image from 'next/image'
import MaxContainer from '@/components/shared/Layout/MaxContainer';
import Button from '../shared/Button';
import { useRouter } from 'next/navigation';

const Hero = () => {

    const router = useRouter();

    return (
        <div>
            <div className='flex justify-center bg-[#F1F4F5] sm:pt-10 lg:pb-0 md:pb-20 pb-8 pt-8' >
                <MaxContainer>
                    <div className='flex justify-center items-center gap-6 w-[80%]'>
                        <div className='md:w-[55%] pb-5 w-full sm:space-y-5 space-y-3' >
                            <div className='flex flex-col sm:items-start items-center gap-1'>
                                <h1 className='lg:text-2xl md:text-xl text-lg font-semibold sm:text-start w-full text-center'>Account Leak Check</h1>
                                <h1 className='xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl sm:text-start text-center xl:leading-[66.4px]  font-semibold xl:mt-4 mt-2'>Is Your Account Secure?</h1>
                                <h1 className='xl:text-5xl sm:leading-loose lg:text-4xl md:text-3xl text-2xl sm:text-start text-center xl:leading-[66.4px] font-bold'> Find Out Now!</h1>
                            </div>
                            <p className='text-gray lg:text-lg md:text-base sm:text-sm text-xs w-full sm:text-start text-center'>
                                Welcome to our Account Leak Check page. Protect your personal information and ensure your online accounts
                                are secure by checking if your data has been compromised in any known breaches. Our easy-to-use tool helps
                                you stay informed and take immediate action to safeguard your digital identity.
                            </p>
                            <div className='flex sm:justify-start justify-center w-full'>
                                <div className='w-fit self-center'>
                                    <Button onClick={() => router.push('/signup')} label={'Register now!'} />
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
