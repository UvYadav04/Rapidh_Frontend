import Image from 'next/image'
import React from 'react'
import hospital from '../../../Images/Hospitals/hospital.jpg'
import { hospitalInterface } from '@/Components/HospitalSeachPage/HospitalAbout';
import { redirect, useRouter } from 'next/navigation';
function HospitalCard({ data }: { data: hospitalInterface }) {
    // console.log(data)
    const router = useRouter()
    return (
        <div className='flex gap-3 border-2  text-black px-4 py-3 min-w-fit'>
            <div className="image flex w-fit">
                <Image src={hospital} width={250} alt='hospital' />
            </div>
            <div className="right flex flex-col place-content-start">
                <h1 className='text-2xl font-bold  text-teal-400' >{data.name}</h1>
                <h2 className='text-slate-600'>{data.reviews}</h2>
                <h1 className='text-sm text-slate-600 mt-2'>
                    <p>{data.location}</p>
                    <p>Emergency : {data.contact.emergency}</p>
                    <p>Appointment : {data.contact.appointments}</p>
                </h1>
                <button onClick={() => {
                    router.push(`/RapidHostpital/Hospitals?search=${data.name}`)
                }} className='bg-teal-500 text-white text-lg w-full rounded-md mt-auto'>Book Now</button>
            </div>
        </div>
    )
}

export default HospitalCard
