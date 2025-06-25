'use client'
import Button from '@/components/shared/Button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { GrAttachment } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import demo1 from '@/public/assets/images/demo1.png'
import { countResourceDownloads, getResourcesByCategoryId, indiviualResource } from '@/services/api';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import MaxContainer from '@/components/shared/Layout/MaxContainer';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';


const Page = () => {

    const param = useSearchParams();
    const id = param.get('id');
    const pathname = usePathname();
    const targetId = param.get('targetId');
    const category = param.get('category');
    const [resources, setResources] = useState([]);
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true);
    const [emailLoading, setEmailLoading] = useState(false);  // Loading state for email submission
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const [filteredResources, setFilteredResources] = useState([]);
    const [text, setText] = useState('Copy');
    const [formData, setFormData] = useState({
        email: '',
        imgSrc: '',
    })

    const [shareUrl, setShareUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const baseUrl = window.location.origin; // Get the full domain
            setShareUrl(`${baseUrl}${pathname}?id=${id}&targetId=${targetId}&category=${category}`);
        }
    }, [id, targetId, category, pathname]);

    // console.log(isLoggedIn)

    const getResources = async () => {
        setLoading(true);  // Set loading to true before fetching
        try {
            const res = await getResourcesByCategoryId(id);
            setResources(res.resources || []); // Ensure it's an array

            // Filter resources by the category and exclude the current targetId
            const filtered = (res.resources || []).filter(resource =>
                resource.description.pictureCategory === category && resource._id !== targetId
            );

            // Limit to maximum 3 resources
            setFilteredResources(filtered.slice(0, 3));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);  // Set loading to false after fetching
        }
    };


    const getTargetResource = async () => {
        setLoading(true);
        try {
            const res = await indiviualResource(targetId);
            // console.log(res);
            setData(res.resource);
            setFormData((prevFormData) => ({
                ...prevFormData,
                imgSrc: res.resource.description.picture // Set the image source here
            }));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);  // Set loading to false after fetching
        }
    }

    useEffect(() => {
        getResources();
        getTargetResource();
    }, [id, targetId]);

    const handleChange = (e) => {
        setError('');
        setMessage('');
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setEmailLoading(true);  // Set email loading to true during submission

        if (!formData.email) {
            setError('Please enter your email.');
            setEmailLoading(false);  // Stop loading on error
            return;
        }

        try {
            const response = await axios.post('/api/send-img', formData);

            // console.log(response)

            if (response.status == 200) {
                setMessage('Email sent successfully');
                setFormData({
                    email: '',
                    imgSrc: formData.imgSrc,  // Reset email, but keep imgSrc
                });
            } else {
                setError(response.message);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setEmailLoading(false);  // Stop loading after submission attempt
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl)
            .then(() => {
                setText('Copied'); // Update text to "Copied"

                // Reset the text back to "Copy" after 2 seconds
                setTimeout(() => {
                    setText('Copy');
                }, 2000);
            })
            .catch(() => {
                setText('Failed to copy');
            });
    }


    // Function to handle download and count the download
    const handleDownload = async () => {
        try {
            // Call the API to count the download
            await countResourceDownloads(targetId);
            // Redirect to the actual image link for download
            window.open(data?.description?.picture, '_blank');
        } catch (error) {
            console.error('Error counting download:', error);
        }
    };



    const handleChangeIMG = (newId, newCategory) => {
        if (typeof window !== 'undefined') {
            const baseUrl = window.location.origin; // Get the full domain
            setShareUrl(`${baseUrl}${pathname}?id=${id}&targetId=${newId}&category=${newCategory}`);
        }
        router.push(`/infographics/infographic-detail?id=${id}&targetId=${newId}&category=${newCategory}`)
    }


    return (
        <div className='flex justify-center bg-white sm:py-20 py-8'>
            <MaxContainer>
                <div className='flex flex-col items-center justify-center md:gap-6 gap-2 sm:w-[80%] w-[90%] sm:px-0 px-2'>

                    <div className='w-full flex justify-start'>
                        <Link href={`/infographics?id=${id}`} className='flex items-center cursor-pointer hover:text-orangeMain  gap-4 '>
                            <FaArrowLeft />
                            Back
                        </Link>
                    </div>

                    <div className='w-full bg-white sm:p-5 relative'>
                        <div className='flex gap-8 lg:flex-row flex-col items-start lg:items-end'>
                            {loading ? (
                                <div className='flex justify-center items-center my-10'>
                                    <p>Loading...</p> {/* Replace with a spinner if needed */}
                                </div>
                            ) : data === '' ? (
                                <div className='flex justify-center w-full font-semibold items-center my-10'>
                                    <p>No Image Found</p>
                                </div>
                            ) : (
                                <div className='lg:w-[65%] w-full flex justify-center items-center'>
                                    <img alt='' src={data.description.picture} className='w-full object-cover sm:h-[450px] h-[300px]' />
                                </div>
                            )}

                            <div className='lg:w-[35%] w-full'>
                                <h1 className=' text-xl font-medium'>Download for free</h1>

                                {
                                    isLoggedIn ?
                                        <div className='mb-8 mt-4'>
                                            <div onClick={() => handleDownload()} className='text-white  bg-orangeMain px-4 py-2 w-fit rounded-md' >Download</div>
                                        </div>
                                        :
                                        <div>
                                            <div className='my-6'>
                                                <h1 className='text-[#202020] mb-2 sm:text-lg'>
                                                    Enter your email address <span className='text-[#FF5E3A]'>*</span>
                                                </h1>
                                                <form onSubmit={handleSubmit}>
                                                    <input
                                                        type="email"
                                                        className='bg-[#407BFF0A] w-full p-3 mb-3 outline-none border-none rounded-lg'
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                    />
                                                    <div className='w-fit'>
                                                        <Button onClick={() => handleDownload()} label={emailLoading ? 'Sending...' : 'Send me a Copy'} type="submit" />
                                                    </div>
                                                </form>
                                                {error && <p className="text-red-500 mt-2">{error}</p>}
                                                {message && <p className="text-green-500 mt-2">{message}</p>}
                                            </div>

                                            <h1 className='text-xl font-medium'>Get Unlimited Downloads</h1>
                                           {isLoggedIn ? "" : <p className='sm:text-lg'>
                                                Existing User? <Link href={'/login'} className='text-orangeMain'>Sign in</Link>
                                            </p>}
                                        </div>
                                }


                                <div className='mt-4'>
                                    <h1 className='font-medium lg:text-2xl mb-3 sm:text-xl text-lg'>Share this Poster</h1>
                                    <div className='flex items-center lg:flex-nowrap px-2 py-1 flex-wrap justify-between w-full border h-full border-[#00000017]  rounded-md'>
                                        <div className='flex items-center h-full sm:w-[70%] w-full'>
                                            <div className=' px-3 flex justify-center items-center'>
                                                <GrAttachment className='text-gray' />
                                            </div>
                                            <p className=' h-full text-gray w-fit truncate'>{shareUrl}</p>
                                        </div>
                                        <div className='h-full py-1.5 flex sm:justify-start justify-end sm:w-auto w-full'>
                                            <button onClick={handleCopy} className='bg-orangeMain  text-white text-sm py-2 px-6 rounded-md'>{text}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='my-4'>
                            <h1 className='font-medium sm:text-3xl text-xl'>{data?.title}</h1>
                            {filteredResources.length > 0 ? (
                                <div className='mt-20'>
                                    <h1 className='sm:text-3xl mb-4 text-xl font-medium'>You might also like</h1>
                                    <div className='grid md:grid-cols-3 grid-cols-1 gap-4'>
                                        {filteredResources.map((resource) => (
                                            <div onClick={() => handleChangeIMG(resource._id, resource.description.pictureCategory)} key={resource._id} className='bg-[#D1FFDE2E] p-8 w-full flex justify-center items-center'>
                                                <img alt={resource.title} src={resource.description.picture || ''} className='h-[300px] object-cover w-full' />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null /* Hide section if no suggestions */}
                        </div>
                    </div>
                </div>
            </MaxContainer>
        </div>
    )
}

export default Page;
