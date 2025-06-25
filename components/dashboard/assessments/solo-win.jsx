'use cleint'
import Image from 'next/image'
import React from 'react'
import congrats from '@/public/assets/images/congrats.svg'
import { useRouter } from 'next/navigation'

const SoloWin = ({ onClose, totalQuestions, correctAnswers, totalPoints, assessmentId, assignmentId }) => {

    const router = useRouter();

    return (
        <div className='bg-white flex flex-col gap-3' >
            <div className='w-full flex flex-col items-center gap-4'>
                <Image alt='' src={congrats} className='h-44' />

                <h1><span className='font-semibold'>Total Question :</span> {totalQuestions}</h1>
                <h1><span className='font-semibold'>Correct Answers :</span> {correctAnswers}</h1>
                <h1><span className='font-semibold'>Total points :</span> {totalPoints}</h1>
            </div>

            <div className='flex items-center gap-3 mb-2'>
                <button onClick={() => router.push('/dashboard/assessments')} className='bg-purple mt-4 text-white w-full text-center py-2 rounded-lg' >
                    Go Back
                </button>
                <button onClick={() => router.push(`/dashboard/assessments/recommendations/${assignmentId}?assessmentId=${assessmentId}`)} className='bg-purple mt-4 text-white w-full text-center py-2 rounded-lg' >
                    Recommendations
                </button>
            </div>

        </div>
    )
}

export default SoloWin
