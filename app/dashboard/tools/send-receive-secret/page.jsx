'use client'
import SendFile from '@/components/dashboard/tools/SendFile';
import SendText from '@/components/dashboard/tools/SendText';
import Link from 'next/link';
import React, { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';

const Page = () => {

    const [activeTab, setActiveTab] = useState('1');

    const tabs = [
        { name: 'Send Text', id: '1', component: <SendText /> },
        { name: 'Send File', id: '2', component: <SendFile /> },
    ];

    return (
        <div className='sm:p-8 p-6'>
            <div className='sm:p-8 p-5  bg-white border relative border-bordered rounded-xl' >
                <div className='absolute md:-top-7 -top-6 left-0 w-full flex justify-start'>
                    <Link href={'/dashboard/share-secret'} className='flex items-center md:text-base text-sm cursor-pointer hover:text-primary  gap-4 '>
                        <FaArrowLeft />
                        Back
                    </Link>
                </div>
                <div className='flex items-center gap-8 justify-center'>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            disabled={tab.id === '3'}
                            className={`w-fit px-4  py-2 ${activeTab === tab.id ? 'bg-purple rounded-md text-white' : 'bg-transparent text-black'}`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>
                <div className='mt-4  bg-white'>
                    {tabs.find((tab) => tab.id === activeTab)?.component}
                </div>
            </div>
        </div>
    )
}

export default Page
