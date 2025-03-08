import Image from 'next/image'
import React from 'react'
import doctors from '../../../Images/doctors.png'
import whywe from '../Images/whywe.png'
function Banner1() {
    return (
        <div className='w-[90%] flex h-fit  xl:mt-10 lg:mt-8 md:mt-6 mt-0 relative '>
            <div className="left lg:[w-50%] md:w-[50%] review:w-[68%] w-full z-10  text-slate-600 xl:py-24 lg:py-20 md:py-14 review:py-10 py-6   flex place-content-center place-items-start flex-col ">
                <h1 className='xl:text-4xl lg:text-2xl mx:text-xl'>Why <span className='text-teal-400 xl:text-6xl lg:text-5xl text-4xl'>KareHive?</span></h1>
                <p className='xl:mt-14 lg:mt-8 md:mt-6 mt-4 md:text-normal text-sm break-all'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis quaerat facilis quos velit? Atque, sed harum vero placeat quos culpa. Provident reiciendis quidem delectus quas explicabo? Atque ex delectus recusandae! <span className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quaerat magnam unde cumque obcaecati</span>
                </p>
            </div>
            <div className="right flex-1 absolute place-content-center place-items-center review:block hidden top-0  right-0 w-1/2 h-full review:opacity-100 opacity-90">
                <Image src={doctors} alt='doctors' className='z-0 lg:w-10/12 h-full w-full ' />
            </div>
        </div>
    )
}

export default Banner1
