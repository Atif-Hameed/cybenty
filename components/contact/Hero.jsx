'use client';

import React from 'react';
import banner from '@/public/assets/images/contactImg.png';
import Image from 'next/image';
import MaxContainer from '@/components/shared/Layout/MaxContainer';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <div>
            <div className='flex justify-center bg-[#FDF5E0] sm:py-16 py-8'>
                <MaxContainer>
                    <div className='flex justify-center items-center gap-6 w-[80%]'>
                        {/* Animated Text */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className='md:w-[58%] w-full sm:space-y-5 space-y-3'
                        >
                            <div className='flex flex-col sm:items-start items-center gap-1'>
                                <h1 className='lg:text-2xl md:text-xl text-lg font-semibold sm:text-start w-full text-center'>
                                    Contact
                                </h1>
                                <h1 className='xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl font-semibold xl:mt-4 mt-2'>
                                    We&apos;re Here to <b className='font-black xl:text-6xl'>Help</b>
                                </h1>
                            </div>
                            <p className='text-gray lg:text-lg md:text-base sm:text-sm text-xs w-full sm:text-start text-center'>
                                Welcome to our FAQ page. Here, you’ll find answers to the most common questions about our cybersecurity solutions, services, and support. If you have any additional questions, don’t hesitate to reach out to our team.
                            </p>
                        </motion.div>
                        {/* Animated Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className='w-[42%] md:flex justify-center hidden'
                        >
                            <div className='w-full h-full flex justify-center'>
                                <Image alt='' src={banner} unoptimized />
                            </div>
                        </motion.div>
                    </div>
                </MaxContainer>
            </div>
        </div>
    );
}

export default Hero;
