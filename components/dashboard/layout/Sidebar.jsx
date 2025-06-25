'use client';
import React, { useState } from 'react';
import logo from '@/public/assets/images/logomain.png';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SidebarData } from '@/data';
import { IoExitOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '@/store/userSlice';

const Sidebar = () => {
    const pathName = usePathname();
    const dispatch = useDispatch();
    const router = useRouter();
    const [openTabs, setOpenTabs] = useState({});
    const user = useSelector((state) => state?.user?.user);

    const toggleTab = (index) => {
        setOpenTabs((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const handleLogout = () => {
        dispatch(clearUser());
        router.push('/login')
    };

    //generate URL with email parameter
    const getLinkUrl = (src) => {
        if (src === '/dashboard/data-leak-monitor' && user?.email) {
            return `${src}?email=${encodeURIComponent(user.email)}`;
        }
        return src;
    };

    return (
        <div className='w-full h-full flex-grow pb-1 md:z-40 z-50 flex justify-between items-center flex-col pt-4 bg-white border-r border-bordered'>
            <div className='flex flex-col items-start gap-5 w-[85%]'>
                {/* logo and icons */}
                <Link href={'/'} className='flex items-center gap-3 justify-between w-full'>
                    <Image alt='logo' src={logo} className='w-52' />
                </Link>

                {/* menu */}
                <div className='flex flex-col gap-1 text-sm font-inter w-full'>
                    {SidebarData.map((e, i) => {
                        const url = getLinkUrl(e.src);
                        const isActive = e.src && pathName.startsWith(e.src);
                        const hasSubTabs = e.subTabs && e.subTabs.length > 0;
                        const isOpen = openTabs[i] || isActive;

                        return (
                            <div key={i} className='w-full'>
                                <Link
                                    key={i}
                                    href={url || '#'}
                                    onClick={() => hasSubTabs && toggleTab(i)}
                                    className={`relative px-3 py-3 w-[90%] flex items-center gap-3 rounded-md ${isActive ? 'bg-primary text-white' : 'bg-transparent text-black'
                                        }`}
                                >
                                    {/* Vertical line on the left for active item */}
                                    {isActive && (
                                        <div className='absolute -left-[10.3%] top-0 h-full w-1 bg-primary rounded-r-md'></div>
                                    )}
                                    <div>{isActive ? e.activeIcon : e.normalIcon}</div>
                                    <p className='text-ellipsis w-full truncate overflow-hidden'>{e.name}</p>
                                </Link>
                                {/* Sub Tabs */}
                                {isOpen && hasSubTabs && (
                                    <div className='pl-4'>
                                        {e.subTabs.map((subTab, j) => {
                                            const isSubActive = pathName.startsWith(subTab.src);

                                            return (
                                                <Link
                                                    key={j}
                                                    href={subTab.src}
                                                    className={`px-1 py-2 w-[90%] flex items-center gap-3 rounded-md ${isSubActive ? ' text-black' : ' text-gray'}`}
                                                >
                                                    <li>{subTab.name}</li>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className='pt-10 h-[15%] px-3 w-full flex justify-center items-start border-t border-bordered'>
                <div onClick={() => handleLogout()} className='flex cursor-pointer items-center w-[85%] justify-start gap-4'>
                    <div className='w-fit'>
                        <IoExitOutline className='text-3xl text-gray' />
                    </div>
                    <p>Logout</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
