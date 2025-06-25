'use client';

import React from 'react';
import banner from '@/public/assets/images/assessmentBanner.png';
import Image from 'next/image';
import MaxContainer from '@/components/shared/Layout/MaxContainer';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <div>
            <div className='flex justify-center bg-[#F1F4F5] sm:pt-10 lg:pb-0 md:pb-20 pb-8 pt-8'>
                <MaxContainer>
                    <div className='flex justify-center items-center w-[80%]'>
                        {/* Animated Text Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className='md:w-[58%] w-full sm:space-y-5 space-y-3'
                        >
                            <div className='flex flex-col sm:items-start items-center gap-1'>
                                <h1 className='lg:text-2xl md:text-xl text-lg font-semibold sm:text-start w-full text-center'>Assessment</h1>
                                <h1 className='xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl text-xl font-medium xl:mt-4 mt-2'>Evaluate Your <span className='font-bold'>Cybersecurity </span> Readiness</h1>
                            </div>
                            <p className='text-gray lg:text-lg md:text-base sm:text-sm text-xs w-full sm:text-start text-center'>
                                Welcome to our Cybersecurity Assessments page. Our comprehensive assessments are designed to help you identify vulnerabilities, understand your security posture, and enhance your defenses against cyber threats.
                            </p>
                        </motion.div>

                        {/* Animated Image Section */}
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
