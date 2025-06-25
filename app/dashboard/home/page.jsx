'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setUser } from '@/store/userSlice'; // Assuming you have a setUser action in Redux
import { toast, Toaster } from 'react-hot-toast'; // Import react-hot-toast
import { updateUserbyId } from '@/services/auth';

const Page = () => {
    const user = useSelector((state) => state.user.user);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const dispatch = useDispatch();
    const router = useRouter();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        dispatch(clearUser());
        router.push('/login');
    };

    const handleApplyForPublisher = async () => {
        setLoading(true);

        try {
            // Update the user's status to "under review"
            const updatedUser = { ...user, status: 'under review' };
            const response = await updateUserbyId(user._id, updatedUser);
            console.log(response)
            dispatch(setUser(response));
            setMessage('Your application is under review!')
        } catch (error) {
            console.log(error.message || 'Failed to apply for publisher.');
            setMessage(error.message || 'Failed to apply for publisher.')
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (isLoggedIn) {
            const redirectUrl = localStorage.getItem('redirectUrl');
            if (redirectUrl) {
                localStorage.removeItem('redirectUrl');
                router.push(redirectUrl);
            }
        }
    }, [isLoggedIn, router]);

    // console.log(user)

    return (
        <div>
            <Toaster />
            {isLoggedIn ? (
                <div className='text-center items-center flex flex-col gap-6 my-20 text-5xl'>
                    <p>Welcome, {user?.name}</p>
                    <div>
                        {
                            user?.role === 'user' &&
                            <button
                                onClick={handleApplyForPublisher}
                                disabled={loading}
                                className={`p-3 rounded-lg w-fit px-5 text-white text-lg border bg-purple ${loading && 'opacity-50 cursor-not-allowed'}`}>
                                {loading ? 'Applying...' : 'Apply For Publisher'}
                            </button>
                        }
                        <p className='mt-2 text-green-500 text-lg'>{message}</p>
                    </div>


                    <button
                        onClick={handleLogout}
                        className='p-2 rounded-lg w-fit px-5 text-white text-lg border bg-red-500'>
                        Logout
                    </button>
                </div>
            ) : (
                <div className='mt-20 w-full flex justify-center text-center gap-2 text-2xl font-medium'>
                    Please<Link href={'/login'} className='text-purple'> log in</Link>
                </div>
            )}
        </div>
    );
}

export default Page;
