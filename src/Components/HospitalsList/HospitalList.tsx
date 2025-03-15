import React, { useEffect } from 'react'
// import { hospitals } from '@/data/hospitaldata'
import { hospitalInterface } from '../HospitalSeachPage/HospitalAbout'
import { redirect, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../lib/Store'
import { getHospitalList } from '../../../lib/redux/actions/hospitals'
import { resetHospitalError } from '../../../lib/redux/slices/Hospitals'
function HospitalList({ searchinput, city }: { searchinput: string, city: string }) {

    const { hospitals, Hospitalloading, Hospitalerror } = useSelector((state: RootState) => state.hospitals)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (Hospitalerror) {
            dispatch(resetHospitalError())
            redirect('/ErrorOccured')
        }
        else if (hospitals.length === 0)
            dispatch(getHospitalList())
    }, [hospitals])
    return (
        <div className='w-full flex flex-col bg-slate-200 rounded-md max-h-[200px] overflow-y-scroll' style={{ scrollbarWidth: "none" }}>
            {
                hospitals.map((item: hospitalInterface, index) => {
                    if (city !== "" && item.city !== city) return null // Filter city first

                    const nameMatch = item.name.toLowerCase().includes(searchinput.toLowerCase())
                    const operationMatch = item.operations.find(op => op.name.toLowerCase().includes(searchinput.toLowerCase()))

                    return nameMatch ? (
                        <HospitalListCard data={item} key={`hospital-${item.name}`} operation="" />
                    ) : operationMatch ? (
                        <HospitalListCard data={item} key={`hospital-${item.name}-operation-${operationMatch.name}`} operation={operationMatch.name} />
                    ) : null
                })
            }
        </div>
    )
}

function HospitalListCard({ data, operation }: { data: hospitalInterface, operation: string }) {
    const router = useRouter()

    return (
        <div className='listcard flex flex-col bg-white px-2 py-1 m-2 rounded-md'>
            <h1 className='text-lg text-teal-500 m-0 cursor-pointer' onClick={() => {
                return router.push(`/Hospitals?search=${data.name}`)
            }}>
                {data.name}
            </h1>
            {operation && <h6 className='text-sm text-slate-500'>Operation: {operation}</h6>}
        </div>
    )
}

export default HospitalList
