'use client'
import React from 'react'

const Button = ({label,onClick}) => {
  return (
    <button onClick={onClick} className='bg-orangeMain hover:scale-105 px-10 py-3 justify-center rounded-lg w-full items-center text-white flex gap-2'>
      {label}
    </button>
  )
}

export default Button
