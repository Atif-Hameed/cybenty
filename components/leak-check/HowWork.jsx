'use client'
import React, { useState } from 'react'
import MaxContainer from '../shared/Layout/MaxContainer'
import { LeakCheckCards, TripTricksCardData } from '@/data'
import Image from 'next/image'
import { TickIcon } from '@/svgs'
import Button from '../shared/Button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'

const HowWork = () => {

    const router = useRouter();

    return (
        <div className='flex justify-center bg-white sm:pt-10 lg:pb-0 md:pb-20 pb-8 pt-8'>
            <MaxContainer>
                <div className='flex justify-center flex-col items-center gap-6 sm:w-[80%] w-[90%] sm:px-0 px-2'>

                <div className='w-full flex justify-start'>
                        <Link href={'/resources'} className='flex items-center cursor-pointer hover:text-orangeMain  gap-4 '>
                            <FaArrowLeft />
                            Back
                        </Link>
                    </div>

                    <div className='flex flex-col items-center gap-3'>
                        <h1 className='text-secondary font-semibold lg:text-4xl md:text-3xl text-xl'>
                            How it Works:
                        </h1>
                        <p className='sm:w-[85%] w-full text-center'>
                            Enter your email or username and click &quot;Check Now.&quot; Our tool scans known data breaches and instantly informs you if your account has been compromised.
                        </p>
                    </div>

                    <div className='grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 mt-10'>
                        {
                            LeakCheckCards.map((e, i) => (
                                <div key={i} style={{ background: e.color }} className='flex flex-col h-full w-full  p-4  rounded-lg gap-4 sm:items-start items-center'>
                                    <div className='flex flex-col w-full h-full gap-4 sm:items-start items-center'>
                                        <div className='h-[130px]  flex sm:justify-start justify-center'>
                                            <Image alt='' src={e.img} className='h-full w-full object-cover' unoptimized />
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <h1 className='text-secondary sm:text-start text-center sm:text-2xl text-xl font-semibold'>{e.name}</h1>
                                            <p className='sm:text-start text-center'>{e.des}</p>
                                        </div>
                                    </div>
                                    <h1 className='text-[#00000080] sm:text-start text-center font-semibold sm:text-[40px] text-3xl'>0{i + 1}</h1>
                                </div>
                            ))
                        }
                    </div>

                    <div className='flex my-10 justify-center w-full'>
                        {/* <div className='w-fit self-center'>
                            <Button onClick={() => router.push('/signup')} label={'Register now!'} />
                        </div> */}
                    </div>

                </div>
            </MaxContainer>
        </div>
    );
}

export default HowWork;
