'use client'
import React, { useState, useEffect } from 'react';
import CustomCheckBox from '@/components/dashboard/shared/CustomCheckBox';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { deleteCheckedEmail, getCheckedEmails, saveCheckedEmail, confirmEmailOwnership } from '@/services/checkEmails';
import CheckedMailTable from '@/components/dashboard/invites/checked-mail-table';

const Page = () => {
    const [email, setEmail] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Added for success feedback
    const [emails, setEmails] = useState([]);
    const [loadingEmails, setLoadingEmails] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const [otpLoading, setOtpLoading] = useState(false);
    const router = useRouter();
    const user = useSelector((state) => state.user.user);
    const userId = user._id;

    // Fetch checked emails on component mount
    useEffect(() => {
        fetchCheckedEmails();
    }, []);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        setError('');
        setSuccessMessage('');
    };

    const handleEmailChange = (e) => {
        setError('');
        setSuccessMessage('');
        setEmail(e.target.value);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleCheck = async () => {
        setError('');
        setSuccessMessage('');
        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            setError('Please enter an email address.');
            return;
        }

        if (!validateEmail(trimmedEmail)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!isChecked) {
            setError('You need to agree that the email address belongs to you.');
            return;
        }

        setLoading(true);

        try {
            const res = await saveCheckedEmail(userId, trimmedEmail);

            // Check if the email is verified before navigating
            if (res?.existingEmailForUser?.verificationStatus === 'verified') {
                router.push(`/dashboard/data-leak-monitor?email=${trimmedEmail}`);
            } else {
                setSuccessMessage(res.message); // Display backend success message
                setShowOtpModal(true); // Show OTP modal for unverified email
            }

            // Refresh the emails list
            await fetchCheckedEmails();
        } catch (err) {
            setError(err.message || 'An error occurred while checking email.');
        } finally {
            setLoading(false);
        }
    };

    const fetchCheckedEmails = async () => {
        setLoadingEmails(true);
        try {
            const res = await getCheckedEmails(userId);
            setEmails(res?.checkedEmails || []);
        } catch (err) {
            setError(err.message || "Failed to fetch checked emails.");
        } finally {
            setLoadingEmails(false);
        }
    };

    const handleDeleteEmail = async (id) => {
        try {
            const res = await deleteCheckedEmail(id);
            await fetchCheckedEmails(); // Refresh email list
        } catch (err) {
            setError(err.message || "Failed to delete email.");
        }
    };

    const handleOtpSubmit = async () => {
        setOtpError('');
        setOtpLoading(true);

        try {
            const response = await confirmEmailOwnership(otp);
            if (response.success) {
                setShowOtpModal(false); // Close modal on success
                router.push(`/dashboard/data-leak-monitor?email=${email}`); // Redirect to data leak monitor
                await fetchCheckedEmails(); // Refresh email list
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

    return (
        <div className='lg:p-10 md:p-7 p-5'>
            <div className='text-darkBlue rounded-xl w-full flex justify-center gap-4 items-center'>
                <div className='flex flex-col gap-4 items-center w-full'>
                    <h1 className='text-darkBlue text-center font-medium lg:text-3xl md:text-2xl text-xl'>
                        Has your account been compromised by a data breach?
                    </h1>
                    <p className='text-center text-base'>
                        Just enter your email and we&apos;ll check to see if any online services linked to it have been compromised.
                    </p>

                    <div className='flex flex-col items-start gap-4 sm:w-4/5 w-full'>
                        <div className='bg-white border border-bordered sm:py-0 py-3 rounded-xl mt-5 flex w-full sm:flex-row flex-col justify-between gap-4 items-center shadow-xl'>
                            <input
                                type='text'
                                className='sm:bg-transparent border-none outline-none flex-1 w-full py-4 sm:px-6 px-3 font-medium placeholder:text-gray'
                                placeholder='Enter your email Address'
                                value={email}
                                onChange={handleEmailChange}
                            />
                            <button
                                className='bg-purple text-white sm:px-8 px-4 py-4 sm:rounded-none rounded-lg sm:rounded-tr-lg sm:rounded-br-lg'
                                onClick={handleCheck}
                                disabled={loading}
                            >
                                {loading ? 'Checking...' : 'Check Now'}
                            </button>
                        </div>
                        {error && <p className="text-red-500 text-center mt-3">{error}</p>}
                        {successMessage && <p className="text-green-500 text-center mt-3">{successMessage}</p>}
                        <div className='w-fit'>
                            <CustomCheckBox
                                isChecked={isChecked}
                                onChange={handleCheckboxChange}
                                label={
                                    <span>By continuing, you agree that this email address belongs to you.</span>
                                }
                            />
                        </div>
                    </div>

                    <div className='w-[90%]'>
                        <CheckedMailTable
                            emails={emails}
                            loading={loadingEmails}
                            onDeleteEmail={handleDeleteEmail}
                        />
                    </div>
                </div>
            </div>

            {/* OTP Modal */}
            {showOtpModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold text-center text-darkBlue mb-4">Verify Your Email</h2>
                        <p className="text-gray-700 mb-4">
                            An OTP has been sent to <strong>{email}</strong>. Please enter the 6-digit OTP below.
                        </p>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 mb-4 outline-none focus:border-purple"
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
                                className="px-4 py-2 bg-purple text-white rounded-lg hover:bg-purple-700"
                                onClick={handleOtpSubmit}
                                disabled={otpLoading}
                            >
                                {otpLoading ? 'Verifying...' : 'Verify OTP'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;