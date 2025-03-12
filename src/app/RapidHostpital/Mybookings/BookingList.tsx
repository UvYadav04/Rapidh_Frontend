'use client'

import { MdCancel } from "react-icons/md"
import { Booking } from "../../../../lib/redux/slices/Mybookings"
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import Popup from "./Popup"

function BookingList({ item }: { item: Booking }) {
    const [pop, setpop] = useState<boolean>(false)
    const router = useRouter()
    return (
        <div className='w-full bg-slate-300 flex flex-col px-2 py-1 rounded-sm' >
            <h1 className='text-3xl text-teal-500 font-bold cursor-pointer' onClick={() => setpop(true)}>{item.HospitalName.toLocaleUpperCase()}</h1>
            <h6 className='text-slate-800'>{item.AdmissionDate}</h6>
            {pop ? <Popup item={item} setpop={setpop} /> : null
            }
        </div >
    )
}
export default BookingList