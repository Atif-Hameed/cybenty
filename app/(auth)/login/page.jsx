'use client';
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import img from '@/public/assets/images/loginBanner.png';
import linked from '@/public/assets/icons/linkedinLogo.svg';
import google from '@/public/assets/icons/google.svg';
import fb from '@/public/assets/icons/fb.svg';
import logo from '@/public/assets/images/logomain.png'
import { userLogin } from "@/services/auth";
import CustomCheckBox from '@/components/shared/CustomCheckBox';
import { signIn, useSession } from 'next-auth/react';
import MaxContainer from '@/components/shared/Layout/MaxContainer';
import CustomInput from '@/components/shared/CustomInput';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import AuthHeading from '@/components/shared/AuthHeading';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/userSlice';

export default function Page() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const params = useSearchParams();
    const userType = params.get('type');
    const [rememberMe, setRememberMe] = useState(false);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Remove error when user starts typing
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ''
        }));

        if (type === 'checkbox') {
            setRememberMe(checked);
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple validation
        let validationErrors = {};
        if (!formData.email) validationErrors.email = 'Email is required';
        if (!formData.password) validationErrors.password = 'Password is required';

        // Set errors if any exist
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        try {
            const data = await userLogin(formData.email, formData.password);
            // toast.success('Login successful!');
            console.log('Login successful!');
            // dispatch(setUser(data.user));
            if (data?.user.authMethod === 'otp') {
                router.push(`/verifyEmail?email=${data?.user.email}&id=${data?.user._id}`);
            } else {
                router.push(`/multifactor-auth?email=${data?.user.email}&id=${data?.user._id}`);
            }

        } catch (err) {
            console.log(err.message);
            setMessage(err.message)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white overflow-auto flex items-center justify-center">
            <Toaster />
            <MaxContainer>
                <div className="w-full grid md:grid-cols-2 grid-cols-1 items-center overflow-auto justify-center min-h-screen h-screen">
                    <div className="w-full md:flex hidden flex-col items-center overflow-hidden h-full gap-4">
                        <Image alt="" src={img} unoptimized priority className="h-full w-full object-cover" />
                    </div>
                    <div className="w-full flex justify-center items-center h-full">
                        <div className="lg:w-[60%] sm:w-[70%] w-[90%] h-fit">
                            <div className=" flex justify-center">
                                <Image alt="" src={logo} className='sm:w-64 w-40' />
                            </div>
                            <div className="flex flex-col items-center gap-2 mt-3">
                                <AuthHeading>
                                    <span className="text-center">Welcome Back</span>
                                </AuthHeading>
                                <p className="text-gray text-lg text-center font-medium md:w-[80%] sm:w-[75%] w-full">
                                    Please log in into your account
                                </p>
                                <p className='text-red-500 text-lg' >{message}</p>
                                <form className="w-full space-y-4 m-5" onSubmit={handleSubmit}>
                                    <CustomInput
                                        type='email'
                                        name='email'
                                        icon={<FaEnvelope />}
                                        placeholder='Email Address'
                                        onChange={handleChange}
                                        value={formData.email}
                                        error={errors.email}
                                    />
                                    <CustomInput
                                        type='password'
                                        name='password'
                                        icon={<FaLock />}
                                        placeholder='Password'
                                        onChange={handleChange}
                                        value={formData.password}
                                        error={errors.password}
                                    />
                                    <div className="flex items-center justify-between w-full">
                                        <CustomCheckBox
                                            isChecked={rememberMe}
                                            label={<span className='text-black'>Remember me!</span>}
                                            name="rememberMe"
                                            onChange={handleChange}
                                        />
                                        <Link href={'/forgotPassword'} className="text-purple">Forgot Password?</Link>
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-purple text-white p-3 w-full rounded-lg font-medium"
                                        disabled={loading}
                                    >
                                        {loading ? 'Signing in...' : 'Sign in'}
                                    </button>

                                    <div className='flex items-center gap-2 w-full mt-2'>
                                        <div className='bg-[#77777729] h-px w-full' ></div>
                                        <p className='text-gray whitespace-nowrap'>or log in with</p>
                                        <div className='bg-[#77777729] h-px w-full' ></div>
                                    </div>

                                    <div className='flex items-center gap-3 w-full justify-center sm:flex-nowrap flex-wrap mt-2'>
                                        <button type='button' onClick={() => signIn('linkedin')} className={` border border-[#00000040] rounded-md p-1.5 bg-white`}>
                                            <Image alt="" className='w-9' src={linked} />
                                        </button>
                                        <button type='button' onClick={() => signIn('facebook')} className={` border border-[#00000040] rounded-md px-3.5 py-1.5  bg-white`}>
                                            <Image alt="" src={fb} className='w-5' />
                                        </button>
                                        <button type='button' onClick={() => signIn('google')} className={` border border-[#00000040] rounded-md p-2 bg-white`}>
                                            <Image alt="" className='w-8' src={google} />
                                        </button>
                                    </div>

                                    <p className='w-full text-center mt-2'>Don’t Have an Account? <Link href={'/signup'} className='text-purple ' >Sign Up</Link></p>
                                    {/* <p className='w-full text-center '>Issue with Email Verification? <Link href={'/resendEmail'} className='text-primary ' >Verify Email</Link></p> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </MaxContainer>
            <Toaster />
        </div>
    );
}
