'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../lib/Store'
import { useRouter, useSearchParams } from 'next/navigation'
import { getMyBookings } from '../../../lib/redux/actions/bookings'
import LoginLoader from '@/Components/Authentication/LoginLoader'
import Navbar from '@/Components/HomePage/HeaderSection/Navbar'
import { Booking, resetBookingError } from '../../../lib/redux/slices/Mybookings'
import './page.css'
import BookingList from './BookingList'
import Header from '@/Components/HomePage/HeaderSection/Header'

function Page() {
    const dispatch = useDispatch<AppDispatch>()
    const params = useSearchParams()
    const userid = params.get("userid")
    const { profile } = useSelector((state: RootState) => state.user)
    const { bookings, loading, bookingerror } = useSelector((state: RootState) => state.mybookings)
    const router = useRouter()


    useEffect(() => {
        if (bookingerror) {
            // console.log(bookingerror)
            dispatch(resetBookingError())
            return router.replace("ErrorOccured?Error in finding bookings")
        }
        else if (!bookings || bookings.length === 0) {
            dispatch(getMyBookings())
        }
    }, [bookings, bookingerror, loading])

    const sortedData = useMemo(() => {
        if (!bookings) return []; // Handle null case safely

        return [...bookings].sort((a, b) =>
            new Date(b.AdmissionDate).getTime() - new Date(a.AdmissionDate).getTime()
        );
    }, [bookings]);




    useEffect(() => {
        if (profile.id === "" || profile.id !== userid)
            return router.replace('Unauthorized')
    }, [profile, params])

    if (loading) return <LoginLoader />

    return (
        <div className='mybookings flex flex-col w-full h-fit place-items-center place-content-center gap-10 '>
            <Header />
            <h1 className='text-3xl text-slate-700 font-semibold'>My Bookings</h1>
            <div className="xl:w-11/12 lg:w-9/12 md:w-10/12 w-11/12 bg-slate-300 rounded-sm overflow-x-auto overflow-y-scroll  max-h-[70vh]" style={{ scrollbarWidth: 'none' }}>
                <table className="min-w-full border-collapse border border-gray-400 md:text-center text-left text-sm md:text-base">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-400 px-4 py-2 min-w-[150px]">Hospital</th>
                            <th className="border border-gray-400 px-4 py-2 min-w-[150px]">Date</th>
                            <th className="border border-gray-400 px-4 py-2 min-w-[150px]">Patient</th>
                            <th className="border border-gray-400 px-4 py-2 min-w-[150px] ">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData?.map((item: Booking, index: number) => {
                            return <BookingList item={item} key={index} />
                        })}
                        {bookings?.length === 0 && (
                            <tr>
                                <td colSpan={4} className="border border-gray-400 px-4 py-2 text-center">No bookings found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Page