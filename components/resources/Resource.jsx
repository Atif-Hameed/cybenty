'use client'
import React, { useEffect, useState } from 'react'
import MaxContainer from '../shared/Layout/MaxContainer'
import { allCategories } from '@/services/api'
import { useRouter } from 'next/navigation'
import { ColorRing } from 'react-loader-spinner'

const Resource = ({ detail }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state
    const [error, setError] = useState(null); // Added error state
    const router = useRouter();

    const getCategories = async () => {
        setLoading(true); // Start loading
        setError(null); // Reset any previous error
        try {
            const res = await allCategories();
            setCategories(res.categories);
        } catch (error) {
            setError(error.message); // Set error message
        } finally {
            setLoading(false); // End loading
        }
    };

    const handleExpand = (id, title) => {
        let url = title.toLowerCase().replace(/\s+/g, '-'); // Convert title to a slug
        if (url.includes('?')) {
            url = url.split('?')[0]; // Remove everything after and including '?'
        }
        if (url === 'share-password-securely-online') {
            router.push(`/#`);
        } else {
            router.push(`/${url}?id=${id}`);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className={`flex justify-center bg-white ${detail == 'hide' ? 'sm:py-10 py-8' : 'sm:py-20 py-8'}  `}>
            <MaxContainer>
                <div className='flex flex-col items-center justify-center md:gap-6 gap-2 w-[80%] sm:px-0 px-2'>
                    {
                        detail == 'hide' ?
                            <h1 className='text-secondary lg:text-[40px] md:text-3xl text-center font-semibold text-2xl'>Explore More</h1>
                            :
                            <div>
                                <h1 className='text-secondary lg:text-[40px] md:text-3xl text-center font-semibold text-2xl'>Resources</h1>
                                <p className='md:text-lg sm:text-sm text-xs font-light sm:w-[92%] w-full text-center md:mt-2'>
                                    During our training courses, you’ll learn about a multitude of technological security topics,
                                    by examining real-world cases and dissecting how exactly cyber criminals gain access to your
                                    private and confidential information.
                                </p>
                            </div>
                    }


                    {/* Loading and Error states */}
                    {loading &&
                        <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#FF876C', '#FF876C', '#FF876C', '#FF876C', '#FF876C']}
                        />
                    }
                    {error && <p className="text-red-500 mt-4">{error}</p>}

                    {!loading && !error && (
                        <div className='grid md:grid-cols-3 grid-cols-1 gap-y-3 md:gap-0 gap-4 mt-5'>
                            {categories.map((e, i) => (
                                <div
                                    onClick={() => handleExpand(e._id, e.title)}
                                    key={i}
                                    className={`lg:px-8 sm:px-4 cursor-pointer sm:mt-6 mt-0 ${(i == 2 || i == 5) ? 'border-0' : 'md:border-r-2'}  md:border-[#00000040]`}>
                                    <div className={`space-y-3 lg:pl-6 sm:pl-4 ${detail == 'hide' ? 'p-1' : 'p-4'} h-full hover:bg-glassDark flex flex-col sm:items-start items-center rounded-lg`}>
                                        {
                                            detail != 'hide' &&
                                            <div className='h-[130px]  flex justify-start'>
                                                <img alt='' src={e.icon} className='h-full w-full object-cover' unoptimized />
                                            </div>
                                        }

                                        <h1 className='xl:text-2xl lg:text-xl md:text-lg font-semibold'>{e.title}</h1>
                                        <p className={`text-gray lg:text-base sm:text-sm text-xs sm:text-start text-center  ${detail == 'hide' ? 'line-clamp-2 ' : 'line-clamp-5'}  `}>
                                            {e.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </MaxContainer>
        </div>
    );
}

export default Resource;
