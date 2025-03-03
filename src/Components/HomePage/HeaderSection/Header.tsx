import React from 'react'
import SearchBar from './SearchBar'
import Navbar from './Navbar'
import Image from 'next/image'
import logo from '../../../Images/logos/Logo.jpg'

function Header() {
    return (
        <div className="header flex flex-row gap-0 justify-start place-items-center w-full place-content-center sticky top-0 left-0 bg-[#EDF6F9] z-50">
            <div className="logo w-24 h-full px-2 place-content-center">
                <Image src={logo} alt='logo' className='rounded-sm' />
            </div>
            <div className="head flex flex-col flex-1">
                <SearchBar />
                <Navbar />
            </div>
        </div>
    )
}

export default Header
