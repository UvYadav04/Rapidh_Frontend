import React, { useState } from 'react'
import { FaChevronCircleDown } from "react-icons/fa";
import { FaChevronCircleUp } from "react-icons/fa";
import { Booking } from '../../../../lib/redux/slices/Mybookings';
import Popup from '../Mybookings/Popup';
function List({ item, index }: { item: any, index: number }) {
    console.log(item)
    const [isactive, setactive] = useState<boolean>(false)
    const [pop, setpop] = useState<boolean>(false)
    return (
        <div key={item.user_id} className="w-full flex flex-col bg-slate-200  relative">
            <div className="mainrow flex w-full group">
                <button className='w-fit group-hover:block hidden px-3 py-3 bg-slate-300 absolute h-fit left-0 top-0' onClick={() => setactive(!isactive)}>
                    {!isactive ? <FaChevronCircleDown color='teal' className='h-full' /> : <FaChevronCircleUp color='teal' className='h-full' onClick={() => setactive(!isactive)} />}

                </button>
                <span className='w-12 px-2 py-2 text-start '>{index + 1}</span>
                <span className='flex-1 px-2 py-2 text-start lg:block hidden'>{item.user_id}</span>
                <span className='flex-1 px-2 py-2 text-start '>{item.first_name}</span>
                <span className='flex-1 px-2 py-2 text-start '>{item.email}</span>
                <span className='flex-1 px-2 py-2 text-start md:block hidden'>{new Date(item.created).toISOString().slice(0, 10)}</span>
            </div>
            {isactive && <div className="extra m-3">
                {
                    item.bookings.length > 0 ? item.bookings.map((item2: Booking, index: number) => {
                        return (
                            <div className="flex w-full">
                                <div className=" w-full flex bg-white cursor-pointer" onClick={() => setpop(true)}   >
                                    <span className='flex-1 px-2 py-2 text-start '>{index + 1}</span>
                                    <span className='flex-1 px-2 py-2 text-start '>{item2.AdmissionID}</span>
                                    <span className='flex-1 px-2 py-2 text-start '>{item2.OnlyAdmit ? "Admit" : "Operation"}</span>
                                    <span className='flex-1 px-2 py-2 text-start '>{item2.AdmissionDate}</span>
                                    <span className='flex-1 px-2 py-2 text-start '>{item2.TotalPrice}</span>
                                </div>
                                {pop && <Popup item={item2} setpop={setpop} />}
                            </div>
                        )
                    }) : <p className='w-full text-slate-600 text-center text-lg'>No Bookings</p>
                }
            </div>
            }

        </div>
    )
}

export default List
