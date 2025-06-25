'use client'
import { useRouter } from "next/navigation";
import React from "react";

const ErrorPage = ({ error }) => {
    const router = useRouter();

    const handleTryAgain = () => {
        router.refresh();
    };

    console.log(error)

    return (
        <div className="min-h-[73vh] flex flex-col text-center items-center justify-center text-white">
            {/* Error Icon */}
            <div className="mb-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 mx-auto text-red-500"
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

            {/* Error Message */}
            <h1 className="text-4xl font-bold mb-4">Oops!</h1>
            <p className="text-lg text-gray-300 mb-8 text-red-500">
                {error}
            </p>
            <p className="text-lg text-gray-300 mb-8">
                We&apos;re working on it and will fix it soon. Please try again later.
            </p>

            {/* Try Again Button */}

            <button onClick={handleTryAgain} className="py-3.5 cursor-pointer w-full tracking-wider flex justify-center sm:w-auto  items-center px-1.5 sm:px-10 rounded-lg  sm:text-lg font-semibold text-white bg-[#0694B8] transition-all hover:bg-[#05738f]">
                Try Again
            </button>
        </div>
    );
};

export default ErrorPage;