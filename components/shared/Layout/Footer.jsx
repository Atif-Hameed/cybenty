'use client'
import React from 'react'
import logo from '@/public/assets/images/Logo3.png'
import Image from 'next/image'
import { FooterCompany, FooterInvolved, FooterResources, FooterSocial } from '@/data'
import Link from 'next/link'
import img from '@/public/assets/images/logomain.png'
import Button from '../Button'
import MaxContainer from './MaxContainer'
import { useRouter } from 'next/navigation'



const Footer = () => {

    const router = useRouter();

    return (
        <div className='flex flex-col mt-10 md:justify-between  h-full 3xl:min-h-full min-h-screen'>
            <div className=' bg-transparent flex justify-center items-center py-4 3xl:mt-20 px-2'>
                <MaxContainer>
                    <div className='bg-white rounded-2xl  xl:-mb-[12%] z-10 w-[80%] flex items-center gap-6 md:py-20 py-6 lg:px-14 px-4' style={{ boxShadow: '0px 4px 16.5px 0px #0000001F' }} >
                        <div className='xl:w-[35%] md:flex hidden h-full  justify-center items-center w-full'>
                            <Image alt='' src={img} className='' unoptimized quality={100} priority />
                        </div>
                        <div className='flex flex-col items-start gap-6'>
                            <h1 className='xl:text-3xl sm:text-2xl text-lg font-medium'>Take the next step toward a smarter approach to create a <span className='font-bold' >positive cybersecurity culture</span> at home and at work.</h1>
                            <div>
                                <Button onClick={()=>router.push('/signup')} label={'Start Learning Now'} />
                            </div>
                        </div>
                    </div>
                </MaxContainer>
            </div>

            <div className='bg-blueMain flex xl:text-lg flex-col items-center xl:pt-64  lg:pt-40 sm:pt-12 pt-6 justify-between  text-white'>
                <MaxContainer>
                    <div className="sm:w-[80%] w-full mx-auto flex flex-col sm:px-0 px-6 lg:flex-row gap-8">

                        <div className="lg:w-[25%] w-full flex flex-col lg:items-start sm:items-center items-start">
                            <div className="my-4">
                                <Image alt='' src={logo} width={150} height={100} />
                            </div>
                            <p className=" text-white md:text-start sm:text-center">
                                Your Cybersecurity Self-Defense Platform. A Smarter Approach to Keep
                                Yourself Cyber Safe.
                            </p>
                        </div>

                        <div className="flex  flex-1 justify-around sm:flex-row flex-col flex-wrap gap-8 flex-2">
                            <div className=''>
                                <h3 className="font-semibold  text-lightGray mb-2">COMPANY</h3>
                                <div className='flex flex-col gap-2 '>
                                    {
                                        FooterCompany.map((e, i) => (
                                            <Link href={e.src} key={i} className='' >
                                                {e.name}
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className=''>
                                <h3 className="font-semibold  text-lightGray mb-2">RESOURCES</h3>
                                <div className='flex flex-col gap-2 '>
                                    {
                                        FooterResources.map((e, i) => (
                                            <Link href={e.src} key={i} className='' >
                                                {e.name}
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className=''>
                                <h3 className="font-semibold  text-lightGray mb-2">GET INVOLVED</h3>
                                <div className='flex flex-col gap-2 '>
                                    {
                                        FooterInvolved.map((e, i) => (
                                            <Link href={e.src} key={i} className='' >
                                                {e.name}
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className=''>
                                <h3 className="font-semibold text-lightGray mb-2">Contact Us</h3>
                                <div className="flex flex-row flex-wrap gap-3 ">
                                    {
                                        FooterSocial.map((e, i) => (
                                            <Link key={i} href={e.src} className='p-2 text-[#313344] bg-white w-fit rounded-full' >
                                                {e.icon}
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </MaxContainer>
                <MaxContainer>

                    <div className='flex justify-center lg:mt-24 mt-12 xl:text-lg sm:text-base text-sm w-full py-4 border-t border-[#FFFFFF59] text-white ' >
                        <div className='w-[80%] flex justify-between gap-4 sm:flex-row flex-col items-start' >
                            <p>Copyright © 2022 Cybenty.com. All rights reserved.</p>
                            <div className='flex gap-3 sm:w-auto w-full justify-between'>
                                <Link href={''} >Terms and Conditions</Link>
                                <Link href={''} >Privacy Policy</Link>
                            </div>
                        </div>
                    </div>
                </MaxContainer>

            </div>
        </div>
    )
}

export default Footer
