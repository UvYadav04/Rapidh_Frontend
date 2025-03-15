'use client'

import React, { useEffect } from 'react'
import HospitalCard from './HospitalCard'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { AppDispatch, RootState } from '../../../../lib/Store'
import { useDispatch, UseDispatch, useSelector } from 'react-redux'
import { getHospitalList } from '../../../../lib/redux/actions/hospitals'
// import { hospitals } from '../../../data/hospitaldata'
import LoginLoader from '@/Components/Authentication/LoginLoader'
import { resetHospitalError } from '../../../../lib/redux/slices/Hospitals'
function HospitalsColumn() {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const { hospitals, Hospitalloading, Hospitalerror } = useSelector((state: RootState) => state.hospitals)

    useEffect(() => {
        if (Hospitalerror) {
            dispatch(resetHospitalError())
            redirect('/ErrorOccured')
        }
        else if (!hospitals || hospitals.length === 0)
            dispatch(getHospitalList())
    }, [hospitals])


    if (Hospitalloading)
        return <LoginLoader />
    return (
        <div className="hospitalsList mt-10 w-[90%] ">
            <div className="flex buttons flex-row gap-5">
                <h1 onClick={() => router.push('/Hospitals')} className='text-2xl cursor-pointer font-bold text-teal-500 mb-3'>Explore Hospitals</h1>
            </div>
            <div className="hostpitals w-[100%] flex overflow-x-scroll max-w-[100vw] gap-5" style={{ scrollbarWidth: "none" }} >
                {
                    hospitals && hospitals.map((item, index) => {
                        return <HospitalCard key={index} data={item} />
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
