import HospitalList from '@/Components/HospitalsList/HospitalList'
import React, { useEffect, useMemo, useState } from 'react'
import { hospitals } from '@/data/hospitaldata'
import { useRouter } from 'next/navigation'
function SearchBar() {
    const [input, setinput] = useState<string>("")
    const [city, setcity] = useState<string>("")
    const [cities, setcities] = useState<Array<string>>([])
    const router = useRouter()

    useEffect(() => {
        const uniqueCities = Array.from(
            new Set(hospitals.map((item) => item.city.toLowerCase()))
        );
        setcities(uniqueCities);
    }, []);

    const handlesearch = () => {
        if (input === "")
            return
        setinput("")//will set after re-rendering page, so input will be same in next line
        router.push(`/RapidHostpital/Hospitals?search=${input}`)
    }
    return (
        <div className='w-full h-fit flex justify-end place-items-center py-2 relative'   >
            <div className="searchbar w-full flex gap-3 justify-center pe-10 relative">
                <div className="search w-[70%] flex justify-end place-items-center relative bg-white rounded-full  border-[2px] border-teal-300  ">
                    <select name="location" className='h-full rounded-full focus:outline-none mx-1 text-left ps-2 text-slate-600' id="" onChange={(e) => setcity(e.target.value)}>
                        <option value="" >All</option>
                        {
                            cities.map((item, index) => {
                                return <option key={index} value={item}>{item}</option>
                            })
                        }
                    </select>
                    <input type="text" className='flex-1 fs-lg py-1 px-2 rounded-full bg-white focus:outline-none text-black ' placeholder='search for disease or hospitals' onChange={(e) => setinput(e.target.value)} value={input} />
                    <button className='border-2 py-[1.5px] rounded-full text-white bg-teal-300  font-bold text-lg px-4' onClick={() => handlesearch()} >Search</button>
                    <div className="hospitallist absolute top-[100%] z-40 left-0 w-full">
                        {
                            input !== "" ? <HospitalList searchinput={input} city={city} /> : null
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SearchBar
