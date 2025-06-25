'use client'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import logo from '@/public/assets/images/logomain.png';
import Button from '../Button';
import { Navs } from '@/data';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { CgMenu } from "react-icons/cg";
import { usePathname } from 'next/navigation';
import { clearUser } from '@/store/userSlice';


const Navbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const pathname = usePathname();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  // Function to handle navbar toggle
  const handleToggleNav = () => {
    setOpenNav((prev) => !prev);
  };

  // Effect to close navbar when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (openNav && !event.target.closest('.mobile-nav') && !event.target.closest('.menu-icon')) {
        setOpenNav(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [openNav]);

  useEffect(() => {
    setOpenNav(false)
  }, [pathname])

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <div className='relative w-full font-hind_madurai'>

      <div className='flex justify-center bg-white  w-full py-2 xl:px-0 px-4'>
        <div className='xl:w-[80%] lg:w-[90%] sm:w-[80%] w-full flex justify-between items-center gap-5'>
          <Link href={'/'}>
            <Image alt='' src={logo} className='w-40' unoptimized />
          </Link>

          <div className='lg:flex hidden items-center gap-3 xl:w-[52%] w-[55%] max-auto justify-between'>
            {Navs.map((e, i) => (
              <Link href={e.src} key={i} className='font-medium'>
                {e.name}
              </Link>
            ))}
          </div>

          {
            !isLoggedIn ?
              <div className='lg:flex hidden items-center gap-1 whitespace-nowrap'>
                <Link href={'/login'} >
                  <button className='font-semibold text-lg bg-white px-10 py-3 rounded-lg hover:shadow-md'>Sign In</button>
                </Link>
                <Link href={'/signup'} className='w-fit '>
                  <Button label={'Sign Up'} />
                </Link>
              </div>
              :
              <div className='lg:flex hidden items-center gap-1 whitespace-nowrap'>
                <Link href={'/dashboard/home'} >
                  <button className='font-semibold text-lg bg-white px-6 py-3 rounded-lg hover:shadow-md'>Dashboard</button>
                </Link>
                <div className='w-fit '>
                  <Button onClick={handleLogout} label={'Log out'} />
                </div>
              </div>
          }


          {/* Mobile Menu Icon */}
          <div onClick={handleToggleNav} className='lg:hidden block menu-icon'>
            <CgMenu className="text-2xl" />
          </div>
        </div>
      </div>

      {/* Overlay and Mobile Navbar toggle */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300 ease-in-out ${openNav ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={handleToggleNav}
      ></div>

      <div className={`fixed top-0 left-0 h-full w-[60%] bg-white overflow-auto shadow-lg md:px-12 p-5 z-20 transition-transform transform ${openNav ? 'translate-x-0' : '-translate-x-full'} duration-300 ease-in-out mobile-nav`}>
        <div className='mobile-nav flex flex-col items-center justify-between h-full'>

          <div className='flex flex-col items-center  justify-between'>
            <Link href={'/'} className="mb-4">
              <Image alt='' src={logo} unoptimized />
            </Link>
            <div className='flex flex-col  gap-3 justify-between'>
              {
                Navs.map((e, i) => (
                  <Link href={e.src} key={i} className='font-medium py-2 md:text-2xl text-lg'>
                    {e.name}
                  </Link>
                ))
              }
            </div>
          </div>

          {
            !isLoggedIn ?
              <div className='flex flex-col items-center gap-4 w-full whitespace-nowrap mt-4'>
                <Link href={'/login'} className='w-full'>
                  <button className='font-semibold md:text-2xl text-lg w-full bg-white px-10 py-3 rounded-lg shadow-md'>Sign In</button>
                </Link>
                <Link href={'/signup'} className='w-full '>
                  <Button label={'Sign Up'} />
                </Link>
              </div>
              :
              <div className='flex flex-col items-center gap-4 w-full whitespace-nowrap mt-4'>
                <Link href={'/dashboard/home'} >
                  <button className='font-semibold md:text-2xl text-lg bg-white px-10 py-3 rounded-lg hover:shadow-md'>Dashboard</button>
                </Link>
                <div className='w-fit '>
                  <Button onClick={handleLogout} label={'Log out'} />
                </div>
              </div>
          }

        </div>
      </div>
    </div>
  );
};

export default Navbar;
