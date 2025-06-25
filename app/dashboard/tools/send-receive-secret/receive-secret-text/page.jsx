'use client';
import { getSecretById } from '@/services/api';
import { CopyIcon } from '@/svgs';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import img from '@/public/assets/icons/shield.svg';
import Image from 'next/image';
import axios from 'axios'; // Import axios to make the email sending request

const Page = () => {
    const [encryptedLink, setEncryptedLink] = useState();
    const [expiry, setExpiry] = useState();
    const [timeLeft, setTimeLeft] = useState(null);
    const [email, setEmail] = useState(''); // State for email input
    const [loading, setLoading] = useState(false); // State to handle loading state
    const [emailStatus, setEmailStatus] = useState(''); // State for email status message
    const param = useSearchParams();
    const id = param.get('token');
    const type = param.get('type');
    const [copied, setCopied] = useState(false);
    const router = useRouter();

    const getEncryptedLink = async (id) => {
        try {
            const res = await getSecretById(id, type);
            setEncryptedLink(res.encryptedLink);
            setExpiry(res.expiry);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getEncryptedLink(id, type);
    }, [id, type]);

    useEffect(() => {
        if (expiry) {
            // Function to calculate time left
            const calculateTimeLeft = () => {
                const now = new Date();
                const expirationDate = new Date(expiry);
                const difference = expirationDate - now;

                if (difference > 0) {
                    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                    setTimeLeft({ hours, minutes, seconds });
                } else {
                    setTimeLeft({ hours: 0, minutes: 0, seconds: 0 }); // Expired
                }
            };

            calculateTimeLeft(); // Initial calculation
            const timer = setInterval(() => {
                calculateTimeLeft(); // Update every second
            }, 1000);

            return () => clearInterval(timer); // Clean up on unmount
        }
    }, [expiry]);

    const handleCopy = () => {
        navigator.clipboard.writeText(encryptedLink)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Hide the message after 2 seconds
            })
            .catch((err) => {
                console.error('Failed to copy: ', err);
            });
    };

    const handleSendEmail = async () => {
        if (!email) {
            setEmailStatus('Please enter a valid email.');
            return;
        }

        setLoading(true); // Start loading
        setEmailStatus(''); // Clear previous status

        try {
            // API call to send the email
            const res = await axios.post('/api/send-secret', {
                email,
                link: encryptedLink,
            });

            setEmailStatus('Email sent successfully!');

        } catch (error) {
            setEmailStatus('Error occurred while sending email.');
        } finally {
            setLoading(false); // Stop loading after request completes
        }
    };

    return (
        <div className='sm:p-8 p-6 flex justify-center w-full'>
            <div className='flex flex-col items-center sm:gap-5 gap-3 sm:mt-10 mt-5 xl:w-[60%] lg:w-[75%] w-full '>
                <h1 className='text-darkBlue text-center font-semibold lg:text-3xl md:text-2xl text-xl'>
                    Send and receive secrets securely.
                </h1>
                <p className=' text-gray text-center'>
                    Create a secure one-time secret link. Stop sharing sensitive information on chat or email.
                </p>

                <div className='flex flex-col sm:gap-6 gap-3 mb-7 mt-4 w-fit '>
                    <div className='border border-dashed border-[#E7B402] bg-[#E7B4020F] p-4 w-full rounded-xl text-[#D47300] md:text-base text-sm'>
                        {encryptedLink ? (
                            <>
                                Your newly created secret can only be viewed once using the link below. It will expire in{' '}
                                {timeLeft ? `${timeLeft.hours} hours, ${timeLeft.minutes} minutes, and ${timeLeft.seconds} seconds` : 'loading...'}.
                            </>
                        ) : (
                            'Fetching the encrypted link...'
                        )}
                    </div>

                    <div className='bg-white p-4 rounded-xl md:text-base text-sm shadow-xl gap-3 sm:flex-row flex-col flex items-center justify-between w-full'>
                        <p className='sm:text-start text-sm text-center break-all'>{encryptedLink}</p>
                        <div className={`flex ${copied ? 'flex-col' : 'flex-row'} items-center`}>
                            <button
                                onClick={handleCopy}
                                className={`bg-purple text-white flex items-center gap-2 px-5 py-2 rounded-lg`}
                            >
                                <CopyIcon />
                                <p>Copy</p>
                            </button>
                            {copied && (
                                <span className='text-green-500 ml-3 text-sm'>Copied!</span>
                            )}
                        </div>
                    </div>

                    {/* Email input field and Send Email button */}
                    <div className='flex flex-col gap-3'>
                        <div className='w-full flex items-center sm:gap-4 gap-2'>
                            <input
                                type='email'
                                placeholder='Enter recipient email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='border p-3 rounded-lg w-full'
                            />
                            <button
                                onClick={handleSendEmail}
                                className={`bg-purple text-white whitespace-nowrap sm:text-base text-sm p-3 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={loading} // Disable button when loading
                            >
                                {loading ? 'Sending...' : 'Send Link'}
                            </button>
                        </div>
                        {emailStatus && (
                            <p className={`mt-2 ${emailStatus.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                                {emailStatus}
                            </p>
                        )}
                    </div>

                    <button onClick={() => router.push('/dashboard/tools/send-receive-secret')} className='bg-purple mt-5 text-white p-3 px-5 flex items-center justify-center w-full rounded-lg gap-2 lg:text-2xl md:text-xl sm:text-base text-sm'>
                        <Image alt='' src={img} />
                        Create New Secret
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Page;
