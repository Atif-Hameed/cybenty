'use client';

import React from 'react';
import MaxContainer from '../shared/Layout/MaxContainer';
import { FeaturesCardData } from '@/data';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Features = () => {
    return (
        <div className='flex justify-center bg-white sm:py-20 py-8'>
            <MaxContainer>
                <div className='flex flex-col justify-center items-center lg:gap-12 sm:gap-5 w-[80%]  px-2'>
                    <div className='flex flex-col items-center'>
                        <motion.h1
                            className='lg:text-4xl sm:text-2xl text-xl sm:mb-6 mb-2 font-semibold'
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                            <span className='text-orangeMain capitalize'>Platform Features</span>
                        </motion.h1>
                        <motion.h1
                            className='lg:text-3xl sm:text-2xl text-xl text-center sm:mb-6 font-medium text-blueMain'
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                            Everything you need in <span className='font-bold' >ONE platform</span>
                        </motion.h1>
                    </div>
                    <div className='grid md:grid-cols-3 grid-cols-1 md:gap-y-0 gap-y-4 lg:mt-20 sm:mt-5 mt-2'>
                        {FeaturesCardData.map((e, i) => (
                            <motion.div
                                key={i}
                                className={`space-y-3 lg:px-8 sm:px-4 border-[#00000061] ${(i === 2 || i === 5) ? 'border-r-none' : 'md:border-r'} ${(i === 3 || i === 4 || i === 5) ? 'border-b-none' : 'md:border-b'} py-10 flex flex-col sm:items-start items-center`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                            >
                                <div className='flex justify-center p-2 bg-[#FFF7F5] rounded-full'>
                                    <Image alt='' src={e.icon} className={``} unoptimized />
                                </div>
                                <h1 className='xl:text-2xl lg:text-xl md:text-lg font-semibold'>{e.name}</h1>
                                <p className='text-gray lg:text-lg sm:text-sm text-xs sm:text-start text-center'>{e.des}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </MaxContainer>
        </div>
    );
}

export default Features;
