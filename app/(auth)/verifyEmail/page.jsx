'use client'
import Link from "next/link";
import logo from '@/public/assets/images/logomain.png'
import img from '@/public/assets/images/loginBanner.png';
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { userOtp, userOtpMfa } from "@/services/auth";
import toast, { Toaster } from "react-hot-toast";
import MaxContainer from "@/components/shared/Layout/MaxContainer";
import CustomInput from "@/components/shared/CustomInput";
import { FaEnvelope } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/userSlice";

export default function Page() {

    const [formData, setFormData] = useState({ email: '', otp: '' });
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user.user);
    const [emailError, setEmailError] = useState('');
    const dispatch = useDispatch();
    const [otpError, setOtpError] = useState('');
    const [errors, setErrors] = useState('')
    const router = useRouter();
    const params = useSearchParams();
    const email = params.get('email');
    const userType = params.get('type') || '';
    const id = params.get('id') || '';

    // Set email from URL parameters
    useEffect(() => {
        if (email) {
            setFormData(prevData => ({
                ...prevData,
                email: email,
            }));
        }
    }, [email]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Reset errors for the respective field on change
        if (name === 'email') setEmailError('');
        if (name === 'otp') setOtpError('');
        if (errors) setErrors('')
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const selectedEmail = user?.secondaryEmail || email;
       
        console.log(user)
        // Reset errors
        setEmailError('');
        setOtpError('');

        // Validate fields
       
        let valid = true;
        if (!selectedEmail) {
            setEmailError('Email is required');
            valid = false; // Mark as invalid
        }
        if (!formData.otp) {
            setOtpError('OTP is required');
            valid = false; // Mark as invalid
        }

        if (!valid) {
            console.log('on api 1')
            setLoading(false); // Reset loading state
            return; // Exit if invalid
        }

        let data;

        try {
            console.log('on api')
            if (userType === 'new-user') {
                data = await userOtp(selectedEmail, formData.otp);
            } else {
                data = await userOtpMfa(id, formData.otp);
            }

            // toast.success(data?.message);
            // console.log(data)
            // console.log(id)
            console.log(data?.message);

            if (data?.user.interestedTopics.length === 0) {
               
                if (userType === 'new-user') {
                    router.push(`/topics?id=${id}&type=${userType}&createBy=''`);

                } else if (createBy === 'admin') {
                    router.push(`/topics?id=${id}&type=''&createBy=admin`);
                }

            } else {
                dispatch(setUser(data.user));
                setTimeout(() => {
                    router.push('/')
                }, 1000);
            }


        } catch (err) {
            // Handle errors from API call
            setErrors(err.message)
            // toast.error(err.message);
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white flex items-center justify-center">
            <Toaster />
            <MaxContainer>
                <div className="w-full grid md:grid-cols-2 grid-cols-1 items-center overflow-auto justify-center min-h-screen h-screen">
                    <div className="w-full md:flex hidden flex-col items-center overflow-hidden h-full gap-4">
                        <Image alt="" src={img} unoptimized priority className="h-full w-full object-cover" />
                    </div>
                    <div className="w-full flex justify-center items-center h-full">
                        <div className="lg:w-[60%] sm:w-[70%] w-[90%] h-fit">
                            <div className="flex justify-center mb-12">
                                <Image alt="" src={logo} className='sm:w-64 w-40' />
                            </div>
                            {
                                !(userType === 'new-user') &&
                                <div className="flex items-center gap-3 h-[10rem] bg-[#CF9FFF0F]">
                                    <div className="w-[2%] rounded-tl-lg rounded-bl-lg bg-purple h-full"></div>
                                    <div className="flex-1  flex flex-col gap-3 w-full ">
                                        <h1 className="lg:text-2xl sm:text-xl text-lg font-semibold">Two Factor Authentication</h1>
                                        <p className="text-gray">Please enter the genereated code by your mobile application or security key.</p>
                                    </div>
                                </div>
                            }


                            <div className="my-3">
                                <p className="text-green-500 text-center">Please check your email, an OTP code sent to you. </p>
                            </div>

                            <div className="flex flex-col items-center gap-2 mt-4">
                                <form className="w-full space-y-6 m-5" onSubmit={handleSubmit}>
                                    <CustomInput
                                        type='text'
                                        name='otp'
                                        icon={<BsFillShieldLockFill />}
                                        placeholder='OTP'
                                        value={formData.otp}
                                        onChange={handleChange}
                                        error={otpError}
                                    />

                                    {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}

                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        className="bg-purple text-white p-3 w-full rounded-lg font-medium"
                                        disabled={loading}
                                    >
                                        {loading ? 'Authenticating...' : 'Authentication'}
                                    </button>
                                </form>
                                {
                                    // userType === 'new-user' &&
                                    <p className='w-full text-center pt-6'>
                                        Didn&apos;t Receive Otp?
                                        <Link href={'/resendEmail'} className='text-purple'> Resend Email</Link>
                                    </p>
                                }
                                {/* {
                                    !(userType === 'new-user') &&
                                    <p className='w-full text-center pt-6'>
                                        <Link href={'/login'} className='text-purple'> Back to basic login</Link>
                                    </p>
                                } */}

                            </div>
                        </div>
                    </div>
                </div>
            </MaxContainer>
            <Toaster />
        </div>
    );
}
