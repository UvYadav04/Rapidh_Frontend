'use client'

import Header from '@/Components/HomePage/HeaderSection/Header'
import HospitalCard2 from '@/Components/HospitalSeachPage/HospitalAbout'
import React, { useEffect, useMemo, useState } from 'react'
import { hospitalInterface } from '@/Components/HospitalSeachPage/HospitalAbout'
// import { hos pitals } from '../../../data/hospitaldata'
import { redirect, useSearchParams } from 'next/navigation'
import Authentication from '@/Components/Authentication/Authentication'
import BookingWindow from '@/Components/BookingWindow/BookingWindow'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppStore, RootState } from '../../../../lib/Store'
import { getHospitalList } from '../../../../lib/redux/actions/hospitals'
import LoginLoader from '@/Components/Authentication/LoginLoader'
function page() {
    // console.log(hospitals)    import { useSearchParams } from 'next/navigation'
    const { hospitals, Hospitalloading, Hospitalerror } = useSelector((state: RootState) => state.hospitals)
    const [searchinput, setsearchinput] = useState<string>("")
    const params = useSearchParams()
    const [pricefilter, setpricefilter] = useState<number>(0)
    const [Locationfilter, setLocationfilter] = useState<string>("")
    const [filteredHospitalData, setfilteredHospitalData] = useState<hospitalInterface[]>(hospitals)
    const [cities, setcities] = useState<Array<string>>([])
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (Hospitalerror)
            redirect('/RapidHostpital/ErrorOccured')
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
            return filteredHospitalData.sort((a, b) => a.name.localeCompare(b.name));
        }
        if (pricefilter == 1) {
            return filteredHospitalData?.sort((a, b) => a.admissionCharges - b.admissionCharges)
        }
        if (pricefilter == -1) {
            return filteredHospitalData?.sort((a, b) => b.admissionCharges - a.admissionCharges)
        }
    }, [pricefilter])

    useEffect(() => {
        const hname = params.get("search")
        if (hname) {
            setsearchinput(hname.toLowerCase())
        }
    }, [params])

    if (Hospitalloading)
        return <LoginLoader />

    return (
        <div className='hospitals page w-full flex flex-col justify-start max-w-full place-items-center'>

            <Authentication />
            {/* //booking window will appear  only when we have set its status 1 */}
            <BookingWindow />
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
                            return (Locationfilter === "" || item.city === Locationfilter) && (
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


// const getLocation = () => {
//     if (typeof window !== "undefined" && "geolocation" in navigator) {
//         alert("Locating...");
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 const latitude = position.coords.latitude;
//                 const longitude = position.coords.longitude;

//                 // setLocation({ latitude, longitude });
//                 alert(`Latitude: ${latitude}, Longitude: ${longitude}`);
//             },
//             (error) => {
//                 console.log(error.message);
//             }
//         );
//     } else {
//         console.log("Geolocation is not supported by this browser.");
//     }
// };

// useEffect(() => {
//     getLocation();
// }, []);