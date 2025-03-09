import Image from 'next/image'
import React, { Dispatch, SetStateAction } from 'react'
import Aretemis from '../../../Images/Hospitals/hospital.jpg'
import { OperationInterface, patientInterface } from '@/Components/HospitalSeachPage/HospitalAbout'
import { WardList } from '@/Components/HospitalSeachPage/HospitalAbout'
function WardCard({ item, keyvalue, ward, setpatient, setoperation, type }: { item: WardList, keyvalue: number, ward: WardList, setpatient: Dispatch<SetStateAction<patientInterface>>, setoperation: Dispatch<SetStateAction<OperationInterface>>, type: string }) {

    const handlechange = () => {
        if (type === "admit") {
            setpatient((prev) => {
                return { ...prev, Ward: item }
            })
        }
        else {
            setoperation((prev) => {
                return { ...prev, Ward: item }
            })
        }
    }
    return (
        <li key={keyvalue} className='min-w-fit md:p-4 sm:p-3 p-1 m-2  bg-slate-300 md:rounded-0 rounded-sm text-black list-none flex md:flex-col flex-row place-content-start md:place-items-center place-items-start md:gap-0 gap-2'>
            <Image src={Aretemis} alt="icu" className='rounded-md lg:w-28 lg:h-28 md:w-28 md:h-28 sm:w-24 sm:h-24 w-16 h-16' />
            <div className="info flex md:flex-col w-fit  flex-col md:h-fit h-full place-content-end place-items-start ">
                <div className="pricecheck flex justify-between mx-auto w-full px-3">
                    <input type="checkbox" checked={item.id == ward.id} onChange={(e) => handlechange()} />
                    <h1 className='w-fit my-[1px] text-sm  text-teal-400 font-bold'> <span className='md:float-end float-start'>₹{item.charge}/day</span></h1>
                </div>
                <button className={`min-w-fit  w-32 rounded-sm font-sans ${ward.id == item.id ? "bg-teal-400 text-white " : "text-teal-400 bg-slate-100"} xl:text-lg lg:text-base md:text-md text-sm font-bold `}
                    onClick={() => handlechange()}>{item.name}</button>
            </div>
        </li>
    )
}

export default WardCard
