'use client';

import React from 'react';
import MaxContainer from '../shared/Layout/MaxContainer';
import banner from '@/public/assets/images/whyTakeBanner.png';
import Image from 'next/image';
import { motion } from 'framer-motion';

const WhyTake = () => {
    return (
        <div className='bg-white w-full sm:py-12 py-8 flex justify-center px-4'>
            <MaxContainer>
                <div className='flex flex-col justify-center items-center bg-[#F9F9FF] xl:gap-12 gap-4 sm:p-10 p-4 sm:w-[80%] w-[90%]'>

                    {/* Animated Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className='xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-medium text-secondary text-center'
                    >
                        Why Take the Assessment?
                    </motion.h1>

                    {/* desktop view */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="py-40 relative w-full md:block hidden text-black"
                    >
                        <div className="flex flex-col absolute lg:left-[30%] left-[25%] top-[22%] items-start gap-2 xl:w-[20%] lg:w-[23%] w-[25%]">
                            <h1 className="lg:text-2xl text-lg font-rational font-semibold text-start">Personalized Tips</h1>
                            <p className="lg:text-sm sm:text-xs text-[10px] text-start">Get tailored advice to enhance your digital life.</p>
                        </div>
                        <div className="flex flex-col absolute right-[0%] lg:top-[20%] top-[22%] items-start gap-2 xl:w-[18%] lg:w-[22%] w-[25%]">
                            <h1 className="lg:text-2xl text-lg font-rational font-semibold text-start">Take Control</h1>
                            <p className="lg:text-sm sm:text-xs text-[10px] text-start">Empower yourself with the knowledge to protect your digital identity</p>
                        </div>

                        <Image alt='' src={banner} unoptimized className='w-full h-full' />

                        <div className="flex flex-col absolute lg:left-[3%] left-[0%] lg:bottom-[20%] bottom-[24%] items-start gap-2 xl:w-[20%] lg:w-[25%] w-[25%]">
                            <h1 className="lg:text-2xl text-lg font-rational font-semibold text-start">Know Your Risks:</h1>
                            <p className="lg:text-sm sm:text-xs text-[10px] text-start">Understand the areas where you might be vulnerable.</p>
                        </div>
                        <div className="flex flex-col absolute lg:right-[20%] right-[20%] lg:bottom-[20%] bottom-[24%] items-start gap-2 xl:w-[20%] lg:w-[25%] w-[27%]">
                            <h1 className="lg:text-2xl text-lg font-rational font-semibold text-start">Earn Points</h1>
                            <p className="lg:text-sm sm:text-xs text-[10px] text-start">Gain points for each completed category and compete with others on our leaderboard.</p>
                        </div>
                    </motion.div>

                    {/* mobile view */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="py-6 font-raleway md:hidden grid sm:grid-cols-2 grid-cols-1 text-black gap-8"
                    >
                        <div className="flex flex-col gap-2">
                            <h1 className='font-bold sm:text-start text-center text-xl font-rational'>01</h1>
                            <h1 className="sm:text-xl text-lg font-rational font-semibold sm:text-start text-center">Personalized Tips</h1>
                            <p className="sm:text-lg text-sm sm:text-start text-center">Get tailored advice to enhance your digital life.</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className='font-bold sm:text-start text-center font-rational text-xl'>02</h1>
                            <h1 className="sm:text-xl text-lg font-rational font-semibold sm:text-start text-center">Take Control</h1>
                            <p className="sm:text-lg text-sm sm:text-start text-center">Empower yourself with the knowledge to protect your digital identity</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className='font-bold sm:text-start text-center font-rational text-xl'>03</h1>
                            <h1 className="sm:text-xl text-lg font-rational font-semibold sm:text-start text-center">Know Your Risks:</h1>
                            <p className="sm:text-lg text-sm sm:text-start text-center">Understand the areas where you might be vulnerable.</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className='font-bold sm:text-start text-center font-rational text-xl'>04</h1>
                            <h1 className="sm:text-xl text-lg font-rational font-semibold sm:text-start text-center">Earn Points</h1>
                            <p className="sm:text-lg text-sm sm:text-start text-center">Gain points for each completed category and compete with others on our leaderboard.</p>
                        </div>
                    </motion.div>
                </div>
            </MaxContainer>
        </div>
    );
}

export default WhyTake;
