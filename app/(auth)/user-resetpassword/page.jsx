'use client'
import { useEffect, useState } from "react";
import { userResetPassword } from "@/services/auth";
import toast, { Toaster } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import MaxContainer from "@/components/shared/Layout/MaxContainer";
import Image from "next/image";
import logo from '@/public/assets/images/logomain.png'
import img from '@/public/assets/images/loginBanner.png';
import AuthHeading from '@/components/shared/AuthHeading';
import CustomInput from "@/components/shared/CustomInput";
import { FaLock } from "react-icons/fa";

const passwordValidation = (password) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const capitalLetterRegex = /[A-Z]/;
    return password.length >= 8 && specialCharRegex.test(password) && capitalLetterRegex.test(password);
};

export default function Page() {

    const [newPassword, setNewPassword] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [errors, setErrors] = useState('');
    const params = useSearchParams();
    const getToken = params.get('token');
    const [message, setMessage] = useState('');  // Message state
    const [messageType, setMessageType] = useState('');

    const handleChange = (e) => {
        setNewPassword(e.target.value);
        if (message) {
            setMessage('');  // Clear message when typing
        }
    };

    // Set token from URL parameters
    useEffect(() => {
        if (getToken) {
            setToken(getToken)
        }
    }, [getToken]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!passwordValidation(newPassword)) {
            setLoading(false)
            setMessage('Password must be at least 8 characters long, contain a capital letter, and a special character.');
            setMessageType('error');
            return;
        }

        try {
            const data = await userResetPassword( token, newPassword);
            // Display success message
            setMessage(data.message);
            setMessageType('success');
            setTimeout(() => {
                router.push(`/login`);
            }, 1000);
        } catch (err) {
            setLoading(false)
            // Display error message
            setMessage(err.response?.data?.message || 'An error occurred while updating the password');
            setMessageType('error');
            console.log(err)
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
                    <div className=" w-full flex justify-center items-center h-full">
                        <div className="lg:w-[60%] sm:w-[70%] w-[90%] h-fit">
                            <div className=" flex justify-center">
                                <Image alt="" src={logo} className='sm:w-64 w-40' />
                            </div>
                            <div className="flex flex-col items-center gap-2 mt-4">
                                <AuthHeading>
                                    <span className="text-center">Reset Password</span>
                                </AuthHeading>
                                <p className="text-gray text-lg text-center font-medium xl:w-[65%] md:w-[80%] sm:w-[75%] w-full">
                                    Please Reset your Password
                                </p>
                                <form className="w-full space-y-5 m-5" onSubmit={handleSubmit}>

                                    <CustomInput
                                        type='password'
                                        name='newPassword'
                                        icon={<FaLock />}
                                        placeholder='New Password'
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        error={errors}
                                    />

                                    {message && (
                                        <p
                                            className={`mt-4 text-center font-medium ${messageType === 'error' ? 'text-red-500' : 'text-green-500'
                                                }`}
                                        >
                                            {message}
                                        </p>
                                    )}

                                    <button
                                        type="submit"
                                        className="bg-purple text-white p-3 w-full rounded-lg font-medium"
                                        disabled={loading}
                                    >
                                        {loading ? 'Updating...' : 'Update'}
                                    </button>
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
