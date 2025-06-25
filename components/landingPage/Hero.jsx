'use client';

import React from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import banner from '@/public/assets/images/bannerImg.png';
import Image from 'next/image';
import { MdPlayArrow } from "react-icons/md";
import { GoArrowRight } from "react-icons/go";
import Heading from '@/components/shared/Heading';
import MaxContainer from '@/components/shared/Layout/MaxContainer';
import CookieConsentBanner from '../shared/CookieConsentBanner';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
    return (
        <div className='flex justify-center relative bg-glassGray sm:py-20 py-8'>
            <MaxContainer>
                <div className='flex justify-center items-center gap-12 w-[80%]'>
                    {/* Animated Text and Buttons */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className='md:w-1/2 w-full sm:space-y-8 space-y-4'
                    >
                        <Heading>
                            You Are Vulnerable to <span className='text-transparent sm:inline-blocks hidden'>-</span> Scams And <span className='text-orangeMain'>Cyberattacks!</span>
                        </Heading>

                        <p className='text-gray text-xl sm:w-[90%] w-full sm:text-start text-center'>
                            We provide you with the training and simple tools to protect you and your loved ones.
                        </p>

                        <div className='font-semibold sm:text-xl text-lg sm:text-start text-center'>
                            <p>Learn how you can:</p>
                            <TypeAnimation
                                sequence={[
                                    'Prevent social media account takeover', // Text to display
                                    2000, // Wait 2 seconds
                                    '', // Clear text (optional)
                                    500, // Wait 0.5 seconds before starting again
                                ]}
                                wrapper="span" // Wrapper element
                                speed={50} // Typing speed
                                deletionSpeed={50} // Deleting speed (if using deletion)
                                repeat={Infinity} // Infinite repetition
                                className="text-[#ff876c]" // Custom class name for styling
                                style={{ fontSize: '20px', display: 'inline-block' }} // Inline styles
                            />
                        </div>

                        <div className='flex items-center sm:justify-normal flex-wrap justify-center gap-2'>
                            <motion.button
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                className='bg-[#01062B] px-4 py-3 rounded-lg text-white flex items-center gap-2'
                            >
                                <MdPlayArrow />
                                Watch Video
                            </motion.button>
                            <motion.button
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                className='bg-transparent px-4 py-3 rounded-lg border border-[#0E1B56] text-[#0E1B56] flex items-center gap-2'
                            >
                                Learn More
                                <GoArrowRight className='text-xl' />
                            </motion.button>
                        </div>
                    </motion.div>
                    {/* Animated Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className='w-1/2 md:flex justify-center hidden'
                    >
                        <div className='w-full h-full flex justify-center'>
                            <Image alt='' src={banner} unoptimized />
                        </div>
                    </motion.div>
                </div>

                {/* <CookieConsentBanner /> */}
            </MaxContainer>
        </div>
    );
}

export default Hero;
