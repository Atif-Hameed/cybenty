import React from 'react'

const MaxContainer = ({children}) => {
  return (
    <div className='flex justify-center items-center w-full max-w-[1900px]'>
      {children}
    </div>
  )
}

export default MaxContainer
