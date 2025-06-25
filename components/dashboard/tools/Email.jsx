import React from 'react'

const Email = () => {
  return (
    <div>
            <div className='flex flex-col gap-6'>
                <div>
                    <h1 className='text-gray mb-2'>Email Address</h1>
                    <input type="email" className='bg-[#FDFDFD] w-full p-3 outline-none border-none rounded-lg' name="" id="" />
                </div>
                <p className='text-gray lg:text-lg '>An email with a link to your encrypted secret will be sent to the recipient’s email address</p>
            </div>
        </div>
  )
}

export default Email
