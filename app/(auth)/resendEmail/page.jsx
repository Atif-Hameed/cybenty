'use client'
import Link from "next/link";
import logo from '@/public/assets/images/logomain.png'
import img from '@/public/assets/images/loginBanner.png';
import Image from "next/image";
import { useState } from "react";
import { userResendOtp } from "@/services/auth";
import toast, { Toaster } from "react-hot-toast";
import MaxContainer from "@/components/shared/Layout/MaxContainer";
import AuthHeading from '@/components/shared/AuthHeading';
import CustomInput from "@/components/shared/CustomInput";
import { FaEnvelope } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";



export default function Page() {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState('');
    const router = useRouter();
    const user = useSelector((state) => state.user.user);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!email) {
            setErrors('Email is required');
            setLoading(false);
            return;
        }


        try {
            console.log("working till here")
            const data = await userResendOtp(email);
            // console.log(data)
            if(data.user.isVerified){
                router.push(`/verifyEmail?email=${email}&id=${data.user._id}&type=regular`)
            }else{
                router.push(`/verifyEmail?email=${email}&id=${data.user._id}&type=new-user`)
            }
            
            // toast.success(data.message);
        } catch (err) {
            // toast.error(err.message);
            console.log(err.message)
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="bg-white flex items-center justify-center">
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
                            <div className="flex flex-col items-center gap-2 mt-4">
                                <AuthHeading>
                                    <span className="text-center">Resend Verify Email</span>
                                </AuthHeading>
                                <p className="text-gray text-lg text-center font-medium xl:w-[65%] md:w-[80%] sm:w-[75%] w-full">
                                    Please enter your registered email address
                                </p>
                                <form onSubmit={handleSubmit} className="w-full space-y-4 m-5">
                                    <CustomInput
                                        type='email'
                                        icon={<FaEnvelope />}
                                        placeholder='Email Address'
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (errors) {
                                                setErrors('');
                                            }
                                        }}
                                        required
                                        error={errors}
                                    />

                                    <button
                                        type="submit"
                                        className="bg-purple text-white p-3 w-full rounded-lg font-medium"
                                        disabled={loading}
                                    >
                                        {loading ? 'Sending...' : 'Request Verify Link'}
                                    </button>
                                </form>
                                <Link href={'/login'} className="text-purple my-6 font-bold lg:text-2xl text-xl text-center">Back to login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </MaxContainer>
            <Toaster />
        </div>
    );
}
