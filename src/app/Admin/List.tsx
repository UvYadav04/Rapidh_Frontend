import React, { useState } from 'react'
import { FaChevronCircleDown } from "react-icons/fa";
import { FaChevronCircleUp } from "react-icons/fa";
import { Booking } from '../../../lib/redux/slices/Mybookings';
import Popup from '../Mybookings/Popup';
function List({ item, index }: { item: any, index: number }) {
    // console.log(item)
    const [isactive, setactive] = useState<boolean>(false)
    return (
        <div key={item.user_id} className="w-full flex flex-col bg-slate-200 ">
            <div className="mainrow flex w-full group relative gap-2" style={{ scrollbarWidth: 'none' }}>
                <button className='w-fit group-hover:block hidden px-3 py-3 bg-slate-300 absolute h-fit left-0 top-0' onClick={() => setactive(!isactive)}>
                    {!isactive ? <FaChevronCircleDown color='teal' className='h-full' /> : <FaChevronCircleUp color='teal' className='h-full' onClick={() => setactive(!isactive)} />}

                </button>
                <span className='min-w-10 px-2 py-2 text-center '>{index + 1}</span>
                <span className='min-w-64 bg-slate-300 flex-1  px-2 py-2 text-start '>{item.user_id}</span>
                <span className='min-w-40  bg-slate-300 flex-1 px-2 py-2 text-start '>{item.first_name}</span>
                <span className='min-w-72  bg-slate-300 flex-1 px-2 py-2 text-start '>{item.email}</span>
                <span className='min-w-28 bg-slate-300 flex-1 px-2 py-2 text-start '>{new Date(item.created).toISOString().slice(0, 10)}</span>
            </div>
            {isactive && <div className="extra my-4">
                {
                    item.bookings.length > 0 ? item.bookings.map((item2: Booking, index: number) => {
                        return (
                            <Bookings item2={item2} index={index} />
                        )
                    }) : <p className='w-full text-slate-600 text-center text-lg'>No Bookings</p>
                }
            </div>
            }

        </div>
    )
}

export default List


const Bookings = ({ item2, index }: { item2: Booking, index: number }) => {
    const [pop, setpop] = useState<boolean>(false)

    return (
        <div className="flex w-full flex-col mb-2">
            <div className=" w-full flex bg-slate-200 cursor-pointer  gap-2" style={{ scrollbarWidth: 'none' }} onClick={() => setpop(true)}   >
                <span className=' min-w-10  px-2 py-2 text-center '>{index + 1}</span>
                <span className=' min-w-64 bg-slate-300 flex-1  px-2 py-2 text-start '>{item2.AdmissionID}</span>
                <span className=' min-w-40 bg-slate-300 flex-1  px-2 py-2 text-center '>{item2.OnlyAdmit ? "Admit" : "Operation"}</span>
                <span className=' min-w-72 bg-slate-300 flex-1  px-2 py-2 text-center '>{item2.AdmissionDate}</span>
                <span className=' min-w-28 bg-slate-300 flex-1  px-2 py-2 text-start '>{item2.TotalPrice}</span>
            </div>
            {pop && <Popup item={item2} setpop={setpop} />}
        </div>
    )
}