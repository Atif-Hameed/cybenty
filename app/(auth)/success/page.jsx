'use client'
import Image from 'next/image';
import React, { useEffect } from 'react';
import tick from '@/public/assets/icons/tick.png';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const Page = () => {
    const params = useSearchParams();
    const id = params.get('id');
    const userType = params.get('type');
    const router = useRouter();
    const createBy = params.get('createBy');

    useEffect(() => {
        const timer = setTimeout(() => {
            if (userType === 'new-user') {
                router.push(`/topics?id=${id}&type=${userType}&createBy=''`);

            } else if (createBy === 'admin') {
                router.push(`/topics?id=${id}&createBy=admin`);
            } else {
                router.push('/dashboard')
            }


        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#2c2c2c5e]">
            <div className="bg-white p-10 rounded-lg flex flex-col gap-6 items-center">
                <div className="flex w-full justify-center">
                    <Image alt="tick icon" src={tick} className='w-20' />
                </div>
                <div>
                    <h1 className="text-4xl font-semibold text-center">Your Email Verified<br /> Successfully</h1>
                </div>
            </div>
        </div>
    );
};

export default Page;
