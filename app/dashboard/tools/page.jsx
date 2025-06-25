import AuthHeading from '@/components/shared/AuthHeading'
import { ToolsCardData } from '@/data'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Page = () => {
    return (
        <div className="bg-white flex flex-col items-start font-poppins justify-center p-6">
            <AuthHeading>
                <p className='text-start w-full font-bold text-darkBlue mt-3'>Tools</p>
            </AuthHeading>
            <p className='text-gray text-lg mt-2'>A list of credible tools to help you increase your personal cybersecurity posture.</p>

            <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-6 gap-8' >
                {
                    ToolsCardData.map((e, i) => (
                        <div key={i} className={`border-[#00000029] border-[1px] h-full flex flex-col gap-5 justify-between p-4 hover:border-2 rounded-lg hover:border-[#CF9FFF]`} >
                            <div className='flex flex-col gap-5'>
                                <div className=' ' >
                                    <Image alt='' src={e.img} />
                                </div>

                                <h1 className='text-[#202020] xl:text-2xl text-xl font-semibold'>{e.name}</h1>
                                <p className='text-gray'>{e.des}</p>
                            </div>
                            <Link href={e.src} className='flex items-center justify-center gap-3 border-[#CF9FFF] border rounded-md py-2 px-4 w-full'>
                                Get Started
                                <svg width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M-2.40413e-07 5.5C-2.47496e-07 5.66205 0.0639608 5.81747 0.177816 5.93206C0.29167 6.04665 0.446089 6.11103 0.607103 6.11103L14.9263 6.11103L11.1051 9.9556C10.9911 10.0703 10.9271 10.2259 10.9271 10.3882C10.9271 10.5505 10.9911 10.7061 11.1051 10.8208C11.2191 10.9355 11.3738 11 11.535 11C11.6962 11 11.8508 10.9355 11.9648 10.8208L16.8216 5.93261C16.8782 5.87585 16.923 5.80842 16.9536 5.73419C16.9842 5.65995 17 5.58037 17 5.5C17 5.41963 16.9842 5.34005 16.9536 5.26582C16.923 5.19158 16.8782 5.12415 16.8216 5.06739L11.9648 0.179191C11.9084 0.12238 11.8414 0.0773158 11.7676 0.0465701C11.6939 0.0158244 11.6148 -2.35394e-07 11.535 -2.38884e-07C11.3738 -2.45931e-07 11.2191 0.0644566 11.1051 0.179191C10.9911 0.293925 10.9271 0.449538 10.9271 0.611797C10.9271 0.774056 10.9911 0.929669 11.1051 1.0444L14.9263 4.88898L0.607103 4.88897C0.446089 4.88897 0.29167 4.95335 0.177816 5.06794C0.0639608 5.18253 -2.33329e-07 5.33795 -2.40413e-07 5.5Z" fill="#CF9FFF" />
                                </svg>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Page
