'use client'
import React from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import MaxContainer from '../shared/Layout/MaxContainer';
import { FeatureCardData } from '@/data';
import Image from 'next/image';

const Feature = () => {
    return (
        <div className='bg-white w-full sm:py-20 py-8 flex justify-center'>
            <MaxContainer>
                <div className='sm:w-[80%] w-full sm:px-0 px-6'>
                    <h1 className='md:text-4xl text-2xl font-semibold'>Featured</h1>
                    <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-4'>
                        {
                            FeatureCardData.map((e, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 50 }} // Start with 0 opacity and move up 50px
                                    whileInView={{ opacity: 1, y: 0 }} // Animate to full opacity and original position when in view
                                    transition={{ duration: 0.5, ease: 'easeOut' }} // Animation duration and easing
                                    className='space-y-3 w-full h-full'
                                >
                                    <div className=''>
                                        <Image alt='' src={e.img} className='w-full h-full' />
                                    </div>
                                    <div>
                                        <h1 className='font-semibold lg:text-2xl text-xl'>{e.name}</h1>
                                        <p className='text-xs text-gray'>{e.date}</p>
                                    </div>
                                </motion.div>
                            ))
                        }
                    </div>
                </div>
            </MaxContainer>
        </div>
    );
};

export default Feature;
