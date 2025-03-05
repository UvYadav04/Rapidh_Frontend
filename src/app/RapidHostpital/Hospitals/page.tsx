'use client'

import Header from '@/Components/HomePage/HeaderSection/Header'
import HospitalCard2 from '@/Components/HospitalSeachPage/HospitalAbout'
import React, { useEffect, useMemo, useState } from 'react'
import { hospitalInterface } from '@/Components/HospitalSeachPage/HospitalAbout'
import { hospitals } from '../../../data/hospitaldata'
import { useSearchParams } from 'next/navigation'
import Authentication from '@/Components/Authentication/Authentication'
function page() {
    // console.log(hospitals)    import { useSearchParams } from 'next/navigation'
    const [searchinput, setsearchinput] = useState<string>("")
    const params = useSearchParams()
    const [pricefilter, setpricefilter] = useState<number>(0)
    const [Locationfilter, setLocationfilter] = useState<string>("")
    const [filteredHospitalData, setfilteredHospitalData] = useState<hospitalInterface[]>(hospitals)
    const [cities, setcities] = useState<Array<string>>([])


    useEffect(() => {
        const uniqueCities = Array.from(
            new Set(hospitals.map((item) => item.city.toLowerCase()))
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
    return (
        <div className='hospitals page w-full flex flex-col justify-start max-w-full place-items-center'>

            <Authentication />

            <Header />
            <div className="hospitalList w-[90%]  mt-10 relative">
                <div className="filters flex sticky justify-end gap-5 rounded-md top-0 px-20 focus:outline-none py-4 w-full">
                    <p className='flex-1 text-3xl font-serif'>
                        {
                            searchinput !== "" ? (
                                <>
                                    Showing result for : {
                                        searchinput.length < 20 ? searchinput : <>{searchinput.slice(0, 20)}...</>
                                    }
                                </>
                            ) : null
                        }
                    </p>

                    <select onChange={(e) => setLocationfilter(e.target.value)} className='rounded-md px-2 py-1 text-lg bg-teal-500 text-white' name="Location" id="">
                        <option value="">Location</option>
                        {
                            cities.map((item, index) => {
                                return <option key={index} value={item}>{item}</option>
                            })
                        }
                    </select>
                    <select onChange={(e) => setpricefilter((Number)(e.target.value))} className='rounded-md px-2 py-1 text-lg bg-teal-500 text-white' name="Price" id="">
                        <option value={0}>Price</option>
                        <option value={1}>Low to High</option>
                        <option value={-1}>High to Low</option>
                    </select>
                </div>
                <div className="list flex flex-col gap-5 justify-evenly mt-5 ">
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
        </div>
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