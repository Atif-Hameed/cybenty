'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MaxContainer from '../shared/Layout/MaxContainer';
import { requestGuestBreaches, confirmGuestEmailOwnership } from '@/services/checkEmails';
import { useRouter } from 'next/navigation';

const EmailSend = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const [otpLoading, setOtpLoading] = useState(false);
    const router = useRouter();

    // Function to handle form submission
    const handleCheckEmail = async () => {
        if (!email) {
            setErrorMessage('Please enter a valid email address.');
            setSuccessMessage('');
            return;
        }

        setLoading(true); // Start loading
        setErrorMessage(''); // Clear error message
        setSuccessMessage(''); // Clear success message

        try {
            // Make API call to check the email
            const response = await requestGuestBreaches(email);
            if (response.success) {
                setSuccessMessage(response.message); // Display backend success message
                if (!response.message.includes('dashboard')) {
                    setShowOtpModal(true); // Show OTP modal for unverified email
                }
            } else {
                setErrorMessage(response.message);
            }
        } catch (error) {
            setErrorMessage(error.message || 'An error occurred while checking the email.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleOtpSubmit = async () => {
        setOtpError('');
        setOtpLoading(true);

        try {
            const response = await confirmGuestEmailOwnership(otp);
            if (response.success) {
                setShowOtpModal(false); // Close modal on success
                router.push(`/guest-breaches?email=${email}`); // Redirect to guest breaches
            } else {
                setOtpError(response.message || 'Invalid or expired OTP.');
            }
        } catch (err) {
            setOtpError(err.message || 'An error occurred while verifying OTP.');
        } finally {
            setOtpLoading(false);
        }
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
        setOtpError('');
    };

    const closeOtpModal = () => {
        setShowOtpModal(false);
        setOtp('');
        setOtpError('');
    };

    // Clear messages when email changes
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setErrorMessage('');
        setSuccessMessage('');
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
                        className='xl:text-[44px] lg:text-4xl sm:text-3xl font-light text-center text-xl text-white'
                    >
                        Check if your account has been <span className="font-semibold">compromised</span> by a data breach
                    </motion.h1>

                    {/* Input and Button with animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} // Start with 0 opacity and move down 20px
                        whileInView={{ opacity: 1, y: 0 }} // Animate to 1 opacity and original position when in view
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }} // Animation duration, easing, and delay
                        className='lg:w-[55%] sm:w-[70%] w-full flex flex-col items-center rounded-lg sm:text-base text-sm '
                    >
                        <div className='w-full flex items-center'>
                            <input
                                type="text"
                                className='bg-white placeholder:text-gray py-3 outline-none px-3 rounded-l-lg flex-1'
                                placeholder='Enter Your Email Address'
                                value={email}
                                onChange={handleEmailChange} // Update email state on input change
                            />
                            <button
                                className='bg-orangeMain text-white sm:px-6 px-4 h-full rounded-r-lg'
                                onClick={handleCheckEmail} // Trigger email check on button click
                                disabled={loading} // Disable button while loading
                            >
                                {loading ? 'Checking...' : 'Check Now'}
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

                {/* OTP Modal */}
                {showOtpModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                            <h2 className="text-2xl font-bold text-blueMain mb-4">Verify Your Email</h2>
                            <p className="text-gray-700 mb-4">
                                An OTP has been sent to <strong>{email}</strong>. Please enter the 6-digit OTP below.
                            </p>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 mb-4 outline-none focus:border-orangeMain"
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={handleOtpChange}
                                maxLength={6}
                            />
                            {otpError && <p className="text-red-500 mb-4">{otpError}</p>}
                            <div className="flex justify-end gap-4">
                                <button
                                    className="px-4 py-2 text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-100"
                                    onClick={closeOtpModal}
                                    disabled={otpLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-orangeMain text-white rounded-lg hover:bg-orange-600"
                                    onClick={handleOtpSubmit}
                                    disabled={otpLoading}
                                >
                                    {otpLoading ? 'Verifying...' : 'Verify OTP'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </MaxContainer>
        </div>
    );
};

export default EmailSend;