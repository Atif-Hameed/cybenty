import React from 'react'

const Password = () => {
    return (
        <div>
            <div className='flex flex-col gap-6'>
                <div>
                    <h1 className='text-gray mb-2'>Password</h1>
                    <input type="password" className='bg-[#FDFDFD] w-full p-3 outline-none border-none rounded-lg' name="" id="" />
                </div>
                <p className='text-gray lg:text-lg '>For additional security, you can set a password to view the secret and you must provide the password to get access. As a good security practice, always use a different communication method to send the password.</p>
            </div>
        </div>
    )
}

export default Password
