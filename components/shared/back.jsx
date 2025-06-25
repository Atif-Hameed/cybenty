import Link from 'next/link';
import React from 'react'
import { FaArrowLeft } from "react-icons/fa6";

const Back = ({href}) => {
    return (
        <Link href={href} className='flex items-center gap-2 hover:text-black text-slate-600 w-fit'>
            <FaArrowLeft className='text-lg' />
            <span>Back</span>
        </Link>
    )
}

export default Back
