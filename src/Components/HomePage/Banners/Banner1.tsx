import Image from 'next/image'
import React from 'react'
import doctors from '../../../Images/doctors.png'
import whywe from '../Images/whywe.png'
function Banner1() {
    return (
        <div className='w-[90%] flex h-fit  mt-20'>
            <div className="left w-[50%] text-slate-600 px-20 pt-28 pb-20 ">
                <h1 className='text-4xl'>Why <span className='text-teal-400 text-6xl'>KareHive?</span></h1>
                <p className='mt-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis quaerat facilis quos velit? Atque, sed harum vero placeat quos culpa. Provident reiciendis quidem delectus quas explicabo? Atque ex delectus recusandae! Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quaerat magnam unde cumque obcaecati
                </p>
            </div>
            <div className="right flex-1 relative flex place-content-center place-items-center">
                {/* <svg width={"100%"} className='z-10 w-full' height={"100%"}>
                    <path d={`M 0 400 H 680 V 250 Q 500,150 250,330 Q 170,380 0,400`}
                        stroke="rgb(45,212,191)"
                        fill="rgb(45,212,191)"
                        strokeWidth="3" />
                </svg> */}
                {/* <Image src={whywe} className='w-full' alt='image' /> */}
                <Image src={doctors} alt='doctors' className='z-20 w-10/12' />
                {/* <div className="z-10 opacity-70 vertical h-full w-16 bg-teal-400 absolute"></div>
                <div className="z-10 opacity-70 horizontal w-full h-16 bg-teal-400 absolute"></div> */}
            </div>
        </div>
    )
}

export default Banner1
