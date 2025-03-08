import React, { Dispatch, SetStateAction } from 'react'
import '../Css/components.css'
import { OperationList } from './HospitalAbout'
import { OperationInterface } from './HospitalAbout'
function OperationCard({ operation, item, setoperation, key }: { operation: OperationInterface, item: OperationList, setoperation: Dispatch<SetStateAction<OperationInterface>>, key: number }) {
    return (
        <div className="operationCard relative h-fit" key={key}>
            <div className={`xl:w-40 lg:w-36  w-32 ${operation.operationdata?.name == item.name ? "bg-teal-800" : "bg-teal-400"} md:px-1 px-0 md:py-1 py-0 lg:text-lg md:text-base text-md break-keep operationNameCard rounded-md text-center text-white max-h-12 overflow-y-scroll place-content-center`} style={{ scrollbarWidth: "none" }}>
                {item.name.slice(0, 12)}...
            </div>
            <button className='bg-white z-20 text-teal-400 h-fit lg:text-lg md:text-base text-md md:px-1 px-0 md:py-1 py-0 absolute left-0 min-w-full top-0 overflow-visible pop ' onClick={() =>
                setoperation((prev) => {
                    return { ...prev, operationdata: item }
                })
            } >{item.name}</button>
        </div>
    )
}

export default OperationCard
