import React from 'react'
import MaxContainer from '../shared/Layout/MaxContainer'
import { AttackCardData } from '@/data'
import Image from 'next/image'
import { IoCheckmarkCircleOutline } from "react-icons/io5";


const CyberAttack = () => {
    return (
        <div className='flex justify-center bg-[#F9F6F3] sm:py-20 py-8' >
            <MaxContainer>
                <div className='flex flex-col  items-center justify-center  md:gap-6 gap-2 lg:w-[80%] w-[80%] xl:px-0 md:px-8 px-2'>
                    <h1 className='text-blueMain lg:text-[40px] md:text-3xl font-medium text-center text-2xl'>A <span className='font-bold'>cyber attach</span> happens</h1>
                    <p className='md:text-lg sm:text-sm text-xs font-light sm:w-[82%] w-full text-center md:mt-2' >
                        In the event of a cyber attack, swiftly identify the type of attack and isolate affected systems
                        to contain the breach. Assess the damage to understand which systems and data are compromised.
                        Notify relevant parties, including internal teams and potentially affected clients, to ensure a
                        coordinated response.</p>

                    <div className='flex sm:flex-row flex-col justify-between gap-10 lg:mt-20 md:mt-10 mt-5'>
                        {
                            AttackCardData.map((e, i) => (
                                <div className="flex flex-col sm:items-start items-center space-y-4" key={i}>
                                    <div>
                                        <Image alt="" src={e.img} className='md:w-auto w-40' />
                                    </div>
                                    <h1 className="md:text-2xl sm:text-xl text-lg font-semibold">{e.name}</h1>
                                    <div className='flex flex-col gap-2 items-start'>
                                        {
                                            e.points.map((point, index) => (
                                                <div className="flex items-start gap-2" key={index}>
                                                    <IoCheckmarkCircleOutline className="text-orangeMain text-lg" />
                                                    <p className=' md:text-base w-[92%] sm:text-sm text-xs'>{point}</p>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </MaxContainer>
        </div>
    )
}

export default CyberAttack
