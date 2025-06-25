import React from 'react'

const Button = ({ label, onClick, className }) => {
    return (
        <button onClick={onClick} className={`text-white w-fit px-4 py-2 bg-primary rounded-md ${className}`} >
            {label}
        </button>
    )
}

export default Button
