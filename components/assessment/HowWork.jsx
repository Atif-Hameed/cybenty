'use client';

import React from 'react';
import MaxContainer from '../shared/Layout/MaxContainer';
import img from '@/public/assets/images/howWokImg.png';
import Heading from '../shared/Heading';
import Image from 'next/image';
import Button from '../shared/Button';
import { HowWorkData } from '@/data';
import { motion } from 'framer-motion';

const HowWork = () => {
    return (
        <div className='bg-white w-full sm:py-12 py-8 flex justify-center px-4'>
            <MaxContainer>
                <div className='flex flex-col justify-center items-center gap-12 sm:p-5 sm:w-[80%] w-[90%]'>

                    <div className='flex justify-between items-center gap-10 w-full sm:mt-8 mt-3'>
                        {/* Animated Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className='w-1/2 md:flex justify-center hidden'
                        >
                            <div className='w-full h-full flex justify-center'>
                                <Image alt='' src={img} unoptimized />
                            </div>
                        </motion.div>

                        {/* Animated Text Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className='lg:w-[40%] md:w-[50%] w-full sm:space-y-8 flex flex-col sm:items-start items-center space-y-4'
                        >
                            <h1 className='xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-medium text-blueMain'>
                                How It Works:
                            </h1>
                            <div className='flex flex-col items-start'>
                                {
                                    HowWorkData.map((e, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.6, ease: 'easeOut' }}
                                            className={`flex pb-9 items-start group gap-3 cursor-pointer relative flex-1 ${i === 3 ? 'after:w-0 mt-1' : 'after:w-px'} after:h-full after:bg-[#E1E3E9] after:inline-block after:absolute after:-bottom-11 after:left-4 lg:after:left-5`}
                                        >
                                            <div className='p-2.5 rounded-full text-xl border text-[#DBCDF0] group-hover:text-white border-[#E1E3E9] bg-white group-hover:bg-[#DBCDF0]'>
                                                {e.icon}
                                            </div>
                                            <div>
                                                <h1 className='text-secondary font-medium'>{e.name}</h1>
                                                <p className='text-[#7E819B]'>{e.des}</p>
                                            </div>
                                        </motion.div>
                                    ))
                                }
                            </div>
                        </motion.div>
                    </div>
                </div>
            </MaxContainer>
        </div>
    );
}

export default HowWork;
