'use client'

import Header from '@/Components/HomePage/HeaderSection/Header'
import HospitalCard2 from '@/Components/HospitalSeachPage/HospitalAbout'
import React, { useEffect, useMemo, useState } from 'react'
import { hospitalInterface } from '@/Components/HospitalSeachPage/HospitalAbout'
import { redirect, useSearchParams } from 'next/navigation'
import Authentication from '@/Components/Authentication/Authentication'
import { useDispatch, useSelector } from 'react-redux'
import LoginLoader from '@/Components/Authentication/LoginLoader'
import { getHospitalList } from '../../../lib/redux/actions/hospitals'
import { AppDispatch, RootState } from '../../../lib/Store'
import { resetHospitalError } from '../../../lib/redux/slices/Hospitals'
function page() {
    const { hospitals, Hospitalloading, Hospitalerror } = useSelector((state: RootState) => state.hospitals)
    const [searchinput, setsearchinput] = useState<string>("")
    const params = useSearchParams()
    const [pricefilter, setpricefilter] = useState<number>(0)
    const [Locationfilter, setLocationfilter] = useState<string>("")
    const [filteredHospitalData, setfilteredHospitalData] = useState<hospitalInterface[]>(hospitals)
    const [cities, setcities] = useState<Array<string>>([])
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (Hospitalerror) {
            dispatch(resetHospitalError())
            redirect('/ErrorOccured?message=Error on hospital Search page')
        }
        else if (hospitals.length === 0)
            dispatch(getHospitalList())
    }, [hospitals])

    useEffect(() => {
        const uniqueCities = Array.from(
            new Set(hospitals.map((item: hospitalInterface) => item.city.toLowerCase()))
        );
        setcities(uniqueCities);
    }, []);

    useMemo(() => {
        if (pricefilter == 0) {
            filteredHospitalData.sort((a, b) => a.name.localeCompare(b.name));
        }
        if (pricefilter == 1) {
            filteredHospitalData?.sort((a, b) => a.admissionCharges - b.admissionCharges)
        }
        if (pricefilter == -1) {
            filteredHospitalData?.sort((a, b) => b.admissionCharges - a.admissionCharges)
        }

        setfilteredHospitalData([...filteredHospitalData])

    }, [pricefilter])

    useEffect(() => {
        const hname = params.get("search")
        if (hname) {
            setsearchinput(hname.toLowerCase())
        }
    }, [params])

    useEffect(() => {
        filteredHospitalData.sort((a, b) => {
            const aMatches = a.city.toLowerCase().includes(Locationfilter.toLowerCase());
            const bMatches = b.city.toLowerCase().includes(Locationfilter.toLowerCase());
            if (aMatches && !bMatches) return -1;
            if (!aMatches && bMatches) return 1;
            return a.name.localeCompare(b.name);
        });

        setfilteredHospitalData([...filteredHospitalData])
    }, [Locationfilter, hospitals]);


    if (Hospitalloading)
        return <LoginLoader />

    return (
        <div className='hospitals page w-full flex flex-col justify-start max-w-full place-items-center'>

            <Authentication />

            <Header />
            <div className="hospitalList w-[90%]  mt-10 relative ">
                <div className=" filters flex md:flex-row flex-col sticky justify-end gap-2 rounded-md top-0 xl:px-20 lg:px-16 md:px-12 sm:px-8 px-4 py-2 focus:outline-none  w-full bg-slate-200">
                    {
                        searchinput !== "" ? (
                            <p className='flex-1 xl:text-3xl lg:text-2xl md:text-xl sm:text-lg text-md font-serif '>
                                <>
                                    Showing result for : {
                                        searchinput.length < 20 ? searchinput : <>{searchinput.slice(0, 20)}...</>
                                    }
                                </>
                            </p>
                        ) : null
                    }

                    <div className="filters flex gap-4 justify-start">
                        <select onChange={(e) => setLocationfilter(e.target.value)} className='rounded-md lg:px-2 md:px-1 px-[5px] md:py-1 py-[3px] lg:text-lg md:text-md text-sm bg-teal-500 text-white' name="Location" id="">
                            <option value="">Location</option>
                            {
                                cities.map((item, index) => {
                                    return <option key={index} value={item}>{item}</option>
                                })
                            }
                        </select>
                        <select onChange={(e) => setpricefilter((Number)(e.target.value))} className='rounded-md lg:px-2 md:px-1 px-[5px] md:py-1 py-[3px] lg:text-lg md:text-md text-sm bg-teal-500 text-white' name="Price" id="">
                            <option value={0}>Price</option>
                            <option value={1}>Low to High</option>
                            <option value={-1}>High to Low</option>
                        </select>
                    </div>
                </div>
                <div className="list flex flex-col gap-5 justify-evenly my-5 ">
                    {
                        filteredHospitalData.map((item: hospitalInterface, index: number) => {
                            return (
                                item.name.toLowerCase().includes(searchinput.toLowerCase()) ? (
                                    <HospitalCard2 data={item} key={`hospital-${index}`} />
                                ) : (
                                    item.operations.find((operation) => operation.name.toLowerCase().includes(searchinput.toLowerCase())) ? (
                                        <HospitalCard2 data={item} key={`hospital-${index}-operation`} />
                                    ) : null
                                )
                            )

                        })
                    }
                </div>
            </div>
        </div >
    )
}

export default page