'use client';
import React from 'react';
import img from '@/public/assets/images/upgradeImg.png';
import MaxContainer from '../shared/Layout/MaxContainer';
import Heading from '../shared/Heading';
import Image from 'next/image';
import { PiDotOutlineFill } from "react-icons/pi";
import { motion } from 'framer-motion';

const Upgrade = () => {

    const data = [
        { des: 'Access to more detailed categories' },
        { des: 'Advanced recommendations' },
        { des: 'Higher points and exclusive badges' },
    ];

    return (
        <div className='bg-white w-full sm:py-20 py-8 flex justify-center'>
            <MaxContainer>
                <div className='flex justify-center items-center gap-6 lg:w-[75%] sm:w-[80%] w-[90%] sm:px-0 px-2'>
                    <motion.div
                        className='lg:w-[45%] md:w-1/2 w-full space-y-4'
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <Heading>
                            <span className='font-bold'>Upgrade</span> for More!
                        </Heading>

                        <p className='text-[#7E819B] sm:text-base text-sm sm:text-start text-center'>
                            Unlock additional categories and gain deeper insights by upgrading to our premium access.
                        </p>

                        <h1 className='md:text-2xl sm:text-xl text-lg font-medium'>
                            Benefits of Premium Access:
                        </h1>
                        <div className='space-y-3 mt-8'>
                            {data.map((e, i) => (
                                <motion.div
                                    key={i}
                                    className='text-lg flex items-center gap-1'
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, ease: 'easeOut' }}
                                >
                                    <PiDotOutlineFill className='text-[#7E819B]' />
                                    <p className='w-[95%] text-[#7E819B]'>{e.des}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div
                        className='lg:w-[55%] md:w-1/2 md:flex justify-center hidden'
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
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

export default Upgrade;
