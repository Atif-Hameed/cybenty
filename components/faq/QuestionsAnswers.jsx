'use client';
import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { LuPlus } from 'react-icons/lu';
import { FaqData } from '@/data';
import MaxContainer from '../shared/Layout/MaxContainer';
import { motion, AnimatePresence } from 'framer-motion';

const QuestionsAnswers = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div className="bg-white w-full sm:py-12 py-8 flex justify-center px-4">
            <MaxContainer>
                <div className="flex flex-col justify-center items-center gap-12 sm:p-5 sm:w-[80%] w-[90%] sm:px-0 px-2">
                    <div className='flex flex-col gap-3 items-center xl:w-[65%] lg:w-[75%]'>
                        <h1 className='lg:text-4xl sm:text-3xl text-2xl text-center font-medium text-blueMain'>Frequently Asked <span className='font-bold'>Questions</span></h1>
                        <p className='text-center md:text-xl text-sm font-light'>Experience the transformative power of SynTech&apos;s services. Our solutions are designed to elevate your brand, engage your audience, and drive meaningful results.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-4">
                        {FaqData.map((faq, i) => (
                            <motion.div
                                key={i}
                                className={`sm:p-6 p-4 rounded-lg transition-all duration-300 ease-in-out ${activeIndex === faq.id ? 'bg-[#121221] text-white' : 'bg-[#F1F4F5] text-black'
                                    }`}
                                initial={{ opacity: 0,y:50}}
                                animate={{ opacity: 1,y:0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={() => toggleFAQ(faq.id)}
                                >
                                    <div className="flex items-center w-full sm:gap-8 gap-4">
                                        <span
                                            className={`md:text-5xl text-3xl font-bold ${activeIndex === faq.id ? 'text-white' : 'text-orangeMain opacity-55'
                                                }`}
                                        >
                                            {faq.id < 10 ? `0${faq.id}` : faq.id}
                                        </span>
                                        <div className="w-full">
                                            <div className="flex items-center gap-4 justify-between w-full">
                                                <h3
                                                    className={`font-medium md:text-xl sm:text-lg ${activeIndex === faq.id ? 'text-white' : ''
                                                        }`}
                                                >
                                                    {faq.question}
                                                </h3>
                                                <button
                                                    className={`text-xl rounded-full transition-all duration-200 ease-in-out ${activeIndex === faq.id ? 'text-black p-2 bg-[#FBF6F4]' : 'text-gray-400'
                                                        }`}
                                                >
                                                    {activeIndex === faq.id ? <RxCross1 /> : <LuPlus />}
                                                </button>
                                            </div>
                                            {activeIndex === faq.id && (
                                                <motion.div
                                                    className="overflow-hidden"
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <p className="mt-4 text-sm">{faq.answer}</p>
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </MaxContainer>
        </div>
    );
};

export default QuestionsAnswers;
