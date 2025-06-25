import React from 'react'
import MaxContainer from '../shared/Layout/MaxContainer'
import Button from '../shared/Button'

const GetStarted = () => {
    return (
        <div className='bg-blueMain w-full  sm:py-12 py-8 flex justify-center px-4' >
            <MaxContainer>
                <div className='flex flex-col justify-center items-center md:py-12 py-8 gap-6 sm:p-5 sm:w-[80%] w-[90%]  '>
                    <h1 className='xl:text-5xl lg:text-4xl sm:text-3xl text-2xl text-center font-medium text-white'>Frequently Asked <span className='font-bold'>Questions</span></h1>
                    <div className='w-fit'>
                        <Button label={'Start Your Free Assessment'} />
                    </div>
                </div>
            </MaxContainer>
        </div>
    )
}

export default GetStarted
