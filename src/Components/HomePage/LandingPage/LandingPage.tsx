import React, { useState } from 'react'

import HospitalList from '@/Components/HospitalsList/HospitalList';
import './landingpage.css'
import { hospitals } from '@/data/hospitaldata';
import { useRouter } from 'next/navigation';

function LandingPage() {
    const [input, setinput] = useState<string>("")
    const router = useRouter()

    return (
        <div className='w-full landingpage mt-5  mx-auto flex  flex-col  place-content-center place-items-center pt-12 gap-2 min-h-fit h-[550px] relative' >
            <div className="search flex flex-col full relative w-3/5" >
                <div className="inputrow flex-1 rounded-full bg-white flex relative">
                    <input type="text" value={input} onChange={(e) => setinput(e.target.value)} className='flex-1 focus:outline-none bg-white rounded-full ps-5 pe-1   py-2 text-slate-600' placeholder='search hospital or disease' />
                    <button className='w-fit text-center p-0 bg-teal-500 text-white rounded-full  text-md px-8 my-1 mx-1 rounded-e-full' onClick={() => {
                        if (input === "")
                            return
                        router.push(`/RapidHostpital/Hospitals?search=${input}`)
                    }}>Search</button>
                </div>
                <div className="hospitallist absolute top-[100%] z-40 left-0 w-full">
                    {
                        input !== "" ? <HospitalList searchinput={input} city="" /> : null
                    }
                </div>
            </div >
            <div className="suggestions flex flex-wrap gap-4 mt-3">
                {
                    hospitals.slice(0, 5).map((item, index) => {
                        return <button className='bg-teal-500 px-2 text-md py-1 rounded-md' onClick={() => setinput(item.operations[0].name)} key={index}>{item.operations[0].name}</button>
                    })
                }
            </div>
            {/* <div className="lines w-3/5 text-start mt-4">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos iusto tempore quod</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos iusto tempore quod</p>
            </div> */}
            <div className='flex gap-3   mt-5 '>
                <button className='px-8 py-1 w-32 bg-teal-400 rounded-full text-white border-white border-[2px] font-bold'>Explore</button>
                <button className='px-8 py-1 text-teal-400 bg-white border-teal-400 border-[2px] font-bold rounded-full w-32'>Consult</button>
            </div>
        </div >
    )
}

export default LandingPage
