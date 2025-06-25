'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import img from '@/public/assets/images/chaleng.png';
import MaxContainer from '../shared/Layout/MaxContainer';
import Heading from '../shared/Heading';
import Image from 'next/image';

const Challenges = () => {
    const data = [
        { icon: <IoIosCheckmarkCircleOutline className='text-2xl text-orangeMain' />, des: '95% of cybersecurity breaches occur due to human error' },
        { icon: <IoIosCheckmarkCircleOutline className='text-2xl text-orangeMain' />, des: 'A cyberattack happens every 39 seconds (you could be the next victim)' },
        { icon: <IoIosCheckmarkCircleOutline className='text-2xl text-orangeMain' />, des: 'Having an Anti-Virus software is not enough' },
        { icon: <IoIosCheckmarkCircleOutline className='text-2xl text-orangeMain' />, des: 'Phishing detection is a constant battle, and the threat actors have become smarter' },
    ];

    return (
        <div className='bg-white w-full sm:py-20 py-8 flex justify-center'>
            <MaxContainer>
                <div className='flex justify-center items-center gap-6 sm:w-[80%] w-full sm:px-0 px-6'>
                    {/* Text content with animation from left (x direction) */}
                    <motion.div
                        initial={{ opacity: 0, x: -100 }} // Start with 0 opacity and move from left
                        whileInView={{ opacity: 1, x: 0 }} // Animate to 1 opacity and original position when in view
                        transition={{ duration: 0.6, ease: 'easeOut' }} // Animation duration and easing
                        className='md:w-[55%] w-full sm:space-y-8 space-y-4'
                    >
                        <Heading>
                            <span className='font-bold' >Your</span> Challenges
                        </Heading>
                        <div className='space-y-3 mt-8'>
                            {data.map((e, i) => (
                                <div key={i} className='text-lg flex items-start gap-3'>
                                    <div>{e.icon}</div>
                                    <p className='w-[95%]'>{e.des}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Image content with animation from right (-x direction) */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }} // Start with 0 opacity and move from right
                        whileInView={{ opacity: 1, x: 0 }} // Animate to 1 opacity and original position when in view
                        transition={{ duration: 0.6, ease: 'easeOut' }} // Animation duration and easing
                        className='w-[45%] md:flex justify-center hidden'
                    >
                        <div className='w-full h-full flex justify-center'>
                            <Image alt='' src={img} unoptimized />
                        </div>
                    </motion.div>
                </div>
            </MaxContainer>
        </div>
    );
};

export default Challenges;
