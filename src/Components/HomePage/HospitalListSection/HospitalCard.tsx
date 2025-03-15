import Image from 'next/image'
import React from 'react'
import hospital from '../../../Images/Hospitals/hospital.jpg'
import { hospitalInterface } from '@/Components/HospitalSeachPage/HospitalAbout';
import { redirect, useRouter } from 'next/navigation';
function HospitalCard({ data }: { data: hospitalInterface }) {
    // console.log(data)
    const router = useRouter()
    return (
        <div className='flex lg:flex-col flex-row gap-3 border-2  text-black xl:px-4 md:px-2 px-1  lg:py-3 md:py-2 py-1 min-w-fit'>
            <div className="image flex w-fit">
                <Image src={hospital} className='xl:w-full xl:h-56 lg:w-full lg:h-44 md:w-36 md:h-32 w-28 h-24' alt='hospital' />
            </div>
            <div className="right flex flex-col place-content-start px-2">
                <h1 className=' cursor-pointer xl:text-2xl lg:text-xl md:text-lg font-bold flex flex-col  text-teal-400' onClick={() => {
                    router.push(`/Hospitals?search=${data.name}`)
                }} >{
                        data.name.length > 20 ? <>{data.name.slice(0, 20)}...</> : data.name
                    }
                    <p className='text-slate-600 text-sm'>{data.rating} ratings</p>
                </h1>
                <h1 className='text-sm text-slate-600 '>
                    <p className='text-slate-600'>{data.city}, {data.state}, {data.PIN}</p>
                    <p className='md:block hidden  mt-2 text-slate-400'>Emergency : {data.contact.emergency}</p>
                    <p className='md:block hidden  text-slate-400'>Appointment : {data.contact.appointments}</p>
                    <p className='md:hidden sm:text-md text-[10px] mt-1 text-slate-400'>{data.contact.emergency} | {data.contact.appointments}</p>
                </h1>
                {/* <button onClick={() => {
                    router.push(`/Hospitals?search=${data.name}`)
                }} className='bg-teal-500 text-white lg:text-lg md:text-md w-full xl:px-5 lg:px-3 px-10 ms-auto rounded-md mt-auto'>Book Now</button> */}
            </div>
        </div>
    )
}

export default HospitalCard
