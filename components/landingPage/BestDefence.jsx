'use client';
import React from 'react';
import { motion } from 'framer-motion';
import MaxContainer from '../shared/Layout/MaxContainer';
import img from '@/public/assets/images/defenceImg.png';
import Heading from '../shared/Heading';
import Image from 'next/image';

const BestDefence = () => {
    return (
        <div className='bg-white w-full sm:py-20 py-8 flex justify-center'>
            <MaxContainer>
                <div className='flex flex-col justify-center items-center gap-12 sm:w-[80%] w-full sm:px-0 px-6'>
                    <div className='flex justify-center items-center gap-6 w-full'>
                        {/* Image content with animation from left (x direction) */}
                        <motion.div
                            initial={{ opacity: 0, x: -100 }} // Start with 0 opacity and move from left
                            whileInView={{ opacity: 1, x: 0 }} // Animate to 1 opacity and original position when in view
                            transition={{ duration: 0.6, ease: 'easeOut' }} // Animation duration and easing
                            className='w-1/2 md:flex justify-center hidden'
                        >
                            <div className='w-full h-full flex justify-center'>
                                <Image alt='' src={img} unoptimized />
                            </div>
                        </motion.div>

                        {/* Text content with animation from right (-x direction) */}
                        <motion.div
                            initial={{ opacity: 0, x: 100 }} // Start with 0 opacity and move from right
                            whileInView={{ opacity: 1, x: 0 }} // Animate to 1 opacity and original position when in view
                            transition={{ duration: 0.6, ease: 'easeOut' }} // Animation duration and easing
                            className='md:w-1/2 w-full sm:space-y-8 space-y-4'
                        >
                            <Heading>
                                <p className='w-full text-start'>Your Best Defense <span className='font-bold' >Education</span></p>
                            </Heading>
                            <p className='text-lg w-full text-start'>
                                Technology alone cannot protect you against some of the most common cyberthreats
                                being used by attackers today. Our goal is to educate you on how to best mitigate
                                these threats and guide you through how to handle complex situations via the use
                                of our training, and resources. Regardless of your background level of understanding,
                                we aim to support you every step of the way.
                            </p>
                        </motion.div>
                    </div>

                    {/* Text section with a simple fade-in effect */}
                    <motion.div
                        initial={{ opacity: 0 }} // Start with 0 opacity
                        whileInView={{ opacity: 1 }} // Animate to 1 opacity when in view
                        transition={{ duration: 0.8, ease: 'easeOut' }} // Animation duration and easing
                        className='text-blueMain flex flex-col gap-2 items-center md:my-12 sm:my-6 my-0'
                    >
                        <h1 className='font-medium text-center xl:text-4xl lg:text-3xl md:text-2xl text-xl'>
                            The Key To <span className='font-bold'>Cybersecurity Awareness</span> Is Solid Knowledge.
                        </h1>
                        <p className='text-center lg:text-xl md:text-lg text-sm'>
                            Don&apos;t just take our word for it. Read what our members are saying about Inturity.
                        </p>
                    </motion.div>
                </div>
            </MaxContainer>
        </div>
    );
};

export default BestDefence;
