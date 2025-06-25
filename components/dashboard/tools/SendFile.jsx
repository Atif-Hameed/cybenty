'use client'
import React, { useState } from 'react';
import upload from '@/public/assets/icons/upload.svg';
import Image from 'next/image';
import { FaTrashAlt } from 'react-icons/fa';
import { createSecret } from '@/services/api';
import AdvancedSettings from './AdvanceSetting';
import img from '@/public/assets/icons/shield.svg';
import { getFileNameFromUrl, uploadFile } from '@/utils/FileUplaoding';
import { useRouter } from 'next/navigation';

const SendFile = () => {
    const [fileUrl, setFileUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploadingFile, setUploadingFile] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        file: '',
        description: '',
        message: '',
        lifeTime: '',
        password: ''
    });

    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    // Handle file upload
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        setFeedbackMessage('');

        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                setFeedbackMessage('File size must not exceed 5MB.');
                setIsError(true);
                return;
            }

            setUploadingFile(true);
            try {
                const fileURL = await uploadFile(file);
                if (fileURL) {
                    setFormData({ ...formData, file: fileURL });
                    setFileUrl(fileURL);
                    setFeedbackMessage('File uploaded successfully!');
                    setIsError(false);
                }
            } catch {
                setFeedbackMessage('Failed to upload file. Please try again.');
                setIsError(true);
            } finally {
                setUploadingFile(false);
            }
        }
    };

    const handleDeleteFile = () => {
        setFileUrl('');
        setFormData({ ...formData, file: '' });
        setFeedbackMessage('File removed.');
        setIsError(false);
    };

    const handleInputChange = (e) => {
        setFeedbackMessage('');
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        setFeedbackMessage('');
        setIsError(false);

        try {
            const { file, description, message, lifeTime, password } = formData;
            const response = await createSecret(null, file, description, message, lifeTime, password);
            console.log(response)
            setFeedbackMessage('Secret successfully created! Your secure link is ready.');
            router.push(`/dashboard/tools/send-receive-secret/receive-secret-text?token=${response.secret._id}&type=link`);
        } catch (error) {
            setFeedbackMessage(error.message || 'An error occurred while creating the secret.');
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex justify-center'>
            <div className='flex flex-col items-center gap-3 w-fit mt-10'>
                <h1 className='text-darkBlue text-center font-medium xl:text-4px lg:text-3xl md:text-2xl text-xl'>
                    Send and receive secret securely.
                </h1>
                <p className='text-lg text-gray text-center'>
                    Create a secure one-time secret link. Stop sharing sensitive information on chat or email
                </p>

                <div className='mt-10 w-full'>
                    <p className='text-gray md:text-xl mb-2'>Upload File</p>
                    <div className='relative cursor-pointer  border-2 border-[#CF9FFF] border-dashed p-6 pb-10 rounded-xl w-full'>
                        {!fileUrl ? (
                            <div className='flex flex-col items-center gap-5 w-full text-center'>
                                <Image alt='Upload Icon' src={upload} />
                                <p>Drag and drop file here</p>
                                <p>or</p>
                                <button className='bg-purple text-white px-5 py-2 rounded-lg'>Choose File</button>
                            </div>
                        ) : (
                            <div className='flex justify-center gap-4 w-full items-center relative z-20'>
                                <p className='text-primary my-2 text-center font-medium'>{getFileNameFromUrl(fileUrl)}</p>
                                <FaTrashAlt className="cursor-pointer text-red-500" onClick={handleDeleteFile} />
                            </div>
                        )}
                        <input
                            onChange={handleFileUpload}
                            type="file"
                            className='w-full h-full absolute cursor-pointer top-0 left-0 opacity-0'
                            name="file"
                        />
                    </div>
                </div>

                <AdvancedSettings formData={formData} onInputChange={handleInputChange} />

                {feedbackMessage && (
                    <div className={`text-center mt-4 text-lg ${isError ? 'text-red-500' : 'text-green-500'}`}>
                        {feedbackMessage}
                    </div>
                )}

                <button
                    onClick={handleSubmit}
                    className='bg-purple mt-12 text-white p-3 px-5 flex items-center justify-center w-full rounded-lg gap-2 md:text-xl sm:text-base text-sm'
                    disabled={loading}
                >
                    <Image alt='Shield Icon' src={img} />
                    {loading ? 'Encrypting and creating link...' : 'Encrypt Secret and create a secure Link'}
                </button>

            </div>



            {uploadingFile && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="text-white">
                        <p>Uploading File...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SendFile;
