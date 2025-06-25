'use client';
import React, { useEffect, useState } from 'react';
import Stats from './stats';
import lock from '@/public/assets/icons/lock.svg';
import Image from 'next/image';
import AssessmentDetail from './assessment-detail';

const Assessments = ({ assigned, unassigned, user, userScore, userAcheivements }) => {
    const [selectedAssessment, setSelectedAssessment] = useState(assigned[0] || unassigned[0]); // Default to first item
    const [count, setCount] = useState(1);
    const [isComplete, setIsComplete] = useState(false);
    const [isSelectedAssigned, setIsSelectedAssigned] = useState(!!assigned[0]);
    const [showDetailMobile, setShowDetailMobile] = useState(false); // New state for mobile visibility
    const [isMobile, setIsMobile] = useState(false); // New state for mobile detection

    // Add this effect to handle window resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Set initial value
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    // Add _isAssigned flag without restructuring
    const assignedWithFlag = assigned.map(item => ({
        ...item,
        _isAssigned: true
    }));

    const unassignedWithFlag = unassigned.map(item => ({
        ...item,
        _isAssigned: false
    }));

    // Combine with assigned first
    const allItems = [...assignedWithFlag, ...unassignedWithFlag];

    const handleAssessmentClick = (item, count) => {
        // Update completion status
        setIsComplete(item._isAssigned && item.status === 'COMPLETED');

        // Update the selected assessment
        setSelectedAssessment(item);
        setIsSelectedAssigned(item._isAssigned);
        setCount(count);
        if (isMobile) {
            setShowDetailMobile(true);
        }
    };

    return (
        <div className={`p-4 lg:px-6 flex md:flex-row flex-col items-start relative gap-4 w-full`}>

            <div className='xl:w-[67%] lg:w-[63%] md:w-[60%] w-full'>
                <Stats openDetail={true} userScore={userScore} userAcheivements={userAcheivements} />
                <div className={`overflow-auto max-h-[74%] grid lg:grid-cols-3 sm:grid-cols-3 grid-cols-2 xl:gap-16 gap-6 rounded-xl sm:p-6 p-3 my-4`}>
                    {allItems.map((item, index) => {
                        const assessmentData = item._isAssigned ? item : item;
                        const status = item._isAssigned ? item.status : null;
                        return (
                            <div
                                key={assessmentData._id}
                                className={`flex flex-col h-full justify-between items-center gap-4 w-full cursor-pointer`}
                                onClick={() => handleAssessmentClick(item, index + 1)}
                            >
                                <div className=' bg-white rounded-full w-full' >
                                    <div
                                        style={{
                                            backgroundColor: assessmentData?.background || '#ffffff',
                                        }}
                                        className='relative w-full overflow-hidden aspect-square flex items-center justify-center rounded-full'>
                                        <div className={`w-full h-full flex items-center justify-center`}>
                                            <Image
                                                src={assessmentData.logo}
                                                alt={assessmentData.assessmentName}
                                                width={500}
                                                height={500}
                                                className='w-[60%] rounded-full h-[60%] object-cover'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <h1 className='text-center font-medium lg:text-base text-sm'>
                                    {assessmentData.assessmentName}
                                </h1>
                                {!item._isAssigned ? (
                                    <button className='text-darkPurple text-xs flex items-center gap-1 border border-darkPurple rounded-full py-3 px-2 xl:w-[80%] w-full justify-center'>
                                        Start
                                    </button>
                                ) : (
                                    <button className={`text-darkPurple text-xs flex items-center gap-1 border border-darkPurple rounded-full py-3 px-2 xl:w-[80%] w-full justify-center ${status === 'COMPLETED' ? 'bg-green-100' : ''}`}>
                                        {'Continue'}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* AssessmentDetail component - conditionally rendered on mobile */}
            {(!isMobile || showDetailMobile) && (
                <div className={`lg:w-[25%] md:w-[26%] md:h-[calc(100%-100px)] md:mt-0 -mt-4 w-full z-40 fixed md:top-auto top-auto md:right-8 right-0`}>
                    <AssessmentDetail
                        onClose={() => setShowDetailMobile(false)}
                        assessment={selectedAssessment}
                        count={count}
                        user={user}
                        isAssigned={isSelectedAssigned}
                        isComplete={isComplete}
                    />
                </div>
            )}
        </div>
    );
};

export default Assessments;