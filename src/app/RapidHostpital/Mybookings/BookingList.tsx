'use client'

import { MdCancel } from "react-icons/md"
import { Booking } from "../../../../lib/redux/slices/Mybookings"
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"

function BookingList({ item }: { item: Booking }) {
    const [pop, setpop] = useState<boolean>(false)
    const router = useRouter()
    return (
        <div className='w-full bg-slate-300 flex flex-col px-2 py-1 rounded-sm' >
            <h1 className='text-3xl text-teal-500 font-bold cursor-pointer' onClick={() => setpop(true)}>{item.HospitalName.toLocaleUpperCase()}</h1>
            <h6 className='text-slate-800'>{item.AdmissionDate}</h6>
            {pop ?
                <div className={`w-full ${!pop ? "hidden" : ""} min-h-fit h-full fixed top-0 left-0 flex place-content-center place-items-center  bg-slate-500/50`}>
                    <div className='xl:w-6/12 lg:w-7/12 md:w-8/12 sm:w-10/12 w-11/12 bill text-lg mt-20 bg-slate-200 py-2 px-3 flex flex-col relative '>
                        <MdCancel size={30} color='red' className="cursor-pointer absolute right-0 top-0" onClick={() => {
                            setpop(false)
                        }} />
                        <table className='w-full'>
                            <tbody className='' >
                                <tr >
                                    <td>Patient Name</td>
                                    <td >{item.Name}</td>

                                </tr>


                                <tr>
                                    <td>Date:</td>
                                    <td >{item.AdmissionDate}</td>
                                </tr>
                                <tr >
                                    <td>Hospital</td>
                                    <td className="text-blue-500 cursor-pointer" onClick={() => {
                                        router.push(`Hospitals?search=${item.HospitalName}`)
                                    }}>{item.HospitalName}</td>

                                </tr>
                                <tr>
                                    <td>Patient Age</td>
                                    <td>{item.Age}</td>
                                </tr>
                                {
                                    item.OnlyAdmit ?
                                        <>

                                            <tr>
                                                <td>Ward : </td>
                                                <td>{item.WardName}</td>
                                            </tr>
                                            <tr>
                                                <td>Days : </td>
                                                <td>{item.DaysToAdmit === 0 ? "Not specified" : item.DaysToAdmit}</td>
                                            </tr>
                                            <tr>
                                                <td>Other Requirements : </td>
                                                <td>{item.Requirements !== "" ? item.Requirements : "No Requirements"}</td>
                                            </tr>
                                            {/* <tr>
                                        <td>Admission Charges : </td>
                                        <td>{item.}</td>
                                    </tr> */}
                                            <tr>
                                                <td>Ward Bed Charges : </td>
                                                <td>{item.ChargePerDay}</td>
                                            </tr>
                                            <tr >
                                                <td>Reason to admit</td>
                                                <td className=' p-0'>{item.ReasonToAdmit}</td>

                                            </tr>
                                            <tr className='bg-slate-300'>
                                                <td>Total : </td>
                                                <td>{item.TotalPrice}</td>
                                            </tr>
                                        </>
                                        :
                                        <>
                                            <tr>
                                                <td>Operation Name : </td>
                                                <td>{item.OperationName}</td>
                                            </tr>
                                            <tr>
                                                <td>Diabetes : </td>
                                                <td>{item.Diabetes === 0 ? "No" : "Yes"}</td>
                                            </tr>
                                            <tr>
                                                <td>Allergy : </td>
                                                <td>{item.Allergy !== "" ? item.Allergy : "No Allergy"}</td>
                                            </tr>
                                            <tr>
                                                <td>Other Requirements : </td>
                                                <td>{item.Requirements !== "" ? item.Requirements : "No Requirements"}</td>
                                            </tr>
                                            <tr>
                                                <td>Ward Bed Charges : </td>
                                                <td>{item.ChargePerDay}</td>
                                            </tr>
                                            {/* <tr>
                                        <td>Admission Charges : </td>
                                        <td>{Hospitalitem?.admissionCharges}</td>
                                    </tr> */}

                                            <tr>
                                                <td>Operation Charges : </td>
                                                <td>{item.OperationCharge}</td>
                                            </tr>
                                            <tr className='bg-slate-300'>
                                                <td >Total : </td>
                                                <td>{item.TotalPrice}</td>
                                            </tr>
                                        </>
                                }
                            </tbody>
                        </table>
                    </div>

                </div> : null
            }
        </div >
    )
}
export default BookingList