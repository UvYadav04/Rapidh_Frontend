'use client'

import { useBookingWindow } from '@/ContextProvider/BookingWindow'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../lib/Store'
import LoginLoader from '../Authentication/LoginLoader'
import { redirect } from 'next/navigation'
import { useAuth } from '@/ContextProvider/LoginContext'
var validator = require("email-validator");

function BookingWindow() {
    const { booking, setbooking } = useBookingWindow()
    const { profile, erroruser, loading } = useSelector((state: RootState) => state.user)
    const [email, setemail] = useState<string>("")
    const [isloading, setloading] = useState<boolean>(false)
    const [exists, setexists] = useState<boolean>(false)
    const [checked, setchecked] = useState<boolean>(false)
    const { loginStatus, setLoginStatus } = useAuth()

    useEffect(() => {
        return (() => {
            setchecked(false)
            setloading(false)
            setemail("")
        })
    }, [booking])

    const EmailValidity = () => {
        const validity = validator(email)
        if (validity)
            setvalidemail(true)
    }

    if (booking === 0)
        return null

    if (loading || isloading)
        return <LoginLoader />

    const checkEmail = async () => {
        try {
            if (email === "")
                return
            const validity = validator(email)
            if (!validity)
                return
            setloading(true)
            const response = await fetch("", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ email })
            })
            setloading(false)

            if (!response.ok)
                return redirect('/RapidHostpital/ErrorOccured');

            const data = await response.json()
            setchecked(true)
            if (!data.success)
                return redirect('/RapidHostpital/ErrorOccured');

            if (data.exists)
                return setexists(true)
            setbooking(0)
            setLoginStatus(2)

        } catch (error) {
            return redirect('/RapidHostpital/ErrorOccured');
        }
    }


    return (
        <div className='min-h-fit m-w-fit w-[100vw] h-[100vh] bg-transparent fixed top-0 left-0 z-[45] flex place-content-center place-items-center booking'>
            <div className="bookingbox opacity-100 p-4 bg-slate-200 border-2 border-slate-400 w-1/4 h-44 flex flex-col justify-start place-items-center gap-4">
                {checked && exists && <p className='text-red-400 text-sm mt-0 w-full text-start'>This email is aleady registered.</p>}
                <input type="text" disabled={checked || loading} name='email' placeholder='enter email' value={email} onChange={(e) => setemail(e.target.value)} className='focus:outline-none bg-slate-300 rounded-md px-2 py-1 w-full' />
                {!checked && <button className={`px-3 py-0 text-lg bg-teal-500 rounded-md`} onClick={(() => {
                    checkEmail()
                    EmailValidity()
                })}>Proceed</button>}
                {checked && <button className='px-3 py-0 text-sm text-white bg-teal-500 rounded-sm' onClick={() => {
                    setbooking(0)
                    setLoginStatus(1)
                }}>Go to Login</button>}
                <span className='w-full text-start mt-auto'>
                    <button className='text-red-500' onClick={() => setbooking(0)}>Cancel</button>
                </span>
            </div>
        </div>
    )
}

export default BookingWindow
