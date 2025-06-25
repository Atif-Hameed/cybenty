'use client';

import React from 'react';
import MaxContainer from '../shared/Layout/MaxContainer';
import Heading from '../shared/Heading';
import Image from 'next/image';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import Button from '../shared/Button';
import img from '@/public/assets/images/personalImg.png';
import { motion } from 'framer-motion';

const Personal = () => {

    const data = [
        { icon: <IoIosCheckmarkCircleOutline className='text-2xl text-orangeMain' />, des: 'Explain why Cybersecurity is a fundamental requirement.' },
        { icon: <IoIosCheckmarkCircleOutline className='text-2xl text-orangeMain' />, des: 'Provide detailed analysis and information about the multitude of attack vectors that are out there.' },
        { icon: <IoIosCheckmarkCircleOutline className='text-2xl text-orangeMain' />, des: 'Demonstrate preventative measures that can be taken to mitigate Cyberattacks.' },
        { icon: <IoIosCheckmarkCircleOutline className='text-2xl text-orangeMain' />, des: 'Explain the best Cybersecurity practices, whilst providing easy to digest do’s and don’ts.' },
    ];

    return (
        <div className='bg-white w-full sm:py-20 py-8 flex justify-center'>
            <MaxContainer>
                <div className='flex flex-col gap-10 w-[80%] sm:px-0 px-2'>
                    <div className='flex justify-center'>
                    <Heading>About Us</Heading>
                    </div>
                    <div className='flex justify-center items-center gap-6 w-full'>
                        {/* Animated Text Section */}
                        <motion.div
                            className='md:w-[55%] w-full space-y-4'
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                            <h1 className='lg:text-2xl sm:text-xl text-lg text-orangeMain font-semibold'>INTURITY</h1>
                            <h1 className='xl:text-[40px] lg:text-3xl sm:text-2xl text-xl font-medium text-blueMain xl:leading-[3rem]'>
                                A Smarter Way of Dealing with <span className='font-bold'>Your Personal Cybersecurity</span>
                            </h1>
                            <p className='text-gray lg:text-2xl sm:text-xl text-lg font-normal'>
                                We specialize in cybersecurity. Our goal is to:
                            </p>
                            <div className='space-y-3 mt-8'>
                                {data.map((e, i) => (
                                    <motion.div
                                        key={i}
                                        className='text-lg flex items-start gap-2'
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: i * 0.1 }}
                                    >
                                        <div className=''>{e.icon}</div>
                                        <p className='w-[95%] sm:text-base text-sm text-gray'>{e.des}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                        {/* Animated Image */}
                        <motion.div
                            className='w-[45%] md:flex justify-center hidden'
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                            <div className='w-full h-full flex justify-center'>
                                <Image alt='' src={img} unoptimized />
                            </div>
                        </motion.div>
                    </div>
                    <motion.div
                        className='bg-[#FDF5E0] w-full md:text-lg text-sm p-4 flex flex-col gap-6 rounded-md'
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <p>
                            Regardless of your background level of
                            understanding, we aim to support you every
                            step of the way. Ranging from Cyberattacks,
                            security incidents and data breaches, we want
                            to educate you on how to best mitigate these
                            threats and guide you through how to
                            handle complex situations via the use of our guides, courses and forum.
                        </p>
                        <p>
                            Anyone who is connected to the internet is vulnerable to Cyber criminals. Whilst
                            we can’t guarantee you’ll never fall foul to an attack, we can prepare you to spot
                            the most commonly used tactics, to help prevent a worst-case scenario. We provide
                            the tools and knowledge which allows you to protect yourself from these types
                            of threats, whilst creating a positive Cybersecurity culture.
                        </p>
                    </motion.div>
                </div>
            </MaxContainer>
        </div>
    );
}

export default Personal;
