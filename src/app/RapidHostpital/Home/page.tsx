'use client'

import React, { useEffect, Suspense, lazy } from 'react'
import './page.css'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../lib/Store'
import { fetchrole } from '../../../../lib/redux/actions/Role'
import Authentication from '@/Components/Authentication/Authentication'
import Header from '@/Components/HomePage/HeaderSection/Header'
import Footer from '@/Components/HomePage/Footer/Footer'
import LoginLoader from '@/Components/Authentication/LoginLoader'

// Lazy load non-critical components
import LandingPage from '@/Components/HomePage/LandingPage/LandingPage'
import LandingPageForm from '@/Components/HomePage/LandingPage/LandingPageForm'
import Services from '@/Components/HomePage/ServicesSection/Services'
import Banner1 from '@/Components/HomePage/Banners/Banner1'
import Disease from '@/Components/HomePage/DiseaseSection/Disease'
import SlideShow from '@/Components/HomePage/SlideShow/Carousel'
const HospitalsColumn = lazy(() => import('@/Components/HomePage/HospitalListSection/HospitalsColumn'))
const Review = lazy(() => import('@/Components/HomePage/ReviewSection/Review'))

function Page() {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchrole())
    }, [dispatch])

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
