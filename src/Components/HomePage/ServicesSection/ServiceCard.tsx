import React from 'react'
import { GiTakeMyMoney } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { LiaHospitalSolid } from "react-icons/lia";
function ServiceCard({ text, icon }: { text: String, icon: Number }) {
    const iconclass = "lg:w-20 lg:h-20 md:w-16 md:h-16 sm:w-12 sm:h-12 w-20 h-20"
    return (
        <div className='lg:w-[25%] sm:w-[30%] xl:h-64 lg:h-60 md:h-52 review:h-48 sm:h-40 h-64 nokia:w-[60%]  w-[80%] sm:mb-0  flex flex-col sm:justify-start justify-center lg:pt-12 md:pt-10 review:pt-7 pt-4 xl:px-10 lg:px-6 md:px-3 sm:px-1 px-5 place-items-center bg-teal-400 text-white'>
            {
                icon === 1 ? (
                    // Render component or element for icon === 1
                    <LiaHospitalSolid className={iconclass} color='white' />
                ) : icon === 2 ? (
                    // Render component or element for icon === 2
                    <FaUserDoctor className={iconclass} color='white' />
                ) : (
                    // Render fallback or default component
                    <GiTakeMyMoney className={iconclass} color='white' />
                )
            }

            <p className='break-all text-center  lg:text-base md:text-md review:text-[13px] sm:text-[12px]'>{text}</p>
        </div>
    )
}

export default ServiceCard
