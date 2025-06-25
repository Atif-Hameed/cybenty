'use client'
import Link from "next/link";
import { useState } from "react";
import { userForgotPassword } from "@/services/auth";
import MaxContainer from "@/components/shared/Layout/MaxContainer";
import logo from '@/public/assets/images/logomain.png';
import img from '@/public/assets/images/loginBanner.png';
import Image from "next/image";
import AuthHeading from '@/components/shared/AuthHeading';
import CustomInput from "@/components/shared/CustomInput";
import { FaEnvelope } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState('');
    const [message, setMessage] = useState();

    const handleChange = (e) => {
        setEmail(e.target.value);

        // Clear errors when the user starts typing
        if (errors) setErrors('');
    };

    const validateEmail = () => {
        if (!email) {
            setErrors("Email is required");
            return false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setErrors("Invalid email address");
            return false;
        }
        return true;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail()) return;

        setLoading(true);

        try {
            const data = await userForgotPassword(email);
            // toast.success(data.message);
            setMessage(data.message)
        } catch (err) {
            setErrors(err.message || "Something went wrong. Please try again.");
            // toast.error(err.message);
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
                            <div className="flex justify-center">
                                <Image alt="" src={logo} className='sm:w-64 w-40' />
                            </div>
                            <div className="flex flex-col items-center gap-2 mt-4">
                                <AuthHeading>
                                    <span className="text-center">Forgot your password</span>
                                </AuthHeading>
                                <p className="text-gray text-lg text-center font-medium w-full">
                                    Please enter the email address you’d like your password reset information sent to
                                </p>

                                {message && <p className="text-green-500 my-2" >{message}</p>}
                                {errors && <p className="text-green-500 my-2" >{errors}</p>}
                                <form onSubmit={handleSubmit} className="w-full space-y-4 m-5">
                                    <CustomInput
                                        type='email'
                                        icon={<FaEnvelope />}
                                        placeholder='Email Address'
                                        value={email}
                                        onChange={handleChange}
                                        error={errors} // Display error if present
                                    />
                                    <button
                                        type="submit"
                                        className="bg-purple text-white p-3 w-full rounded-lg font-medium"
                                        disabled={loading}
                                    >
                                        {loading ? 'Sending...' : 'Request Reset Link'}
                                    </button>
                                </form>
                                <Link href={'/login'} className="text-purple my-6 font-bold text-xl text-center">Back to login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </MaxContainer>
        </div>
    );
}
