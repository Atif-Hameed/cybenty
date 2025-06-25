'use client'
import React from 'react';

const TimeUpModal = ({ handleFinishAssessment }) => {

    return (
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                    <svg
                        className="h-6 w-6 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 mt-3">
                    Time&apos;s Up!
                </h3>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        Your assessment time has ended. All unanswered questions have been automatically submitted.
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Your responses have been saved and your results are being calculated.
                    </p>
                </div>
            </div>
            <div className="mt-5 sm:mt-6">
                <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-darkPurple  sm:text-sm"
                    onClick={handleFinishAssessment}
                >
                    View Results
                </button>
            </div>
        </div>
    );
};

export default TimeUpModal;