'use client';
import React from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import MaxContainer from '../shared/Layout/MaxContainer';
import Heading from '../shared/Heading';
import { EverythingCardData } from '@/data';
import Image from 'next/image';

const EverythingNeed = () => {
    return (
        <div className='flex justify-center bg-white sm:py-20 py-8'>
            <MaxContainer>
                <div className='flex justify-center items-center gap-12 sm:w-[80%] w-full sm:px-0 px-6'>
                    <div className=''>
                        {/* Heading with animation */}
                        <motion.div
                            initial={{ opacity: 0, y: -80 }} // Start with 0 opacity and move up 50px
                            whileInView={{ opacity: 1, y: 0 }} // Animate to 1 opacity and original position when in view
                            transition={{ duration: 0.6, ease: 'easeOut' }} // Animation duration and easing
                            className='flex justify-center'
                        >
                            <Heading>
                                Everything you need in <span className='font-bold'>ONE platform</span>
                            </Heading>
                        </motion.div>

                        {/* Cards with animation */}
                        <motion.div
                            initial={{ opacity: 0, y: -80 }} // Start with 0 opacity
                            whileInView={{ opacity: 1, y: 0 }} // Animate to 1 opacity when in view
                            transition={{ duration: 0.8, ease: 'easeOut', delayChildren: 0.3, staggerChildren: 0.2 }} // Control animation timing and delay
                            className='grid md:grid-cols-3 grid-cols-1 md:gap-0 gap-4 md:divide-x-2 md:divide-[#0000008C] md:mt-20 sm:mt-10 mt-5'
                        >
                            {EverythingCardData.map((e, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }} // Each card starts with 0 opacity and moves up 20px
                                    whileInView={{ opacity: 1, y: 0 }} // Animate to 1 opacity and original position when in view
                                    transition={{ duration: 0.5, ease: 'easeOut' }} // Animation duration and easing
                                    className='space-y-3 lg:px-8 sm:px-4 flex flex-col sm:items-start items-center'
                                >
                                    <div className='flex justify-center'>
                                        <Image alt='' src={e.icon} unoptimized />
                                    </div>
                                    <h1 className='xl:text-2xl lg:text-xl md:text-lg font-semibold'>{e.name}</h1>
                                    <p className='text-gray lg:text-lg sm:text-sm text-xs sm:text-start text-center'>{e.des}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </MaxContainer>
        </div>
    );
};

export default EverythingNeed;
