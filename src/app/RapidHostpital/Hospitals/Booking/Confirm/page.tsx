'use client'
import React, { useEffect, useRef, useState } from 'react'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../../lib/Store'
import LoginLoader from '@/Components/Authentication/LoginLoader'
var validator = require("email-validator");

function Page() {
    const params = useSearchParams();
    const effectRun = useRef(false); // Flag to track first render

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setloading] = useState<boolean>(false)

    const patient = params.get("patient");
    const encodedHospitalData = params.get("hospital");
    const patientData = patient ? JSON.parse(atob(patient)) : null;
    const hospitalData = encodedHospitalData ? JSON.parse(atob(encodedHospitalData)) : null;
    const { profile } = useSelector((state: RootState) => state.user);
    const [error, setError] = useState<number>(-1)
    const [exists, setexists] = useState<boolean>(false)
    const [booked, setbooked] = useState<boolean>(false)
    const [checked, setchecked] = useState<boolean>(false)

    useEffect(() => {
        if (effectRun.current) return; // Prevent second execution
        effectRun.current = true;

        const value = sessionStorage.getItem("key");
        if (!value) return redirect('/RapidHostpital/ErrorOccured?message=refreshed');

        const hashed = btoa(JSON.stringify(patientData.name));
        if (hashed !== value) return redirect('/RapidHostpital/Unauthorized');

        sessionStorage.removeItem("key");

        if (!hospitalData) return redirect('/RapidHostpital/ErrorOccured');
    }, []);

    const handlebooking = async (email: string) => {
        try {
            setloading(true)
            const response = await fetch("http://localhost:3000/newbooking", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ email, patientData, hospitalData })
            })
            setloading(false)

            if (!response.ok)
                return redirect('/RapidHostpital/ErrorOccured');


            const data = await response.json()
            if (!data.success)
                return redirect('/RapidHostpital/ErrorOccured');

            setbooked(true)

        } catch (error) {
            return redirect('/RapidHostpital/ErrorOccured');
        }
    }


    useEffect(() => {
        if (profile.id !== "") {
            handlebooking(profile.email)
        }
    }, [])



    const checkEmail = async () => {
        try {
            const validity = validator(email)
            if (!validity)
                return
            setloading(true)
            const response = await fetch("http://localhost:3000/checkEmail", {
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
            if (!data.success)
                return redirect('/RapidHostpital/ErrorOccured');

            setchecked(true)
            if (data.EmailExists)
                return setexists(true)

            handlebooking(email)
        } catch (error) {
            return redirect('/RapidHostpital/ErrorOccured');
        }
    }

    const ConfirmLogin = async () => {
        try {
            if (password === "")
                return
            setloading(true)
            const response = await fetch("http://localhost:3000/BookingLogin", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            })
            setloading(false)

            if (!response.ok)
                return redirect('/RapidHostpital/ErrorOccured');

            const data = await response.json()
            if (!data.success)
                return redirect('/RapidHostpital/ErrorOccured');

            if (data.IncorrectCredentials)
                return setError(3)

            handlebooking(email)
        } catch (error) {
            return redirect('/RapidHostpital/ErrorOccured');
        }
    }

    if (loading)
        return <LoginLoader />

    return (
        <div className='h-fit flex place-content-center flex-col place-items-center w-full pt-20 gap-3'>
            <input
                type="text"
                className='w-1/2 text-slate-700 p-1 rounded-sm border-2 border-slate-300 focus:outline-none'
                placeholder='Enter email'
                value={email}
                disabled={checked || loading}
                onChange={(e) => setEmail(e.target.value)}
            />
            {
                checked && exists ? (
                    <input
                        type="password"
                        className='w-1/2 text-slate-700 p-1 rounded-sm border-2 border-slate-300 focus:outline-none'
                        placeholder='Enter password'
                        value={password}
                        disabled={loading}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                ) : null
            }
            {!checked ? <button disabled={checked || loading} onClick={() => checkEmail()}>Proceed</button> : null}
            {checked && exists ? <button disabled={loading} onClick={() => ConfirmLogin()}>Confirm</button> : null}
        </div>
    );
}

export default Page;
