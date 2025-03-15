'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../lib/Store'
import { useRouter, useSearchParams } from 'next/navigation'
import { getMyBookings } from '../../../lib/redux/actions/bookings'
import LoginLoader from '@/Components/Authentication/LoginLoader'
import Navbar from '@/Components/HomePage/HeaderSection/Navbar'
import { resetBookingError } from '../../../lib/redux/slices/Mybookings'
import './page.css'
import BookingList from './BookingList'

function page() {
    const dispatch = useDispatch<AppDispatch>()
    const params = useSearchParams()
    const userid = params.get("userid")
    const { profile } = useSelector((state: RootState) => state.user)
    const { bookings, loading, bookingerror } = useSelector((state: RootState) => state.mybookings)
    const router = useRouter()

    // console.log(bookings)

    useEffect(() => {
        if (!bookings || bookings.length === 0) {
            dispatch(getMyBookings())
        }
    }, [])

    useEffect(() => {
        if (profile.id === "" || profile.id !== userid)
            return router.replace('Unauthorized')
    }, [profile])


    if (bookingerror) {
        // console.log(bookingerror)
        dispatch(resetBookingError())
        return router.replace("ErrorOccured?bookingerror=true")
    }

    if (loading)
        return <LoginLoader />

    return (
        <div className='mybookings flex flex-col w-full h-fit place-items-center place-content-center gap-10 '>
            <Navbar />
            <h1 className='text-3xl text-slate-700 font-semibold'>My Bookings</h1>
            <div className="list flex flex-col w-[80%] mt-18 gap-4">
                {
                    bookings ? bookings.map((item) => {
                        return <BookingList item={item} />
                    }) : null
                }
            </div>
        </div>
    )
}

export default page


