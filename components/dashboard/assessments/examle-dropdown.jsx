'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { HiOutlinePlus } from 'react-icons/hi'
import { RiExternalLinkLine } from "react-icons/ri";

const ExamleDropdown = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Reset isOpen when data changes (quiz changes)
    useEffect(() => {
        setIsOpen(false);
    }, [data]);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className='border border-bordered rounded-md h-full'>
            <div 
                onClick={handleOpen} 
                className={`${isOpen ? 'border-b rounded-t-md' : 'rounded-md'} cursor-pointer w-full flex justify-between p-3 items-center sm:text-xl font-semibold border-bordered bg-[#FCFDFE]`}
            >
                <h1>Real Time Examples</h1>
                <HiOutlinePlus className={`text-xl transition-transform ${isOpen ? 'rotate-45' : ''}`} />
            </div>
            {
                isOpen &&
                <div className='flex flex-col gap-3 p-4'>
                    {data?.exampleDescription &&
                        <div className='border border-bordered rounded-md p-3'>
                            {data?.exampleDescription}
                        </div>
                    }

                    {data?.media &&
                        <div className='border border-bordered rounded-md p-3 flex justify-center'>
                            <div className='xl:w-40 w-32 xl:h-40 h-32 flex justify-center items-center rounded-full'>
                                <img src={data?.media} className='w-full h-full object-cover' alt="" />
                            </div>
                        </div>
                    }
                    {data?.url &&
                        <Link href={data?.url} className='bg-purple px-6 py-2 flex items-center gap-2 w-fit rounded-full text-white'>
                            Visit <RiExternalLinkLine className='text-white' />
                        </Link>
                    }
                </div>
            }
        </div>
    )
}

export default ExamleDropdown