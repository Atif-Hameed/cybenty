'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MaxContainer from '../shared/Layout/MaxContainer';
import { useRouter } from 'next/navigation';
import { getMember } from '@/services/assignment';
import { decodeGameId } from '@/actions/game.action';

const PlayAssessment = () => {
    const [gameId, setGameId] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    // Function to handle form submission
    const handleEnterGame = async () => {

        if (!gameId || gameId.length !== 6) {
            setErrorMessage('Please enter a valid 6-digit Assessment Id.');
            setSuccessMessage('');
            return;
        }

        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {

            // Call the decode API
            const { data: decodeData, error: decodeError } = await decodeGameId(gameId);

            if (decodeError) {
                setErrorMessage(decodeError || 'Invalid game ID')
                throw new Error(decodeError || 'Invalid game ID');
            }

            const { memberId, assignmentId } = decodeData.data;
            const { data: memberData, error: memberError } = await getMember(assignmentId, memberId);

            if (memberError) {
                setErrorMessage(memberError || 'Member not found')
                throw new Error(memberError || 'Member not found');
            }
            console.log(memberData)
            if (memberData.status === 'ACCEPTED') {
                router.push(
                    `/dashboard/assessments/invited?assignment=${assignmentId}&memberId=${memberId}&type=TEAM&email=${memberData.email}&user=member`
                );
            } else {
                router.push(
                    `/dashboard/assessments/invites/${memberId}?assignment=${assignmentId}&assessment=${memberData.assessmentId}&email=${memberData.email}`
                );
            }

        } catch (error) {
            setErrorMessage(error.message || 'An error occurred while assessment accessing.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className='bg-blueMain w-full sm:py-20 py-8 flex justify-center'>
            <MaxContainer>
                <motion.div
                    initial={{ opacity: 0, y: -50 }} // Start with 0 opacity and move up 50px
                    whileInView={{ opacity: 1, y: 0 }} // Animate to 1 opacity and original position when in view
                    transition={{ duration: 0.6, ease: 'easeOut' }} // Animation duration and easing
                    className='flex flex-col items-center md:gap-10 gap-5 sm:w-[80%] w-full sm:px-0 px-6'
                >
                    {/* Heading with animation */}
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }} // Start with 0 opacity and move up 20px
                        whileInView={{ opacity: 1, y: 0 }} // Animate to 1 opacity and original position when in view
                        transition={{ duration: 0.5, ease: 'easeOut' }} // Animation duration and easing
                        className='xl:text-[44px] lg:text-4xl sm:text-3xl font-light font-semibold text-center text-xl text-white'
                    >
                        Ready to Get Started?
                    </motion.h1>

                    {/* Input and Button with animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} // Start with 0 opacity and move down 20px
                        whileInView={{ opacity: 1, y: 0 }} // Animate to 1 opacity and original position when in view
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }} // Animation duration, easing, and delay
                        className='lg:w-[55%] sm:w-[70%] w-full flex flex-col items-center rounded-lg sm:text-base text-sm '
                    >
                        <div className='w-full flex flex-col gap-4 items-center'>
                            <input
                                type="text"
                                className='bg-white placeholder:text-gray py-3 outline-none px-3 rounded-lg text-center font-semibold flex-1'
                                placeholder='Enter assessment id here'
                                value={gameId}
                                onChange={(e) => setGameId(e.target.value)}
                            />
                            <button
                                className='bg-orangeMain text-white sm:px-6 px-4 py-3 h-full rounded-lg'
                                onClick={handleEnterGame}
                                disabled={loading}
                            >
                                {loading ? 'Starting...' : 'Start Your Free Assessment'}
                            </button>
                        </div>

                        {/* Error or Success Messages */}
                        {errorMessage && (
                            <p className="text-red-500 mt-2 text-sm">{errorMessage}</p>
                        )}
                        {successMessage && (
                            <p className="text-green-500 mt-2 text-sm">{successMessage}</p>
                        )}
                    </motion.div>
                </motion.div>
            </MaxContainer>
        </div>
    );
};

export default PlayAssessment;
