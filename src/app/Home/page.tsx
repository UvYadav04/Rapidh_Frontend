'use client'

import React, { useEffect, Suspense, lazy } from 'react'
import './page.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../lib/Store'
import Authentication from '@/Components/Authentication/Authentication'
import Header from '@/Components/HomePage/HeaderSection/Header'
import Footer from '@/Components/HomePage/Footer/Footer'
import LoginLoader from '@/Components/Authentication/LoginLoader'

// Lazy load non-critical components
import LandingPage from '@/Components/HomePage/LandingPage/LandingPage'
import Services from '@/Components/HomePage/ServicesSection/Services'
import Banner1 from '@/Components/HomePage/Banners/Banner1'
import Disease from '@/Components/HomePage/DiseaseSection/Disease'
import SlideShow from '@/Components/HomePage/SlideShow/Carousel'
const HospitalsColumn = lazy(() => import('@/Components/HomePage/HospitalListSection/HospitalsColumn'))
const Review = lazy(() => import('@/Components/HomePage/ReviewSection/Review'))
import { getHospitalList } from '../../../lib/redux/actions/hospitals'
import { redirect } from 'next/navigation'
import { resetHospitalError } from '../../../lib/redux/slices/Hospitals'
import Notification from '@/Components/Notification/Notification'

function Page() {
    const { hospitals, Hospitalloading, Hospitalerror } = useSelector((state: RootState) => state.hospitals)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (Hospitalerror) {
            dispatch(resetHospitalError())
            redirect('/ErrorOccured?message=Error on hospital Search page')
        }
        else if (hospitals.length === 0)
            dispatch(getHospitalList())
    }, [hospitals])
    return (
        <div className='Homepage h-fit border-2 border-white flex flex-col justify-start place-items-center'>
            <Authentication />
            <Header />

            <LandingPage />

            <Suspense fallback={<LoginLoader />}>
                <HospitalsColumn />
            </Suspense>
            <Disease />
            <Banner1 />
            <Services />
            <Suspense fallback={<LoginLoader />}>
                <Review />
            </Suspense>
            <SlideShow />
            <Footer />

        </div>
    )
}

export default Page
