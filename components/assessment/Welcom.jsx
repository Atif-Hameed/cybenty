'use client';

import React from 'react';
import MaxContainer from '../shared/Layout/MaxContainer';
import { motion } from 'framer-motion';

const Welcom = () => {
    return (
        <div className='flex justify-center bg-white sm:pt-10 lg:pb-0 md:pb-20 pb-8 pt-8'>
            <MaxContainer>
                <div className='flex justify-center items-center w-[80%] sm:px-0 px-2'>
                    <div className='flex flex-col items-center'>
                        {/* Animated Header and Paragraph */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className='sm:w-[80%] text-secondary'
                        >
                            <h1 className='font-semibold lg:text-4xl sm:text-3xl text-2xl text-center mb-2'>
                                Welcome to Your Digital Life Assessment Builder
                            </h1>
                            <p className='md:text-3xl sm:text-2xl text-lg font-medium text-center'>
                                Take Control of Your Digital Life Today!
                            </p>
                        </motion.div>

                        {/* Animated Divider */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className='bg-[#00000061] w-full my-8 h-px'
                        ></motion.div>

                        {/* Animated Info Box */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className='bg-[#FFF9F8AB] flex rounded-md mt-2 flex-col items-center w-full sm:p-8 p-6'
                        >
                            <h1 className='text-3xl font-medium text-secondary'>Get Started for Free!</h1>
                            <p className='sm:text-lg text-center mt-3'>
                                Discover your strengths and risks in just a few steps. Our assessment tool provides valuable insights to help you take control of your digital life. Start with our free categories and unlock more with our premium access!
                            </p>
                        </motion.div>
                    </div>
                </div>
            </MaxContainer>
        </div>
    );
}

export default Welcom;
