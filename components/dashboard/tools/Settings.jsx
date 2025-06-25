import React from 'react'

const Settings = () => {
    return (
        <div>
            <div className='flex flex-col gap-6'>
                <div>
                    <h1 className='text-gray mb-2'>Discription</h1>
                    <textarea name="" className='bg-[#FDFDFD] w-full p-3 outline-none border-none rounded-lg' id=""></textarea>
                </div>
                <div>
                    <h1 className='text-gray mb-2'>Message</h1>
                    <textarea name="" className='bg-[#FDFDFD] w-full p-3 outline-none border-none rounded-lg' id=""></textarea>
                </div>
                <div>
                    <h1 className='text-gray mb-2'>Life time hours</h1>
                    <input type="text" className='bg-[#FDFDFD] w-full p-3 outline-none border-none rounded-lg' name="" id="" />
                </div>
            </div>
        </div>
    )
}

export default Settings
