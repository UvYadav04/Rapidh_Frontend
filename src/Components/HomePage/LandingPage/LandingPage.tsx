import React, { useEffect, useState } from 'react'

import HospitalList from '@/Components/HospitalsList/HospitalList';
import './landingpage.css'
import { redirect, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../lib/Store';
import { getHospitalList } from '../../../../lib/redux/actions/hospitals';
import LoginLoader from '@/Components/Authentication/LoginLoader';
import { hospitalInterface } from '@/Components/HospitalSeachPage/HospitalAbout';
import { resetHospitalError } from '../../../../lib/redux/slices/Hospitals';
import { FaSearch } from "react-icons/fa";

function LandingPage() {
    const [input, setinput] = useState<string>("")
    const router = useRouter()
    const [focused, setfocused] = useState<boolean>(false)
    const [blurr, setblurr] = useState<boolean>(false)

    const { hospitals, Hospitalloading, Hospitalerror } = useSelector((state: RootState) => state.hospitals)
    const dispatch = useDispatch<AppDispatch>()

    // useEffect(() => {
    //     if (Hospitalerror) {
    //         console.log(Hospitalerror)
    //         dispatch(resetHospitalError())
    //         redirect('/ErrorOccured?message=Hospital Error on Landing Page')
    //     }
    //     else if (!hospitals || hospitals.length === 0)
    //         dispatch(getHospitalList())
    // }, [hospitals, Hospitalerror, Hospitalloading])

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
    if (Hospitalloading)
        return <LoginLoader />
    return (
        <div className='w-full landingpage mt-5  mx-auto flex  flex-col place-content-center place-items-center xl:pt-12 lg:pt-10 gap-2 min-h-fit xl:h-[550px]
        lg:h-[500px] md:h-[450px] sm:h-[400px] h-[350px] relative' >
            <div className="search flex flex-col full relative xl:w-7/12 lg:w-8/12 md:w-9/12 sm:w-10/12 w-11/12" >
                <div className="inputrow flex-1 rounded-full bg-white flex relative" onFocus={() => handlefocus()} onBlur={() => handleblurr()}>
                    <input type="text" value={input} onChange={(e) => setinput(e.target.value)} className='flex-1 focus:outline-none bg-white rounded-full ps-5 pe-1   xl:py-2 md:py-1 py-0 text-slate-600' placeholder='search hospital or disease' />
                    <button className='w-fit text-center p-1 bg-teal-500 text-white rounded-full  text-md  sm:px-4 px-4 my-1 mx-1 rounded-e-full' onClick={() => {
                        if (input === "")
                            return
                        router.push(`/Hospitals?search=${input}`)
                    }}><FaSearch color='white' size={20} /></button>
                </div>
                <div className="hospitallist absolute top-[100%] z-40 left-0 w-full">
                    {
                        input !== "" && focused ? <HospitalList searchinput={input} city="" /> : null
                    }
                </div>
            </div >
            <div className="suggestions flex flex-wrap justify-center lg:gap-4 gap-2 xl:mt-3 lg:mt-2 sm:mt-1 mt-0 xl:w-7/12 lg:w-8/12 md:w-9/12 sm:w-10/12 w-11/12">
                {
                    hospitals?.slice(0, 5).map((item: hospitalInterface, index: number) => {
                        return <button className='bg-teal-500 xl:px-2 lg:px-1 px-2 lg:text-md md:text-[14px] sm:text-base text-[12px] lg:py-1 py-1 rounded-md' onClick={() => setinput(item.operations[0].name)} key={index}>{item.operations[0].name}</button>
                    })
                }
            </div>
            {/* <div className="lines w-3/5 text-start mt-4">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos iusto tempore quod</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos iusto tempore quod</p>
            </div> */}
            <div className='flex gap-3   mt-5 '>
                {/* <button className='px-8 py-1 w-32 bg-teal-400 rounded-full text-white border-white border-[2px] font-bold'>Explore</button>
                <button className='px-8 py-1 text-teal-400 bg-white border-teal-400 border-[2px] font-bold rounded-full w-32'>Consult</button> */}
            </div>
        </div >
    )
}

export default LandingPage
