'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const GetRegister = () => {

  const router = useRouter()

  const handleRedirect = () => {
    router.push(`/signup?enrol=publisher`)
  }

  return (
    <div className='w-full  bg-register-bg bg-cover text-white flex flex-col  md:gap-8 gap-4 items-center bg-center md:py-14 px-8'>
      <h1 className='font-semibold lg:text-[34px] text-2xl text-center'>Register now to start writing </h1>
      <button onClick={handleRedirect} className=' bg-transparent  border border-white rounded-lg px-8 py-2'>Get Register</button>
    </div> 
  )
}

export default GetRegister
