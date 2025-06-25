'use client';

import React from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import MaxContainer from '../shared/Layout/MaxContainer';
import { IntuityCardData } from '@/data';
import Image from 'next/image';

const WhyInturity = () => {
    return (
        <div className='flex justify-center bg-white sm:py-20 py-8'>
            <MaxContainer>
                <div className='flex flex-col justify-center items-center gap-12 sm:w-[80%] w-full sm:px-0 px-6'>
                    <div className='flex flex-col items-center'>
                        {/* Animated Heading */}
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className='flex flex-col items-center'
                        >
                            <h1 className='xl:text-[52px] lg:text-4xl md:text-3xl text-2xl mb-6 font-semibold'>
                                Why <span className='text-orangeMain'>Cybenty?</span>
                            </h1>
                            <p className='xl:text-4xl lg:text-3xl md:text-2xl text-xl font-medium text-center'>
                                We Are Your <span className='font-bold' >Cybersecurity Self-Defense</span> Platform.
                            </p>
                        </motion.div>
                    </div>
                    <div className='grid md:grid-cols-3 grid-cols-1 md:gap-y-0 gap-y-4 md:gap-0 gap-4 md:divide-x-2 md:divide-[#0000008C] md:mt-20 sm:mt-10 mt-2'>
                        {
                            IntuityCardData.map((e, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, ease: 'easeOut' }}
                                    className='space-y-3 lg:px-8 sm:px-4 flex flex-col sm:items-start items-center'
                                >
                                    <div className='flex justify-center lg:h-[140px] h-[110px] w-full'>
                                        <Image alt='' src={e.icon} className={``} unoptimized />
                                    </div>
                                    <div className='bg-[#0000008C] w-full my-8 h-px'></div>
                                    <h1 className='xl:text-2xl lg:text-xl md:text-lg font-semibold'>{e.name}</h1>
                                    <p className='text-gray lg:text-lg sm:text-sm text-xs sm:text-start text-center'>{e.des}</p>
                                </motion.div>
                            ))
                        }
                    </div>
                </div>
            </MaxContainer>
        </div>
    );
}

export default WhyInturity;
