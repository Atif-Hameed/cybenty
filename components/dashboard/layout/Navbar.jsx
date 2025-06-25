'use client'
import React from 'react'
import { IoIosSearch } from "react-icons/io";
import notification from '@/public/assets/icons/notification.svg'
import profile from '@/public/assets/icons/profile.svg'
import Image from 'next/image';
import { RiMenu3Fill } from "react-icons/ri";
import { IoIosArrowDropdown } from "react-icons/io";
import { useSelector } from 'react-redux';


const Navbar = ({ toggleSidebar }) => {

    const user = useSelector((state) => state?.user?.user);
    // console.log(user)

    return (
        <div className='flex justify-between w-full border-b bg-white border-bordered p-3 px-6'>

            <div className='w-[35%] bg-[#F5F6FA] border border-bordered px-4 p-1.5 rounded-full md:flex hidden items-center gap-2'>
                <div className='w-fit ' >
                    <IoIosSearch />
                </div>
                <input type="text" className='outline-none bg-transparent placeholder:text-[#202224]' placeholder='Search' name="" id="" />
            </div>

            <div className='md:flex hidden items-center gap-5 w-[50%] justify-end'>
                <div>
                    <Image alt='' src={notification} />
                </div>
                {/* <div>
                    <Image alt='' src={profile} />
                </div> */}
                <div className='text-[#404040]'>
                    <h1 className='font-bold text-sm'>{user?.name}</h1>
                    <p className='text-xs font-semibold'>{user?.role}</p>
                </div>
                <div>
                    <IoIosArrowDropdown className='text-xl' />
                </div>
            </div>



            {/* mobile view */}
            <button className='block md:hidden text-xl' onClick={toggleSidebar}>
                <RiMenu3Fill className='text-xl' />
            </button>

            <div className='md:hidden flex items-center gap-3'>
                <div>
                    <Image alt='' src={profile} />
                </div>
                <div className='text-[#404040]'>
                    <h1 className='font-bold text-sm'>Alexa</h1>
                    <p className='text-xs font-semibold'>Admin</p>
                </div>
            </div>
        </div>
    )
}

export default Navbar
