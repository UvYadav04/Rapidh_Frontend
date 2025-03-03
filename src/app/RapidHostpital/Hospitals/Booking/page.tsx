'use client'
import React, { useEffect } from 'react'
import { redirect, useSearchParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../lib/Store'
import './page.css'
import Navbar from '@/Components/HomePage/HeaderSection/Navbar'

function page() {
    const params = useSearchParams()
    const userid = params.get("user")
    const encodedPatientData = params.get("patient")
    const userData = encodedPatientData ? JSON.parse(atob(encodedPatientData)) : null;
    const encodedHospitalData = params.get("hospital")
    const HospitalData = encodedHospitalData ? JSON.parse(atob(encodedHospitalData)) : null;
    // console.log(HospitalData)
    const { profile } = useSelector((state: RootState) => state.user)

    const totalOperationCharges = () => HospitalData.admissionCharges + userData.operationdata.operationCharges + userData.operationdata.bedCharges;
    const totalAdmitCharges = () => HospitalData.admissionCharges + HospitalData.wards[userData.Ward].charge;

    useEffect(() => {
        if (!userid || profile.id === "" || parseInt(profile.id) !== parseInt(userid)) {
            redirect('/RapidHostpital/Unauthorized')
        }
        if (!HospitalData)
            redirect('/RapidHostpital/ErrorOccured')
    }, [])


    return (
        <div className='w-full text-black flex flex-col place-items-center place-content-center gap-20'>
            <Navbar />
            <table className='w-1/2 bill text-lg'>
                <tbody >
                    <tr >
                        <td>Patient Name</td>
                        <td>Rose Lizzo</td>
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
                const hashed = btoa(JSON.stringify(profile.email))
                sessionStorage.setItem("key", hashed)
                redirect(`Booking/Confirm?user=${profile.id}&patient=${encodedPatientData}&hospital=${encodedHospitalData}`)
            }} className='bg-green-500 text-white px-4 py-2 text-xl rounded-md'>Proceed</button>
        </div>
    )
}

export default page
