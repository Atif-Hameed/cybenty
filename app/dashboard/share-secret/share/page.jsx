import React from 'react'

const Page = () => {

    const data = [
        { name: 'Total Secrets', value: '1233' },
        { name: 'New Secrets', value: '133' },
        { name: 'Viewed Secrets', value: '3' },
        { name: 'Expired Secrets', value: '340' },
    ]

    return (
        <div className='p-6 pt-10'>
            <h1 className='text-darkBlue text-start font-semibold xl:text-[40px] lg:text-3xl md:text-2xl text-xl'>
                Share a Secret
            </h1>
            <div className='grid lg:grid-cols-4 grid-cols-2 sm:my-10 my-6 sm:gap-6 gap-4' >
                {
                    data.map((e, i) => (
                        <div key={i} className='text-gray border sm:text-base text-sm hover:border-2 hover:border-[#CF9FFF] border-bordered rounded-xl py-4 flex w-full flex-col items-center gap-4' >
                            <p className='font-medium '>{e.name}</p>
                            <p className='font-bold'>{e.value}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Page
