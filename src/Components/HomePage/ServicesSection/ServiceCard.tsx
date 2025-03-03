import React from 'react'
import { GiTakeMyMoney } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { LiaHospitalSolid } from "react-icons/lia";
function ServiceCard({ text, icon }: { text: String, icon: Number }) {
    return (
        <div className='w-[25%] h-64 flex flex-col justify-center px-10 place-items-center bg-teal-400 text-white'>
            {
                icon === 1 ? (
                    // Render component or element for icon === 1
                    <LiaHospitalSolid size={80} color='white' />
                ) : icon === 2 ? (
                    // Render component or element for icon === 2
                    <FaUserDoctor size={80} color='white' />
                ) : (
                    // Render fallback or default component
                    <GiTakeMyMoney size={80} color='white' />
                )
            }

            <p className='break-all text-center'>{text}</p>
        </div>
    )
}

export default ServiceCard
