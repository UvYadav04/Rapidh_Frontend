import HospitalList from '@/Components/HospitalsList/HospitalList'
import React, { createRef, useEffect, useMemo, useRef, useState } from 'react'
// import { hospitals } from '@/data/hospitaldata'
import { redirect, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../lib/Store'
import { getHospitalList } from '../../../../lib/redux/actions/hospitals'
import { hospitalInterface } from '@/Components/HospitalSeachPage/HospitalAbout'
import LoginLoader from '@/Components/Authentication/LoginLoader'
import { resetHospitalError } from '../../../../lib/redux/slices/Hospitals'
import { FaSearch } from "react-icons/fa";

function SearchBar() {
    const [input, setinput] = useState<string>("")
    const [city, setcity] = useState<string>("")
    const [cities, setcities] = useState<Array<string>>([])
    const router = useRouter()
    const [focused, setfocused] = useState<boolean>(false)
    const [blurr, setblurr] = useState<boolean>(false)
    const [width, setwidth] = useState<number>()

    const { hospitals, Hospitalloading, Hospitalerror } = useSelector((state: RootState) => state.hospitals)
    const dispatch = useDispatch<AppDispatch>()

    // useEffect(() => {
    //     if (Hospitalerror) {
    //         // console.log(Hospitalerror)
    //         dispatch(resetHospitalError())
    //         redirect('/ErrorOccured?message=hospitalError in searchbar')
    //     }
    //     else if (hospitals && hospitals?.length === 0)
    //         dispatch(getHospitalList())
    // }, [hospitals, Hospitalloading, Hospitalerror])

    useEffect(() => {
        const handleResize = () => {
            setwidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        // Cleanup function to remove event listener when component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []); // Empty dependency array ensures effect runs only once

    const handlefocus = () => {
        if (focused)
            return
        setfocused(true)
        setblurr(false)
    }
    const handleblurr = () => {
        if (blurr)
            return
        setTimeout(() => {
            setblurr(true)
            setfocused(false)
        }, 1000);
    }


    useEffect(() => {
        const uniqueCities = Array.from(
            new Set(hospitals?.map((item: hospitalInterface) => item.city.toLowerCase()))
        );
        setcities(uniqueCities);
    }, []);

    const handlesearch = () => {
        if (input === "")
            return
        setinput("")//will set after re-rendering page, so input will be same in next line
        router.push(`/Hospitals?search=${input}`)
    }

    if (Hospitalloading)
        return <LoginLoader />
    return (
        <div className='w-full h-fit flex justify-end place-items-center md:py-2 sm:py-1 py-0 '   >
            <div className={`searchbar w-full flex gap-3  ${focused && width && width <= 500 ? "absolute top-1 left-0 w-full h-fit z-40" : ""}   sm:justify-center md:pe-10 pe-0 justify-end  `}>
                <div onFocus={() => handlefocus()} onBlur={() => handleblurr()} className="search md:w-[70%] sm:w-[80%] w-[90%] max-nokia:w-full flex justify-end  place-items-center relative bg-white rounded-full  border-[2px] border-teal-300  ">
                    <select name="location" className={`flex h-full rounded-full bg-transparent focus:outline-none sm:mx-1 m-0 md:text-base text-sm text-left sm:ps-2 p-0 text-slate-600`} id="" onChange={(e) => setcity(e.target.value)}>
                        <option value="" >All</option>
                        {
                            cities.map((item, index) => {
                                return <option key={index} value={item}>{item}</option>
                            })
                        }
                    </select>
                    <input type="text" className='sm:flex-1 w-[inherit]  fs-lg md:py-1 md:px-2 px-1 py-0 md:text-base text-sm rounded-full bg-white focus:outline-none text-black ' placeholder='search for disease or hospitals' onChange={(e) => setinput(e.target.value)} value={input} />
                    <button className='border-2 py-[1.5px] rounded-full text-white bg-teal-500 h-full font-bold md:text-lg text-sm px-4' onClick={() => handlesearch()} ><FaSearch color='white' size={20} /></button>
                    {
                        focused ? (
                            <div className="hospitallist absolute top-[100%] z-40 left-0 w-full">
                                {
                                    input !== "" ? <HospitalList searchinput={input} city={city} /> : null
                                }
                            </div>
                        ) : null
                    }
                </div>
            </div>

        </div>
    )
}

export default SearchBar
