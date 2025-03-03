import React, { Dispatch, SetStateAction } from 'react'
import '../Css/components.css'
import { OperationList } from './HospitalAbout'
import { OperationInterface } from './HospitalAbout'
function OperationCard({ operation, item, setoperation, key }: { operation: OperationInterface, item: OperationList, setoperation: Dispatch<SetStateAction<OperationInterface>>, key: number }) {
    return (
        <div className="operationCard relative h-fit" key={key}>
            <div className={`w-40 ${operation.operationdata?.name == item.name ? "bg-teal-800" : "bg-teal-400"} px-1 py-1 text-lg break-keep operationNameCard rounded-md text-center text-white max-h-12 overflow-y-scroll place-content-center`} style={{ scrollbarWidth: "none" }}>
                {item.name.slice(0, 12)}...
            </div>
            <button className='bg-white z-20 text-teal-400 h-fit text-lg px-1 py-1 absolute left-0 min-w-full top-0 overflow-visible pop ' onClick={() =>
                setoperation((prev) => {
                    return { ...prev, operationdata: item }
                })
            } >{item.name}</button>
        </div>
    )
}

export default OperationCard
