'use client'
import React, { useEffect, useState } from 'react'
import { redirect, useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../lib/Store'
import './page.css'
import Navbar from '@/Components/HomePage/HeaderSection/Navbar'

function page() {
    const params = useSearchParams()
    const encodedPatientData = params.get("patient")
    const userData = encodedPatientData ? JSON.parse(atob(encodedPatientData)) : null;
    console.log(userData)
    const encodedHospitalData = params.get("hospital")
    const HospitalData = encodedHospitalData ? JSON.parse(atob(encodedHospitalData)) : null;
    // console.log(HospitalData)
    const { profile } = useSelector((state: RootState) => state.user)
    const [patientName, setpatientName] = useState<string>("")
    const [date, setdate] = useState<string>()
    const [errorIndex, setindex] = useState<number>(-1)

    const totalOperationCharges = () => HospitalData.admissionCharges + userData.operationdata.operationCharges + userData.operationdata.bedCharges;
    const totalAdmitCharges = () => HospitalData.admissionCharges + HospitalData.wards[userData.Ward].charge;

    useEffect(() => {
        if (!HospitalData)
            redirect('/RapidHostpital/ErrorOccured')
    }, [params])
    console.log(date)

    const enableError = (t: number) => {
        setTimeout(() => {
            setindex(-1)
        }, 3000);
        setindex(t)
    }

    const handleproceed = () => {
        if (patientName === "")
            return enableError(1)
        if (date === undefined)
            return enableError(2)
        const hashed = btoa(JSON.stringify(patientName))
        sessionStorage.setItem("key", hashed)
        const finaldata = { ...userData, name: patientName, date: date }
        const encodedfinalData = btoa(JSON.stringify(finaldata))
        redirect(`Booking/Confirm?patient=${encodedfinalData}&hospital=${encodedHospitalData}`)
    }

    return (
        <div className='w-full text-black flex flex-col place-items-center place-content-center gap-20'>
            <Navbar />
            <table className='xl:w-6/12 lg:w-7/12 md:w-8/12 sm:w-10/12 w-11/12 bill text-lg'>
                <tbody >
                    <tr >
                        <td>Patient Name</td>
                        <td className=' p-0'><input type="text" name='patientName' className='bg-transparent focus:outline-none w-full m-0' placeholder='enter patient name' value={patientName} onChange={(e) => {
                            setpatientName(e.target.value)
                        }} /></td>

                    </tr>
                    <tr>
                        <td>Date:</td>
                        <td className='p-0'><input type="date" name='patientName' className='bg-transparent focus:outline-none w-full m-0' placeholder='enter patient name' value={date} onChange={(e) => setdate(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <td>Patient Age</td>
                        <td>{userData.Age}</td>
                    </tr>
                    {
                        userData.Admit
                            ?
                            <>
                                <tr>
                                    <td>Ward : </td>
                                    <td>{HospitalData.wards[userData.Ward].name}</td>
                                </tr>
                                <tr>
                                    <td>Days : </td>
                                    <td>{userData.Days === 0 ? "Not Sure" : userData.Days}</td>
                                </tr>
                                <tr>
                                    <td>Requirements : </td>
                                    <td>{userData.Requirements === "" ? "NA" : userData.Requirements}</td>
                                </tr>
                                <tr>
                                    <td>Admission Charges : </td>
                                    <td>{HospitalData.admissionCharges}</td>
                                </tr>
                                <tr>
                                    <td>Ward Bed Charges : </td>
                                    <td>{HospitalData.wards[userData.Ward].charge}</td>
                                </tr>
                                <tr className='bg-slate-300'>
                                    <td>Total : </td>
                                    <td>{totalAdmitCharges()}</td>
                                </tr>
                            </>
                            :
                            <>
                                <tr>
                                    <td>Operation Name : </td>
                                    <td>{userData.operationdata.name}</td>
                                </tr>
                                <tr>
                                    <td>Diabetes : </td>
                                    <td>{userData.diabetes === 1 ? "Yes" : "No"}</td>
                                </tr>
                                <tr>
                                    <td>Allergy : </td>
                                    <td>{userData.Allergy === "" ? "NA" : userData.Allergy}</td>
                                </tr>
                                <tr>
                                    <td>Other Requirements : </td>
                                    <td>{userData.Requirements === "" ? "NA" : userData.Requirements}</td>
                                </tr>
                                <tr>
                                    <td>Admission Charges : </td>
                                    <td>{HospitalData.admissionCharges}</td>
                                </tr>
                                <tr>
                                    <td>Bed Charges : </td>
                                    <td>{userData.operationdata.bedCharges}</td>
                                </tr>
                                <tr>
                                    <td>Operation Charges : </td>
                                    <td>{userData.operationdata.operationCharges}</td>
                                </tr>
                                <tr>
                                    <td className='bg-slate-300'>Total : </td>
                                    <td>{totalOperationCharges()}</td>
                                </tr>
                            </>
                    }
                </tbody>
            </table>

            <button onClick={() => {
                handleproceed()
            }} className='bg-green-500 text-white px-4 py-2 text-xl rounded-md'>Proceed</button>
        </div >
    )
}

export default page
