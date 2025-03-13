import React from 'react'
import SearchBar from './SearchBar'
import Navbar from './Navbar'
import Image from 'next/image'
import logo from '../../../Images/logos/Logo.jpg'

function Header() {
    return (
        <div className="header flex flex-row gap-0 justify-start md:place-items-center place-items-center  w-full place-content-center sticky top-0 left-0 bg-[#EDF6F9] z-40">
            <div className="logo lg:w-24 md:w-20   w-16 h-full px-2 place-content-center">
                <Image src={logo} alt='logo' className='rounded-sm' />
            </div>
            <div className="head flex lg:flex-col flex-row flex-1 place-items-center place-content-center">
                <SearchBar />
                <Navbar />
            </div>
        </div>
    )
}

export default Header
