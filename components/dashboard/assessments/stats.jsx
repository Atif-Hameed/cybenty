import React from 'react'
import trophy from '@/public/assets/images/trophy.svg'
import Image from 'next/image'


const Stats = ({ openDetail, userScore, userAcheivements }) => {

    return (
        <div className={`grid ${openDetail ? 'xl:grid-cols-2 grid-cols-1' : 'xl:grid-cols-2 sm:grid-cols-2 grid-cols-1'}  gap-3`}>
            <div className='border border-bordered rounded-xl flex items-center  px-4 py-3' >
                <div>
                    <div className='text-gray flex flex-col justify-center  gap-1' >
                        <p>Inturity Score</p>
                        <h1 className='text-purple sm:text-2xl text-xl font-bold'>{userScore?.totalScore || '-'}</h1>
                        {/* <p className='flex items-center gap-3 whitespace-nowrap'><span className='font-medium text-dark'>Date:</span><span>12 Jan, 2024</span></p> */}
                    </div>
                </div>
            </div>
            <div className='border border-bordered rounded-xl px-4 py-3' >
                <div className='flex items-center justify-between w-full'>
                    <div className='text-gray flex flex-col gap-1' >
                        <p>Achievements</p>
                        <h1 className='text-purple text-2xl font-bold'>{userAcheivements?.firstPositions || '-'}</h1>
                        {/* <p className='flex items-center gap-3 whitespace-nowrap'><span className='font-medium text-dark'>Date:</span><span>12 Jan, 2024</span></p> */}
                    </div>
                    <div>
                        <Image alt='' src={trophy} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats
