'use client'

import React, { useEffect } from 'react'
import HospitalCard from './HospitalCard'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { AppDispatch, RootState } from '../../../../lib/Store'
import { useDispatch, UseDispatch, useSelector } from 'react-redux'
import { getHospitalList } from '../../../../lib/redux/actions/hospitals'
// import { hospitals } from '../../../data/hospitaldata'
import { fetchrole } from '../../../../lib/redux/actions/Role'
import LoginLoader from '@/Components/Authentication/LoginLoader'
function HospitalsColumn() {
    const router = useRouter()
    const { role, loading, error } = useSelector((state: RootState) => state.role)
    const dispatch = useDispatch<AppDispatch>()
    const { hospitals, Hospitalloading, Hospitalerror } = useSelector((state: RootState) => state.hospitals)

    useEffect(() => {
        if (Hospitalerror)
            redirect('/RapidHostpital/ErrorOccured')
        else if (hospitals.length === 0)
            dispatch(getHospitalList())
    }, [hospitals])

    // useEffect(() => {
    //     if (!loading) {
    //         if (Object.keys(error).length > 0)
    //             redirect('/RapidHostpital/ErrorOccured')
    //         else if (!role)
    //             dispatch(fetchrole())
    //     }
    // }, [role, loading, error, dispatch])


    if (Hospitalloading)
        return <LoginLoader />
    return (
        <div className="hospitalsList mt-10 w-[90%] ">
            <div className="flex buttons flex-row gap-5">
                <h1 onClick={() => router.push('/RapidHostpital/Hospitals')} className='text-2xl cursor-pointer font-bold text-teal-500 mb-3'>Explore Hospitals</h1>
                {role === "admin" ? <h1 onClick={() => router.push('/RapidHostpital/addNewHospital')} className='text-2xl cursor-pointer font-bold text-teal-500 mb-3'>Add new Hospital</h1> : null}
            </div>
            <div className="hostpitals w-[100%] flex overflow-x-scroll max-w-[100vw] gap-5" style={{ scrollbarWidth: "none" }} >
                {
                    hospitals.map((item) => {
                        return <HospitalCard data={item} />
                    })
                }
                <div className="seemore text-teal-500 min-w-fit my-auto px-3 py-2 text-lg">
                    <button onClick={() => router.push('Hospitals')}>See all...</button>
                </div>
            </div>
        </div>
    )
}

export default HospitalsColumn
