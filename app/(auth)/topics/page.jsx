'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { userTopics } from "@/services/auth";
import toast, { Toaster } from "react-hot-toast";
import CustomCheckBox from "@/components/shared/CustomCheckBox";
import MaxContainer from "@/components/shared/Layout/MaxContainer";
import Image from "next/image";
import logo from '@/public/assets/images/logomain.png'
import img from '@/public/assets/images/loginBanner.png';
import { useDispatch } from "react-redux";
import { setUser } from "@/store/userSlice";

export default function Page() {
    const [formData, setFormData] = useState({ userId: '', interestedTopics: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();
    const params = useSearchParams();
    const id = params.get('id');
    const userType = params.get('type');
    const createdBy = params.get('createBy');

    useEffect(() => {
        if (id) {
            setFormData(prevData => ({
                ...prevData,
                userId: id,
            }));
        }
    }, [id]);

    const handleCheckboxChange = (e) => {
        const { name } = e.target;
        setFormData((prevData) => {
            const isSelected = prevData.interestedTopics.includes(name);
            return {
                ...prevData,
                interestedTopics: isSelected
                    ? prevData.interestedTopics.filter((topic) => topic !== name) // Uncheck
                    : [...prevData.interestedTopics, name], // Check
            };
        });
        setError(''); // Clear error when user interacts with checkboxes
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Clear previous error

        // Validate that at least one topic is selected
        if (formData.interestedTopics.length === 0) {
            setError('Please select at least one topic to continue.');
            setLoading(false);
            return;
        }

        try {
            const { userId, interestedTopics } = formData;
            const data = await userTopics(userId, interestedTopics);
            // toast.success(data?.message);
            console.log(data?.message);
            if (createdBy === 'admin' || userType === 'new-user') {
                dispatch(setUser(data.user))
                setTimeout(() => {
                    router.push('/dashboard/home');
                }, 1000);
            } else {
                setTimeout(() => {
                    router.push('/login');
                }, 1000);
            }

        } catch (err) {
            // toast.error(err.message);
            setMessage(err.message)
            console.log(err);
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
                            <div className="flex justify-center">
                                <Image alt="" src={logo} className='sm:w-64 w-40' />
                            </div>
                            <p className="text-red-500 mt-2" >{message}</p>
                            <div className="flex flex-col items-center gap-2 mt-4">
                                <p className="text-gray text-2xl text-start font-medium w-full">
                                    Select your Interested Topics
                                </p>
                                {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
                                <form className="w-full space-y-6 m-5" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['Network Security', 'Application Security', 'Information Security', 'Cloud Security', 'Penetration Testing', 'Incident Response', 'Forensics', 'Compliance', 'Risk Management'].map((topic) => (
                                            <CustomCheckBox
                                                key={topic}
                                                label={topic}
                                                name={topic}
                                                isChecked={formData.interestedTopics.includes(topic)}
                                                onChange={handleCheckboxChange}
                                            />
                                        ))}
                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-purple text-white p-3 w-full rounded-lg font-medium"
                                        disabled={loading}
                                    >
                                        {loading ? 'Updating...' : 'Continue'}
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
