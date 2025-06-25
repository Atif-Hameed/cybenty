'use client'
import React, { useState } from 'react';
import { switchAuthMethod, updateUserAuthMethod, userVerifyQR } from '@/services/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import MaxContainer from '@/components/shared/Layout/MaxContainer';
import Image from 'next/image';
import logo from '@/public/assets/images/logomain.png'
import img from '@/public/assets/images/loginBanner.png';
import CustomInput from '@/components/shared/CustomInput';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/userSlice';
import Link from 'next/link';


const Page = () => {
    const dispatch = useDispatch();
    const [otp, setOtp] = useState('');
    const [loadingVerify, setLoadingVerify] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();
    const params = useSearchParams();
    const email = params.get('email');
    const id = params.get('id');


    const handleVerifyTotp = async () => {
        setError('');
        setLoadingVerify(true);
        const secret = localStorage.getItem('secret')
        try {
            const data = await userVerifyQR(id, secret, otp);
            dispatch(setUser(data.user));
            // console.log(data)
            setMessage(data.message)
            router.push(`/`);

        } catch (error) {
            console.error('Error verifying TOTP:', error);
            setError('An error occurred verifying the TOTP.')
        } finally {
            setLoadingVerify(false);
        }
    };


    const changeAuthMthod = async () => {
        const authType = 'otp'
        const data = await switchAuthMethod(id, authType);
        router.push(`/verifyEmail?&email=${email}&id=${id}`)
    }


    return (


        <div className="bg-white flex items-center justify-center">
            <MaxContainer>
                <div className="w-full grid md:grid-cols-2 grid-cols-1 items-center overflow-auto justify-center min-h-screen h-screen">
                    <div className="w-full md:flex hidden flex-col items-center overflow-hidden h-full gap-4">
                        <Image alt="" src={img} unoptimized priority className="h-full w-full object-cover" />
                    </div>
                    <div className="w-full flex justify-center items-center h-full">
                        <div className="lg:w-[60%] sm:w-[70%] w-[90%] h-fit">
                            <div className=" flex justify-center mb-12">
                                <Image alt="" src={logo} className='sm:w-64 w-40' />
                            </div>

                            <p className='text-green-500 my-3 text-center w-full ' >Your App is Connected</p>

                            <div className="flex items-center gap-3 h-[10rem] bg-[#CF9FFF0F]">
                                <div className="w-[2%] rounded-tl-lg rounded-bl-lg bg-purple h-full"></div>
                                <div className="flex-1  flex flex-col gap-3 w-full ">
                                    <h1 className="lg:text-2xl sm:text-xl text-lg font-semibold">Two Factor Authentication</h1>
                                    <p className="text-gray">Please enter the genereated code by your mobile application or security key.</p>
                                </div>
                            </div>

                            {
                                error && <p className='text-red-500 my-3' >{error}</p>
                            }
                            {
                                message && <p className='text-green-500 my-3' >{message}</p>
                            }

                            <div className='mt-5'>
                                <div className='mt-4'>
                                    <div className='bg-[#FDFDFD] p-2 rounded-xl mt-2'>

                                        <CustomInput
                                            type='text'
                                            name='otp'
                                            icon={<BsFillShieldLockFill />}
                                            placeholder='Enter Verification Code'
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <button
                                    className='bg-purple text-white w-full rounded-lg px-5 py-2.5 mt-3'
                                    onClick={handleVerifyTotp}
                                    disabled={loadingVerify}
                                >
                                    {loadingVerify ? 'Authenticating...' : 'Authentication'}
                                </button>

                                <p className='w-full text-center pt-6'>
                                    <h onClick={changeAuthMthod} className='text-purple cursor-pointer'> Use Email verification</h>
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </MaxContainer>
        </div>
    );
};

export default Page;
