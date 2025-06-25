'use client';

import React from 'react';
import MaxContainer from '../shared/Layout/MaxContainer';
import img from '@/public/assets/images/defenceImg2.png';
import Heading from '../shared/Heading';
import Image from 'next/image';
import Button from '../shared/Button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const BestDefence = () => {

    const router = useRouter();

    return (
        <div className='bg-white w-full sm:py-12 py-8 flex justify-center px-4'>
            <MaxContainer>
                <div className='flex flex-col justify-center items-center bg-[#F9F9FF] gap-12 p-5 sm:w-[80%] w-[90%] sm:px-0 px-2'>
                    {/* Animated Text */}
                    <motion.p
                        className='lg:text-3xl md:text-2xl sm:text-xl text-lg text-blueMain sm:w-[70%] text-center'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        We&apos;re on a mission to bring cybersecurity awareness to everyone, one member at a time
                    </motion.p>

                    <div className='flex justify-center items-center gap-10 w-full sm:mt-8 mt-3'>
                        {/* Animated Image */}
                        <motion.div
                            className='w-1/2 md:flex justify-center hidden'
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                            <div className='w-full h-full flex justify-center'>
                                <Image alt='' src={img} unoptimized />
                            </div>
                        </motion.div>

                        {/* Animated Content */}
                        <motion.div
                            className='md:w-1/2 w-full sm:space-y-8 flex flex-col sm:items-start items-center space-y-4'
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                            <Heading>
                                <p className='w-full sm:text-start font-normal text-blueMain'>
                                    Your Best Defense Against <b className='font-bold'>Cyberattacks - Education</b>
                                </p>
                            </Heading>
                            <motion.p
                                className='text-lg w-full sm:text-start text-center text-blueMain'
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                            >
                                Individuals can be targeted for attack and never know it. Cybercriminals target individuals
                                as relentlessly as they go after large companies and organizations.
                            </motion.p>
                            <motion.div
                                className='w-fit'
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                            >
                                <Button onClick={()=>router.push('/signup')} label={'Start Learning Now'} />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </MaxContainer>
        </div>
    );
}

export default BestDefence;
