'use client'
import React, { useEffect, useRef, useState } from 'react'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import './page.css'
import Navbar from '@/Components/HomePage/HeaderSection/Navbar'
import { AppDispatch, RootState } from '../../../../lib/Store'
import LoginLoader from '@/Components/Authentication/LoginLoader'
import Notification from '@/Components/Notification/Notification'
import { getMyBookings } from '../../../../lib/redux/actions/bookings'
import { fetchWithTimeout } from '../../../../lib/redux/actions/hospitals'
import ServerError from '@/Components/Authentication/ServerError'

interface personalInfo {
    name: string,
    date: string | undefined,
    reason: string
}

function page() {
    const router = useRouter()
    const params = useSearchParams()
    const userId = params.get("user")
    const encodedPatientData = params.get("patient")
    const patientData = encodedPatientData ? JSON.parse(atob(encodedPatientData)) : null;
    const encodedHospitalData = params.get("hospital")
    const HospitalData = encodedHospitalData ? JSON.parse(atob(encodedHospitalData)) : null;
    const { profile } = useSelector((state: RootState) => state.user)
    const [patient, setPatient] = useState<personalInfo>({ name: "", date: new Date().getDate().toString().split('T')[0], reason: "" })
    const [index, setindex] = useState<number>(-1)
    const hasRunOnce = useRef(false); // Ref to track if the effect has run
    const [loading, setloading] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>()

    const totalOperationCharges = () => HospitalData?.admissionCharges + patientData?.operationdata.operationCharges + patientData?.Ward.charge;
    const totalAdmitCharges = () => (Number)(HospitalData?.admissionCharges) + (Number)(patientData?.Ward.charge);

    useEffect(() => {
        if (!HospitalData || !patientData || !userId)
            return redirect('/ErrorOccured?message=Data tampered before booking')

        if (profile.id === "" || !userId || profile.id !== userId)
            return router.replace('/Unauthorized')


    }, [params, profile, patientData, HospitalData])
    // console.log(patientData)


    useEffect(() => {
        if (hasRunOnce.current) return; // Skip the effect if it has already run
        const sessionKey = sessionStorage.getItem("sessionKey")
        if (!sessionKey)
            return router.replace('/Unauthorized')
        sessionStorage.removeItem("sessionKey")

        hasRunOnce.current = true;
    }, []);


    const enableError = (t: number) => {
        setTimeout(() => {
            setindex(-1)
        }, 3000);
        setindex(t)
    }

    const handleproceed = async () => {
        try {
            if (patient.name === "")
                return enableError(1);
            if (patient.date === undefined)
                return enableError(2);
            if (patientData.Admit && patient.reason.length < 20)
                return enableError(3);

            let finaldata = {
                ...patientData,
                userId,
                hospitalId: HospitalData.id,
                Ward: patientData.Ward.id,
                name: patient.name,
                date: patient.date,
                price: patientData.Admit ? totalAdmitCharges() : totalOperationCharges(),
            };

            if (patientData.Admit)
                finaldata = { ...finaldata, reason: patient.reason, days: patientData.Days ? patientData.Days : "not sure" };
            if (patientData.Operation)
                finaldata = { ...finaldata, operationdata: patientData.operationdata?.id };

            setloading(true);

            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 8000); // Timeout after 8 seconds

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/client/patient/newBooking`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ ...finaldata }),
                    signal: controller.signal, // Attach the abort signal
                });

                clearTimeout(timeout); // Clear timeout if request completes
                console.log(response)
                if (!response.ok)
                    return enableError(9);

                const data = await response.json();
                console.log(data)
                if (data.status === "error") {
                    return enableError(9);
                }

                enableError(11); // Show success notification
                dispatch(getMyBookings());
                setTimeout(() => router.replace('/'), 3000);

            } catch (catcherror: any) {
                if (catcherror.name === "AbortError") {
                    return enableError(10); // Error for timeout
                }
                return enableError(9);
            } finally {
                setloading(false);
            }
        } catch (error) {
            setloading(false);
            return enableError(9);
        }
    };


    const handlePatient = ((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setPatient((prev) => {
            return { ...prev, [name]: value }
        })
    })

    if (loading)
        return <LoginLoader />

    if (index == 10)
        return <ServerError />

    if (index == 9)
        return <Notification status='failure' />

    if (index == 11)
        return <Notification status='success' />

    return (
        <div className='w-full text-black flex flex-col place-items-center place-content-center gap-0'>
            <Navbar />
            <p className='text-red-500 text-sm w-full text-start'>*Please do not refresh the page.</p>
            <table className='xl:w-6/12 lg:w-7/12 md:w-8/12 sm:w-10/12 w-11/12 bill text-lg mt-20 bg-slate-300'>
                <tbody >
                    <tr  >
                        <td >Patient Name</td>
                        <td className='bg-slate-100 p-0'><input type="text" name='name' className='focus:outline-none bg-transparent  m-0 p-0 w-full' placeholder='Enter patient name' value={patient.name} onChange={(e) => handlePatient(e)} /></td>

                    </tr>


                    <tr>
                        <td>Date:</td>
                        <td className='p-0 bg-slate-100'><input type="date" name='date' className='bg-transparent focus:outline-none w-full m-0' value={patient.date} min={new Date().toISOString().split('T')[0]} onChange={(e) => handlePatient(e)} /></td>
                    </tr>
                    <tr >
                        <td>Hospital</td>
                        <td className=' p-0'>{HospitalData?.name}</td>

                    </tr>
                    <tr>
                        <td>Patient Age</td>
                        <td>{patientData?.Age}</td>
                    </tr>
                    {
                        patientData?.Admit
                            ?
                            <>

                                <tr>
                                    <td>Ward : </td>
                                    <td>{patientData?.Ward.name}</td>
                                </tr>
                                <tr>
                                    <td>Days : </td>
                                    <td>{patientData.Days ? patientData?.Days : "Not Sure"}</td>
                                </tr>
                                <tr>
                                    <td className='float-start' >Requirements : </td>
                                    <td className='max-w-32 break-words max-h-10 overflow-y-auto'>
                                        {patientData.Requirements === "" ? "NA" : patientData?.Requirements}</td>
                                </tr>
                                <tr>
                                    <td>Admission Charges : </td>
                                    <td>{HospitalData?.admissionCharges}</td>
                                </tr>
                                <tr>
                                    <td>Ward Bed Charges : </td>
                                    <td>{patientData?.Ward?.charge}</td>
                                </tr>
                                <tr >
                                    <td>Reason to admit : </td>
                                    <td className=' bg-slate-100'><input type="text" name='reason' className='bg-transparent focus:outline-none w-full m-0' placeholder='enter reason to admit' value={patient.reason} onChange={(e) => handlePatient(e)} /></td>

                                </tr>
                                <tr className='bg-slate-100'>
                                    <td>Total : </td>
                                    <td>{totalAdmitCharges()}</td>
                                </tr>
                            </>
                            :
                            <>
                                <tr>
                                    <td>Operation Name : </td>
                                    <td>{patientData?.operationdata?.name}</td>
                                </tr>
                                <tr>
                                    <td>Diabetes : </td>
                                    <td>{patientData?.diabetes === 1 ? "Yes" : "No"}</td>
                                </tr>
                                <tr>
                                    <td>Allergy : </td>
                                    <td>{patientData?.Allergy === "" ? "NA" : patientData?.Allergy}</td>
                                </tr>
                                <tr>
                                    <td>Other Requirements : </td>
                                    <td>{patientData?.Requirements === "" ? "NA" : patientData?.Requirements}</td>
                                </tr>
                                <tr>
                                    <td>Ward Bed Charges : </td>
                                    <td>{patientData?.Ward?.charge}</td>
                                </tr>
                                <tr>
                                    <td>Admission Charges : </td>
                                    <td>{HospitalData?.admissionCharges}</td>
                                </tr>

                                <tr>
                                    <td>Operation Charges : </td>
                                    <td>{patientData?.operationdata?.operationCharges}</td>
                                </tr>
                                <tr className='bg-slate-100'>
                                    <td >Total : </td>
                                    <td>{totalOperationCharges()}</td>
                                </tr>
                            </>
                    }
                </tbody>
            </table>
            {index == 1 ? <p className='xl:w-6/12 lg:w-7/12 md:w-8/12 sm:w-10/12 w-11/12 text-start text-red-500'>Enter the name of the patient.</p> : null}
            {index == 2 ? <p className='xl:w-6/12 lg:w-7/12 md:w-8/12 sm:w-10/12 w-11/12 text-start text-red-500'>Select a date please.</p> : null}
            {index == 3 ? <p className='xl:w-6/12 lg:w-7/12 md:w-8/12 sm:w-10/12 w-11/12 text-start text-red-500'>Reason must be atleast 20 characters long.</p> : null}

            <div className="navigation flex justify-between gap-5 place-items-center">
                <button onClick={() => {
                    router.back()
                }} className='bg-red-500 text-white px-4 py-2 text-xl rounded-md mt-16'>Back</button>
                <button onClick={() => {
                    handleproceed()
                }} className='bg-green-500 text-white px-4 py-2 text-xl rounded-md mt-16'>Proceed</button>
            </div>
        </div >
    )
}

export default page
