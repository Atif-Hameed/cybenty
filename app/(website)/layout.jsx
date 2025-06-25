import Footer from '@/components/shared/Layout/Footer'
import Navbar from '@/components/shared/Layout/Navbar'
import React from 'react'

const Layout = ({ children }) => {
    return (
        <div>
            <div className="sticky top-0 flex justify-center  shadow-md bg-white w-full left-0 z-30">
                <div className='flex w-full max-w-[1700px]'>
                    <Navbar />
                </div>
            </div>
            {children}
            <Footer />
        </div>
    )
}

export default Layout
