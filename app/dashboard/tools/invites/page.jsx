'use client'
import SendInvite from '@/components/dashboard/tools/SendInvite';
import SentInvites from '@/components/dashboard/tools/SentInvites';
import React, { useState } from 'react'

const Page = () => {

    const [activeTab, setActiveTab] = useState('1');

    const tabs = [
        { name: 'Send Invite', id: '1', component: <SendInvite/> },
        { name: 'Sent Invites', id: '2', component: <SentInvites/> },
    ];

    return (
        <div className='sm:p-8 p-6'>
            <div className='sm:p-8 p-5 bg-white border border-bordered rounded-xl' >
                <div className='flex items-center gap-8 justify-start'>
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
                    <div className='flex flex-col items-start gap-5 mt-10'>
                        <h1 className='text-darkBlue text-start font-semibold xl:text-[40px] lg:text-3xl md:text-2xl text-xl'>
                            Send Invites
                        </h1>
                        <p className='text-lg text-gray'>Invite non-members to create an account. They will receive an email with a link to register.</p>
                    </div>
                    {tabs.find((tab) => tab.id === activeTab)?.component}
                </div>
            </div>
        </div>
    )
}

export default Page
