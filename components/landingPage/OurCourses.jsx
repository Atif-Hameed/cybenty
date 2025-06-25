'use client';

import React from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import MaxContainer from '../shared/Layout/MaxContainer';
import Heading from '../shared/Heading';
import banner from '@/public/assets/images/courseBanner.png';
import Image from 'next/image';
import Button from '../shared/Button';
import { useRouter } from 'next/navigation';

const OurCourses = () => {

    const router = useRouter();

    return (
        <div className='bg-white w-full sm:py-20 py-8 flex justify-center'>
            <MaxContainer>
                <div className='flex flex-col justify-center items-center gap-6 sm:w-[80%] w-full sm:px-0 px-6'>
                    {/* Animated Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className='xl:text-[44px] lg:text-4xl sm:text-3xl text-2xl text-center font-medium'
                    >
                         <span className='font-bold' >Enhance Your Skills</span> with <br />Our Courses!
                    </motion.h1>
                    {/* Animated Image */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className='w-full h-full mt-5'
                    >
                        <Image alt='' src={banner} className='w-full h-full' />
                    </motion.div>
                    <div className='flex flex-col items-center gap-6'>
                        {/* Animated Text */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className='sm:w-[70%] w-[90%] text-center md:text-xl sm:text-lg text-sm'
                        >
                            Explore our curated selection of video courses designed to boost your knowledge and skills. Watch, learn, and earn coins along the way!
                        </motion.p>
                        {/* Animated Button */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                            className='w-fit'
                        >
                            <Button onClick={()=>router.push('/signup')} label={'Get Started'} />
                        </motion.div>
                    </div>
                </div>
            </MaxContainer>
        </div>
    );
}

export default OurCourses;
