'use client'

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getGuestBreachesData } from '@/services/checkEmails';
import Image from 'next/image';
import success from '@/public/assets/icons/success.png';
import warning from '@/public/assets/icons/warning.png';

const Page = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const router = useRouter(); // Use Next.js router for navigation

    // State variables to handle breach data and loading
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const getBreachesData = async () => {
            if (email) {
                try {
                    // Make an API call to fetch breach data
                    const response = await getGuestBreachesData(email);
                    setData(response.breaches || []);
                } catch (error) {
                    setError(error.message || 'Error fetching breach data. Please try again later.');
                } finally {
                    setIsLoading(false);
                }
            }
        };

        getBreachesData(); // Call the async function to fetch breach data
    }, [email]);

    return (
        <div className='h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-blue-200 text-slate-800'>
            {isLoading ? (
                // Show loading spinner while fetching breach data
                <div className="flex flex-col items-center">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-slate-200 h-24 w-24 mb-4"></div>
                    <h1 className='text-2xl font-semibold text-slate-700'>Please wait, checking for breaches...</h1>
                </div>
            ) : error ? (
                // Show error message if there is an error
                <div className="text-center">
                    <Image src={warning} className='h-24 w-24 text-red-500 mb-6' alt='error' />
                    <h1 className="text-3xl font-bold text-red-600">Oops!</h1>
                    <p className="text-lg mt-2 text-slate-700">{error}</p>
                    <p className="text-sm mt-4 text-slate-500">Please try again later.</p>
                </div>
            ) : data.length === 0 ? (
                // Show success message if no breaches are found
                <div className="text-center flex flex-col items-center ">
                    <Image src={success} className='h-24 w-24 text-green-500 mb-6 animate-bounce' alt='success' />
                    <h1 className="text-3xl font-bold text-green-600">Congratulations!</h1>
                    <p className="text-lg mt-2 text-slate-700">No breaches were found for this email.</p>
                    <p className="text-sm mt-4 text-slate-500">Keep your account secure by signing up or logging in for more protection.</p>
                    <button
                        className="mt-4 px-6 py-2 bg-purple text-white rounded-md"
                        onClick={() => router.push('/signup')}
                    >
                        Sign Up Now
                    </button>
                </div>
            ) : (
                // Show table of breach data if breaches are found
                <div className="text-center flex flex-col items-center">
                    <Image src={warning} className='h-24 w-24 text-red-500 mb-6 animate-bounce' alt='warning' />
                    <h1 className="text-3xl font-bold text-red-600">Breach Alert!</h1>
                    <p className="text-lg mt-2 text-slate-700">Breaches found for the email <strong>{email}</strong>.</p>

                    <table className="mt-6 w-full max-w-4xl text-left border-collapse shadow-lg rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-slate-100">
                                <th className="py-3 px-6 border-b-2 border-slate-200 font-semibold text-slate-700 uppercase tracking-wider">
                                    Breach Name
                                </th>
                                <th className="py-3 px-6 border-b-2 border-slate-200 font-semibold text-slate-700 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="py-3 px-6 border-b-2 border-slate-200 font-semibold text-slate-700 uppercase tracking-wider">
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((breach, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                                        } hover:bg-slate-100 transition-colors duration-200`}
                                >
                                    <td className="py-4 px-6 border-b border-slate-200 text-slate-800">
                                        {breach.Name}
                                    </td>
                                    <td className="py-4 px-6 border-b border-slate-200 text-slate-800">
                                        {breach.BreachDate}
                                    </td>
                                    <td className="py-4 px-6 border-b border-slate-200 text-slate-800">
                                        {breach.Description}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="text-sm mt-4 text-slate-500">Sign up or log in to protect your account from future breaches.</p>
                    <button
                        className="mt-4 px-6 py-2 bg-purple text-white rounded-md"
                        onClick={() => router.push('/signup')}
                    >
                        Sign Up Now
                    </button>
                </div>
            )}
        </div>
    );
};

export default Page;
