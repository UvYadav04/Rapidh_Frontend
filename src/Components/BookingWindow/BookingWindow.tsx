'use client'

import { useBookingWindow } from '@/ContextProvider/BookingWindow'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../lib/Store'
import LoginLoader from '../Authentication/LoginLoader'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/ContextProvider/LoginContext'
import ServerError from '../Authentication/ServerError'
import { fetchWithTimeout } from '../../../lib/redux/actions/hospitals'
var validator = require("email-validator");

function BookingWindow({ setwindow }: { setwindow: Dispatch<SetStateAction<boolean>> }) {
    const { booking, setbooking } = useBookingWindow()
    const { profile, erroruser, loading } = useSelector((state: RootState) => state.user)
    const [email, setemail] = useState<string>("")
    const [isloading, setloading] = useState<boolean>(false)
    const [exists, setexists] = useState<boolean>(false)
    const [checked, setchecked] = useState<boolean>(false)
    const { loginStatus, setLoginStatus } = useAuth()
    const router = useRouter()
    const [index, setindex] = useState<number>(-1)

    useEffect(() => {
        return (() => {
            setchecked(false)
            setloading(false)
            setemail("")
        })
    }, [booking])

    if (loading || isloading)
        return <LoginLoader />

    const enablerror = (item: number) => {
        setindex(item)
        setTimeout(() => {
            setindex(-1)
        }, 5000);
    }

    const checkEmail = async () => {
        try {
            if (email === "") return;

            const validity = validator.validate(email);
            if (!validity) return;

            setloading(true);

            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 8000); // Timeout after 8 seconds

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/client/emailExists`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({ email: email }),
                    signal: controller.signal, // Attach abort signal
                });

                clearTimeout(timeout); // Clear timeout if request completes

                if (!response.ok) return enablerror(1);

                const data = await response.json();
                setchecked(true);

                if (data.status === "error") return enablerror(1);

                if (data.exists) {
                    return setexists(true);
                }

                // console.log("reaching here");
                setbooking(0);

            } catch (catcherror: any) {
                if (catcherror.name === "AbortError") {
                    // console.log("Request timed out");
                    return enablerror(1); // Use a different error code for timeout
                }
                // console.log("error: ", catcherror);
                return enablerror(1);
            } finally {
                setloading(false);
            }
        } catch (error) {
            setloading(false);
            // console.log("error: ", error);
            return enablerror(1);
        }
    };


    if (loading)
        return <LoginLoader />

    return (
        <div className='min-h-fit m-w-fit w-[100vw] h-[100vh] bg-transparent fixed top-0 left-0 z-[45] flex place-content-center place-items-center booking'>
            {
                index == 1 ? <ServerError /> : <div className="bookingbox opacity-100 p-4 bg-slate-200 border-2 border-slate-400 lg:w-4/12 md:w-5/12 sm:7/12 w-8/12 md:h-44 h-32 flex flex-col justify-start place-items-center md:gap-4 gap-2">
                    {checked && exists && <p className='text-red-400 text-sm mt-0 w-full text-start'>This email is aleady registered.</p>}
                    {checked && !exists && <p className='text-red-400 text-sm mt-0 w-full text-start'>Welcome, please create an account to proceed.</p>}
                    <input type="text" disabled={checked || loading} name='email' placeholder='enter email' value={email} onChange={(e) => setemail(e.target.value)} className='focus:outline-none bg-slate-300 rounded-md px-2 py-1 w-full' />
                    {!checked && <button className={`px-3 py-0 text-lg bg-teal-500 rounded-md`} onClick={(() => {
                        checkEmail()
                    })}>Proceed</button>}
                    {checked && exists && <button className='px-3 py-0 text-sm text-white bg-teal-500 rounded-sm' onClick={() => {
                        setbooking(0)
                        setLoginStatus(1)
                    }}>Go to Login</button>}
                    {checked && !exists && <button className='px-3 py-0 text-sm text-white bg-teal-500 rounded-sm' onClick={() => {
                        setbooking(0)
                        setLoginStatus(1)
                    }}>Create own account</button>}
                    <span className='w-full text-start mt-auto'>
                        <button className='text-red-500' onClick={() => setwindow(false)}>Cancel</button>
                    </span>
                </div>
            }
        </div>
    )
}

export default BookingWindow
