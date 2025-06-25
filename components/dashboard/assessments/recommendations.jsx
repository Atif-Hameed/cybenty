'use client'
import Heading from '@/components/shared/Heading';
import { updateAssignment } from '@/services/assignment';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';

const Recommendation = ({ data }) => {
    const [recommendations, setRecommendations] = useState(data.recommendations || []);
    const router = useRouter();


    const markAssignmentComplete = async (index) => {
        try {
            const updatedRecommendations = [...recommendations];
            updatedRecommendations[index].status = 'complete';
            
            const res = await updateAssignment(data._id, { recommendations: updatedRecommendations });

            setRecommendations(updatedRecommendations);
            router.refresh();
        } catch (error) {
            console.error('Error updating assignment:', error);
        }
    };

    return (
        <div className="mx-auto sm:p-8 p-4">
            {/* Header */}
            <div className="flex items-center justify-between sm:flex-row flex-col mb-6 gap-4">
                <div>
                    <Link href="/dashboard/assessments/list" className="text-gray text-l flex items-center gap-2">
                        <IoArrowBackOutline />
                        Back
                    </Link>
                    <Heading className="text-start">
                        <span className="text-darkBlue">Cyber Security Recommendation</span>
                    </Heading>
                </div>
                <span className={`text-lg font-medium text-end sm:w-fit w-full ${data.status === 'COMPLETED' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {data.status}
                </span>
            </div>

            {/* Recommendation Cards */}
            {recommendations.map((item, index) => (
                <div key={index} className="border border-bordered rounded-lg p-6 mb-4 shadow-sm">
                    <h2 className="font-semibold sm:text-2xl text-xl mb-2">{item.title}</h2>
                    <p className="text-gray text-sm mb-4">{item.description}</p>

                    <div className="flex justify-end flex-wrap gap-3 items-center">
                        {item.status === 'complete' ? (
                            <button className="bg-white text-green-600 border-2 border-dashed border-darkPurple rounded-lg py-2 px-4 cursor-default">
                                Completed
                            </button>
                        ) : (
                            <button
                                onClick={() => markAssignmentComplete(index)}
                                className="bg-purple text-white rounded-lg py-2 px-4"
                            >
                                Mark as complete
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Recommendation;
