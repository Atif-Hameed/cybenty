'use client'
import React from 'react'
import MaxContainer from '../shared/Layout/MaxContainer'
import Image from 'next/image'
import { ToolsCardData } from '@/data'
import Button from '../shared/Button'
import { useRouter } from 'next/navigation'

const Tools = () => {

    const router = useRouter();

    return (
        <div className='flex justify-center bg-white sm:py-20 py-8' >
            <MaxContainer>
                <div className='flex flex-col items-center justify-center  md:gap-6 gap-2 sm:w-[80%] w-[90%] sm:px-0 px-2'>
                    <h1 className='text-blueMain lg:text-[40px] md:text-3xl text-center font-semibold text-2xl'>Tools</h1>
                    <p className='md:text-lg sm:text-sm text-xs font-light sm:w-[92%] w-full text-center md:mt-2' >
                        A list of credible tools to help you increase your personal cybersecurity posture.</p>

                    <div className={`grid md:grid-cols-3 grid-cols-1 gap-y-3  md:gap-0 gap-4  sm:mt-10 mt-5`} >
                        {
                            ToolsCardData.map((e, i) => (
                                <div key={i} className={`lg:px-8 sm:px-4 sm:mt-6 mt-0 md:border-r-2 md:border-[#00000040] ${(i === 2 || i === 5) && 'border-none'}`}>
                                    <div className='space-y-3 lg:pl-6 sm:pl-4 lg:py-2 py-6 lg:p-0 p-4 hover:bg-[#DCEEEA] h-full flex flex-col sm:items-start items-center  rounded-lg'  >
                                        <div className='lg:h-[130px] flex justify-start'>
                                            <Image alt='' src={e.img} className='' unoptimized />
                                        </div>
                                        <h1 className='xl:text-2xl lg:text-xl md:text-lg font-semibold'>{e.name}</h1>
                                        <p className='text-gray lg:text-lg sm:text-sm text-xs sm:text-start text-center'>{e.des}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='flex my-4 justify-center w-full'>
                        <div className='w-fit self-center'>
                            <Button onClick={() => router.push('/signup')} label={'Register now!'} />
                        </div>
                    </div>

                </div>
            </MaxContainer>
        </div>
    )
}

export default Tools
