'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppStore, RootState } from '../../../../lib/Store'
import { redirect, useSearchParams } from 'next/navigation'
import { getMyBookings } from '../../../../lib/redux/actions/bookings'
import LoginLoader from '@/Components/Authentication/LoginLoader'
function page() {
    const dispatch = useDispatch<AppDispatch>()
    const params = useSearchParams()
    const userid = params.get("userid")
    const { profile } = useSelector((state: RootState) => state.user)
    const { bookings, loading, bookingerror } = useSelector((state: RootState) => state.mybookings)

    // console.log(bookings)

    useEffect(() => {
        if (!userid || profile.id === "" || parseInt(userid) !== parseInt(profile.id))
            redirect('/RapidHostpital/Unauthorized')
    }, [])

    useEffect(() => {
        if (!bookings) {
            dispatch(getMyBookings({ userid: JSON.stringify(userid) }))
        }
    }, [dispatch, bookings, loading])

    // console.log(bookingerror)

    if (bookingerror)
        return redirect("/RapidHostpital/ErrorOccured")

    if (loading)
        return <LoginLoader />

    return (
        <div>
            My Bookings
        </div>
    )
}

export default page
