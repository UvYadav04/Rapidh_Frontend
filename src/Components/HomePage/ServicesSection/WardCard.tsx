import Image from 'next/image'
import React, { Dispatch, SetStateAction } from 'react'
import Aretemis from '../../../Images/Hospitals/hospital.jpg'
import { patientInterface } from '@/Components/HospitalSeachPage/HospitalAbout'
import { WardList } from '@/Components/HospitalSeachPage/HospitalAbout'
function WardCard({ item, index, keyvalue, ward, setpatient }: { item: WardList, index: number, keyvalue: number, ward: number, setpatient: Dispatch<SetStateAction<patientInterface>> }) {
    return (
        <li key={keyvalue} className='  w-2/12 p-6 text-black list-none flex flex-col place-content-center place-items-center'>
            <Image src={Aretemis} alt="icu" className='rounded-md' />
            <h1 className='w-full my-[1px]'>Price : <span className='float-end'>₹{item.charge}/day</span></h1>
            <button className={`w-full rounded-md ${ward == index ? "bg-teal-400 text-white " : "text-teal-400 bg-slate-200"} text-lg font-bold  my-2 mx-3`}
                onClick={() => setpatient((prev) => {
                    return { ...prev, Ward: index }
                })}>{item.name}</button>
        </li>
    )
}

export default WardCard
