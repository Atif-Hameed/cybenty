'use client';
import React, { useRef } from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import MaxContainer from '../shared/Layout/MaxContainer';
import { TestimonialData } from '@/data';
import Image from 'next/image';
import coma from '@/public/assets/images/coma.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

// Custom dots component for slider
const CustomDots = ({ dots, sliderRef }) => (
    <div className="flex justify-center absolute xl:bottom-6 lg:-bottom-[8%] md:-bottom-[12%] -bottom-[5%] left-[55%] -translate-x-1/2 mt-4">
        {dots.map((dot, index) => (
            <div
                key={index}
                className={`h-7 w-7 rounded-full mx-1 cursor-pointer ${dot.props.className === "slick-active"
                    ? "bg-[#FF5E3A] border-4 border-white"
                    : "bg-white w-7"
                    }`}
                onClick={() => sliderRef.current.slickGoTo(index)} // Use slickGoTo method
            />
        ))}
    </div>
);

const sliderSettings = {
    dots: true,
    customPaging: (i) => <div className="dot"></div>,
    dotsClass: "slick-dots",
    appendDots: (dots, slider) => <CustomDots dots={dots} sliderRef={slider} />, // Pass sliderRef to CustomDots
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
        {
            breakpoint: 650,
            settings: {
                arrows: false,
                dots: false,
            }
        }
    ]
};

const Testimonial = () => {
    const sliderRef = useRef(null); // Reference for the slider

    return (
        <div className='bg-orangeMain w-full sm:py-20 py-8 flex justify-center'>
            <MaxContainer>
                <div className='sm:w-[80%] w-full sm:px-0 px-6'>
                    <Slider ref={sliderRef} {...sliderSettings} className="relative z-10">
                        {TestimonialData.map((e, i) => (
                            <div key={i}>
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }} // Start with 0 opacity and move from left
                                    whileInView={{ opacity: 1, x: 0 }} // Animate to 1 opacity and original position when in view
                                    transition={{ duration: 0.6, ease: 'easeOut' }} // Animation duration and easing
                                    className="w-full flex justify-between gap-10 md:flex-row flex-col items-center"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, x: -100 }} // Image starts with 0 opacity and moves from left
                                        whileInView={{ opacity: 1, x: 0 }} // Animate to 1 opacity and original position when in view
                                        transition={{ duration: 0.6, ease: 'easeOut' }} // Animation duration and easing
                                        className='md:w-1/2 w-full flex justify-center'
                                    >
                                        <Image alt='' src={e.slideImg} unoptimized className='' />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }} // Text starts with 0 opacity and moves from right
                                        whileInView={{ opacity: 1, x: 0 }} // Animate to 1 opacity and original position when in view
                                        transition={{ duration: 0.6, ease: 'easeOut' }} // Animation duration and easing
                                        className="md:w-1/2 w-full flex justify-center space-y-3 flex-col text-white"
                                    >
                                        <p className='font-semibold text-2xl'>Testimonials</p>
                                        <h1 className='font-bold xl:text-5xl lg:text-4xl md:text-3xl text-2xl'>{e.name}</h1>
                                        <p>{e.description}</p>
                                        <div className='flex items-center gap-8'>
                                            <div className='flex items-center gap-2'>
                                                <div>
                                                    <Image alt='' src={e.userImg} className='rounded-full' />
                                                </div>
                                                <div>
                                                    <h1 className='font-semibold text-lg'>{e.userName}</h1>
                                                    <p className='text-sm'>{e.role}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <Image alt='' src={coma} className='w-full h-full' />
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </MaxContainer>
        </div>
    );
};

export default Testimonial;
