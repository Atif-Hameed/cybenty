import React from 'react'
import { FiPlus } from "react-icons/fi";

const SendInvite = () => {
    return (
        <div>
            <div className='flex items-center sm:flex-row flex-col gap-6 mt-8 w-full'>
                <div className='w-full'>
                    <h1 className='text-gray mb-2'>Recipent Name</h1>
                    <input type="text" className='bg-[#FDFDFD] w-full p-3 outline-none border-none rounded-lg' name="" id="" />
                </div>
                <div className='w-full'>
                    <h1 className='text-gray mb-2'>Recipent Name</h1>
                    <input type="text" className='bg-[#FDFDFD] w-full p-3 outline-none border-none rounded-lg' name="" id="" />
                </div>
            </div>
            <button className='flex items-center text-white bg-purple my-4 gap-2 px-6 py-3 rounded-lg'>
                <FiPlus />
                Add New
            </button>

            <p className='text-gray text-lg my-3'>Customize the text of the invitation email. A link to register will be sent with the email.</p>
            <textarea name="" rows={8} className='w-full border outline-none border-bordered rounded-xl p-4' placeholder='You have been invited by arman ali to join the Inturity community.' id=""></textarea>

            <button className='bg-purple mt-4 text-white p-3 px-5  flex items-center justify-center w-full rounded-lg gap-2 lg:text-2xl md:text-xl sm:text-base text-sm ' >
                Send File
            </button>
        </div>
    )
}

export default SendInvite
