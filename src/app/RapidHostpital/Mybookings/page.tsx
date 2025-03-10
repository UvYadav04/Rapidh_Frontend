'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppStore, RootState } from '../../../../lib/Store'
import { redirect, useSearchParams } from 'next/navigation'
import { getMyBookings } from '../../../../lib/redux/actions/bookings'
import LoginLoader from '@/Components/Authentication/LoginLoader'
import Navbar from '@/Components/HomePage/HeaderSection/Navbar'
import { Booking } from '../../../../lib/redux/slices/Mybookings'

function page() {
    const dispatch = useDispatch<AppDispatch>()
    const params = useSearchParams()
    const userid = params.get("userid")
    const { profile } = useSelector((state: RootState) => state.user)
    const { bookings, loading, bookingerror } = useSelector((state: RootState) => state.mybookings)

    console.log(bookings)

    // useEffect(() => {
    //     if (!userid || profile.id === "" || parseInt(userid) !== parseInt(profile.id))
    //         redirect('/RapidHostpital/Unauthorized')
    // }, [])

    useEffect(() => {
        if (!bookings) {
            dispatch(getMyBookings())
        }
    }, [])

    // console.log(bookingerror)

    // if (bookingerror)
    //     return redirect("/RapidHostpital/ErrorOccured")

    // if (loading)
    //     return <LoginLoader />

    return (
        <div className='mybookigns flex flex-col w-full h-fit place-items-center place-content-center gap-10 '>
            <Navbar />
            {/* <div className="filter w-full p-2 ">
                    <button className='' >Admissions</button>
                </div> */}
            <h1 className='text-3xl text-slate-700 font-semibold'>My Bookings</h1>
            <div className="list flex flex-col w-[80%] mt-18 gap-4">
                {
                    bookings ? bookings.map((item) => {
                        return <List item={item} />
                    }) : null
                }
            </div>
        </div>
    )
}

export default page



function List({ item }: { item: Booking }) {
    const [popup, setpopup] = useState<boolean>(false)
    return (
        <div className='w-full bg-slate-300 flex flex-col px-2 py-1 rounded-sm' onClick={() => setpopup(true)}>
            <h1 className='text-3xl text-teal-500 font-bold'>{item.HospitalName.toLocaleUpperCase()}</h1>
            <h6 className='text-slate-800'>{item.AdmissionDate}</h6>
            {popup ? <Pop data={item} /> : null}
        </div>
    )
}


function Pop({ data }: { data: Booking }) {
    return (
        <div className='w-full min-h-fit h-full absolute top-0 left-0 bg-transparent flex place-content-center place-items-center'>
            <div className="table w-6/12">
                <h1>name :{data.name}</h1>
            </div>
        </div>
    )
}