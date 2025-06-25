'use client'
import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { userRegister } from "@/services/auth";
import toast, { Toaster } from "react-hot-toast";
import logo from '@/public/assets/images/logomain.png';
import img from '@/public/assets/images/loginBanner.png';
import MaxContainer from '@/components/shared/Layout/MaxContainer';
import AuthHeading from '@/components/shared/AuthHeading';
import CustomInput from '@/components/shared/CustomInput';
import { FaUserLarge } from 'react-icons/fa6';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import CustomCheckBox from '@/components/shared/CustomCheckBox';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/userSlice';

const passwordValidation = (password) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const capitalLetterRegex = /[A-Z]/;
    return password.length >= 8 && specialCharRegex.test(password) && capitalLetterRegex.test(password);
};


export default function Page() {
    const [formData, setFormData] = useState({ userName: '', email: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const router = useRouter();
    const param = useSearchParams();
    const userRole = param.get('enrol');

    const handleChange = (e) => {

        // Remove error when user starts typing
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ''
        }));

        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            if (name === 'termsAccepted') {
                setTermsAccepted(checked); // Track terms checkbox separately
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const validateForm = () => {
        const { userName, email, password, confirmPassword } = formData;
        let formErrors = {};

        if (!userName) formErrors.userName = "User Name is required";
        if (!email) formErrors.email = "Email is required";
        if (!password) {
            formErrors.password = "Password is required";
        } else if (!passwordValidation(password)) {
            formErrors.password = "Password must be at least 8 characters, contain a special character, and a capital letter";
        }
        if (password !== confirmPassword) formErrors.confirmPassword = "Passwords do not match";
        if (!termsAccepted) formErrors.termsAccepted = "You must accept the terms and policy";

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!validateForm()){
            setLoading(false);
            return
        } ;

        try {
            const data = await userRegister(formData.userName, formData.email, formData.password, formData.confirmPassword, userRole || '');
            // dispatch(setUser(data.user));
            console.log(data.message)
            if (userRole === 'publisher') {
                router.push('/login');
            } else {
                setTimeout(() => {
                    router.push(`/verifyEmail?email=${data?.user.email}&id=${data?.user.id}&type=new-user`);
                }, 1000);
            }

        } catch (err) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: err.message || "An error occurred during registration"
            }));
            console.log(err);
            setLoading(false);
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
                    <div className=" w-full flex justify-center items-center py-4 h-full">
                        <div className="lg:w-[60%] sm:w-[70%] w-[90%] h-fit">
                            <div className=" flex justify-center">
                                <Image alt="" src={logo} className='sm:w-64 w-40' />
                            </div>
                            <div className="flex flex-col items-center gap-2 mt-4">
                                <AuthHeading>
                                    <span className="text-center">Welcome</span>
                                </AuthHeading>
                                <p className="text-gray text-lg text-center font-medium  md:w-[80%] sm:w-[75%] w-full">
                                    Please Register your account
                                </p>
                                <form className="w-full space-y-5 m-5" onSubmit={handleSubmit}>
                                    <CustomInput
                                        type='text'
                                        name='userName'
                                        icon={<FaUserLarge />}
                                        placeholder='User Name'
                                        value={formData.userName}
                                        onChange={handleChange}
                                        error={errors.userName}
                                    />
                                    <CustomInput
                                        type='email'
                                        name='email'
                                        icon={<FaEnvelope />}
                                        placeholder='Email Address'
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={errors.email}
                                    />
                                    <CustomInput
                                        type='password'
                                        name='password'
                                        icon={<FaLock />}
                                        placeholder='Password'
                                        value={formData.password}
                                        onChange={handleChange}
                                        error={errors.password}
                                    />
                                    <CustomInput
                                        type='password'
                                        name='confirmPassword'
                                        icon={<FaLock />}
                                        placeholder='Repeat Password'
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        error={errors.confirmPassword}
                                    />
                                    <div className="flex items-center justify-start w-full">
                                        <div className="">
                                            <CustomCheckBox
                                                isChecked={termsAccepted} // Bind to termsAccepted state
                                                label={<span className='text-sm'>I agree to all terms and conditions, and privacy policy.</span>}
                                                name="termsAccepted"
                                                onChange={handleChange}
                                            />
                                            {errors.termsAccepted && <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>}
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-purple text-white p-3 w-full rounded-lg font-medium"
                                        disabled={loading || !termsAccepted} // Disable button if not accepted
                                    >
                                        {loading ? 'Registering...' : 'Register'}
                                    </button>

                                    <p className='w-full text-center mt-10'>Already have an account? <Link href={'/login'} className='text-purple'>Log in</Link></p>
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
