'use client'
import React, { useEffect, useRef, useState } from 'react'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../../lib/Store'
import LoginLoader from '@/Components/Authentication/LoginLoader'
var validator = require("email-validator");

function Page() {
    const router = useRouter();
    const params = useSearchParams();
    const effectRun = useRef(false); // Flag to track first render

    const [email, setEmail] = useState<string>("");
    const [otpsent, setOtpsent] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [incorrectOtp, setIncorrectOtp] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const userid = params.get("user");
    const encodedHospitalData = params.get("hospital");
    const hospitalData = encodedHospitalData ? JSON.parse(atob(encodedHospitalData)) : null;
    const { profile } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (effectRun.current) return; // Prevent second execution
        effectRun.current = true;

        const value = sessionStorage.getItem("key");
        if (!value) return redirect('/RapidHostpital/ErrorOccured?message=refreshed');

        const hashed = btoa(JSON.stringify(profile.email));
        if (hashed !== value) return redirect('/RapidHostpital/Unauthorized');

        sessionStorage.removeItem("key");

        if (!userid || profile.id === "" || parseInt(profile.id) !== parseInt(userid)) {
            return redirect('/RapidHostpital/Unauthorized');
        }

        if (!hospitalData) return redirect('/RapidHostpital/ErrorOccured');
    }, []); // Empty dependency array ensures it runs only once

    const sendOtp = async () => {
        try {
            if (!validator.validate(email)) {
                setIsError(true);
                setTimeout(() => setIsError(false), 3000);
                return;
            }

            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setOtpsent(true);
            }, 1000);
        } catch (error) {
            console.error(error);
            return redirect('/RapidHostpital/ErrorOccured');
        }
    };

    if (loading) return <LoginLoader />;

    return (
        <div className='h-fit flex place-content-center flex-col place-items-center w-full pt-20 gap-3'>
            <input
                type="text"
                disabled={otpsent}
                className='w-1/2 text-slate-700 p-1 rounded-sm border-2 border-slate-300 focus:outline-none'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {isError && <p className='w-1/2 text-start text-sm text-red-500'>Enter a valid email</p>}
            <button disabled={otpsent} className='bg-sky-600 px-4 text-lg rounded-md' onClick={sendOtp}>Send OTP</button>
        </div>
    );
}

export default Page;
