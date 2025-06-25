'use client';
import { getSecretById, markSecretAsViewed } from '@/services/api';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import img from '@/public/assets/icons/shield.svg';
import { useRouter } from 'next/navigation';
import CustomInput from '@/components/dashboard/shared/CustomInput';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { backend_url } from '@/utils/config';
import jsPDF from 'jspdf';


const Page = () => {
    const [secret, setSecret] = useState();
    const [file, setFile] = useState();
    const [isExpiredOrViewed, setIsExpiredOrViewed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [hasViewedSecret, setHasViewedSecret] = useState(false);
    const param = useSearchParams();
    const id = param.get('token');
    const type = param.get('type');
    const pass = param.get('pass');
    const pathname = usePathname();
    const router = useRouter();
    const user = useSelector((state) => state.user.user);

    // Check if the secret has been viewed before (using localStorage)
    useEffect(() => {
        const viewed = localStorage.getItem(`viewedSecret-${id}`);
        if (viewed) {
            setHasViewedSecret(true);
        }
    }, [id]);

    const getEncryptedLink = async () => {
        setIsLoading(true);
        setErrorMessage('');
        setIsExpiredOrViewed(false);  // Reset the expired/viewed flag on button click

        try {
            const res = await getSecretById(id, type, password);
            console.log(res);
            if (res.success) {
                if (res.secret) {
                    setSecret(res.secret);
                }
                if (res.file) {
                    setFile(res.file);
                }

                // Mark as viewed
                await markSecretAsViewed(id);
                localStorage.setItem(`viewedSecret-${id}`, 'true');
                setHasViewedSecret(true); // Set the state to true to hide inputs
                setIsExpiredOrViewed(false); // Reset the "secret not available" flag

                // Remove the token query parameter from the URL
                const newQuery = new URLSearchParams(param.toString());
                newQuery.delete('token');
                router.replace(`${pathname}?${newQuery.toString()}`);
            } else {
                if (res.status === 405 || res.status === 406) {
                    setIsExpiredOrViewed(true);
                }
            }
        } catch (error) {
            console.error(error);  // Log the error for debugging purposes
            setErrorMessage(error.message || 'Failed to retrieve secret.');

            // Handle specific password error
            if (error?.response?.status === 401 || error?.response?.status === 403) {
                setErrorMessage('Incorrect password or access denied.');
                setIsExpiredOrViewed(false);  // Keep the expired/viewed flag false if it's a password issue
            } else if (error?.response?.status === 405 || error?.response?.status === 406) {
                // Other errors (secret expired/viewed)
                setIsExpiredOrViewed(true);  // Secret is expired or already viewed
                setErrorMessage(error?.response?.data?.message || 'The secret is expired or already viewed.');
            } else {
                setErrorMessage('Failed to retrieve secret.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Remove secret from localStorage when done (e.g., when the user navigates away)
    useEffect(() => {
        return () => {
            localStorage.removeItem(`viewedSecret-${id}`);
        };
    }, [id]);


    // Function to handle download and count the download
    const handleDownload = async (fileUrl) => {
        try {
            // Make a request to the backend to convert the image to base64
            const response = await fetch(
                `${backend_url}/convert-to-base64?url=${encodeURIComponent(fileUrl)}`
            );
            const res = await response.json();

            if (res?.base64) {
                // Create a PDF with the image
                const pdf = new jsPDF();
                pdf.addImage(res?.base64, "PNG", 10, 10, 180, 160); // Adjust format as needed

                // Download the PDF
                pdf.save(`secret.pdf`);
            }
        } catch (error) {
            console.error("Error downloading or converting the file:", error);
        }
    };


    const isPdfFile = (url) => {
        // Extract the file extension from the URL, ignoring query parameters and fragments
        const filePath = url.split('?')[0].split('#')[0]; // Remove query and fragment
        return filePath.toLowerCase().endsWith('.pdf');
    };

    // console.log(file)


    return (
        <div className='sm:p-8 p-4'>
            <div className='flex flex-col items-center gap-5 mt-10 sm:p-8 p-3'>

                {
                    errorMessage.includes("Failed to retrieve secret") || errorMessage.includes("Secret has expired") ?
                        <h1 className='text-darkBlue text-center font-semibold xl:text-[40px] lg:text-3xl md:text-2xl text-xl'>
                            This secret has already been viewed and is no longer available.
                        </h1>
                        :
                        <h1 className='text-darkBlue text-center font-semibold xl:text-[40px] lg:text-3xl md:text-2xl text-xl'>
                            {isExpiredOrViewed || hasViewedSecret || !id
                                ? 'The secret is no longer available'
                                : 'You have received the following secret'
                            }
                        </h1>
                }




                {errorMessage && (
                    <p className='text-red-500 text-sm'>{errorMessage}</p>
                )}

                {
                    id ?
                        !isExpiredOrViewed && !hasViewedSecret && !secret && (

                            errorMessage.includes("Failed to retrieve secret") || errorMessage.includes("Secret has expired") ? '' :
                                <div className='mt-5 flex w-full items-center gap-4 flex-col'>
                                    {pass === 'yes' && (
                                        <div className='w-full'>
                                            <CustomInput
                                                type={'password'}
                                                placeholder={'Enter Password to view this secret'}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    )}

                                    <button
                                        onClick={getEncryptedLink}
                                        disabled={isLoading}
                                        className='bg-purple text-white p-3 text-lg px-5 w-fit rounded-lg'
                                    >
                                        {isLoading ? 'Loading...' : 'View Secret'}
                                    </button>
                                </div>
                        )
                        :
                        ''
                }

                {!isExpiredOrViewed && secret && !file && (
                    <div className='w-full mt-5 border border-bordered rounded-xl p-4 min-h-32'>
                        {secret}
                    </div>
                )}

                {!isExpiredOrViewed && file && (
                    <div className='w-full mt-5 flex flex-col items-center gap-4 border border-bordered rounded-xl p-4 min-h-32'>
                        {isPdfFile(file) ? (
                            <iframe
                                src={file}
                                className='w-full h-[500px]'
                                title="Secret File"
                                frameBorder="0"
                            />
                        ) : (
                            <img
                                src={file}
                                alt="Secret File"
                                width={500}
                                height={500}
                                className='w-full h-auto rounded-lg'
                            />
                        )}

                        {
                            errorMessage.includes("Failed to retrieve secret") || errorMessage.includes("Secret has expired") ? '' :
                                <button
                                    onClick={() => handleDownload(file)}
                                    className='bg-purple text-white p-3 text-lg px-5 w-fit rounded-lg mt-4'
                                >
                                    Download File
                                </button>
                        }

                    </div>
                )}

                {!isExpiredOrViewed ? (
                    <div className='border border-[#E7B402] bg-[#E7B4020F] p-4 w-full rounded-xl text-[#D47300] md:text-base text-sm'>
                        {
                            id ? (
                                errorMessage.includes("Failed to retrieve secret") ||
                                    errorMessage.includes("Secret has expired") ? (
                                    <span className='font-semibold'>Secret is expired</span>
                                ) : (
                                    <span>
                                        <span className='font-bold'>CAUTION!</span> This page can only be used once to view the secret. Save the secret to a secure location.
                                    </span>
                                )
                            ) : (
                                <span className='font-semibold'>Secret is expired</span>
                            )
                        }

                    </div>
                ) : (
                    <div>
                        <div className='w-full flex justify-center my-5'>
                            <button
                                onClick={() => router.push('/dashboard/tools/send-receive-secret')}
                                className='bg-purple mt-5 text-white p-3 px-5 flex items-center justify-center w-fit rounded-lg gap-2 lg:text-2xl md:text-xl sm:text-base text-sm'
                            >
                                <Image alt='' src={img} />
                                Create New Secret
                            </button>
                        </div>
                        <div className='border border-[#E7B402] bg-[#E7B4020F] p-4 w-full rounded-xl text-[#D47300] md:text-base text-sm'>
                            <span className='font-bold'>REMINDER!</span> Secrets can only be viewed once, then they are gone forever.
                        </div>
                    </div>
                )}

                {!user && (
                    <div className='flex flex-col items-center gap-3'>
                        <h1 className='text-darkBlue mt-10 text-center font-medium ] lg:text-3xl md:text-2xl text-xl'>
                            Create your account to start sharing secrets
                        </h1>
                        <Link href={'/signup'} className='text-white px-4 py-2 rounded-md bg-primary text-center'>Get Registered</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;