import React from 'react'

const Heading = ({children}) => {
  return (
    <div className='xl:text-[40px] lg:text-4xl md:text-3xl sm:text-2xl text-xl font-bold'>
      {children}
    </div>
  )
}

export default Heading
