import Image from 'next/image'
import React from 'react'
import './disease.css'
import { useRouter } from 'next/navigation'

function DiseaseCard({ image, title }: { image: any, title: string }) {
    const router = useRouter()
    const style = {
        "boxShadow": "0px 0px 10px 7px teal"
    }
    return (
        <div className='md:w-[28%] w-[26%] my-4 cursor-pointer lg:pt-5 md:pt-3 pt-1 rounded-sm md:pb-2 pb-1 md:gap-2 gap-1 flex flex-col  discard  place-content-center place-items-center bg-teal-500' style={style} onClick={() => {
            return router.push(`/RapidHostpital/Hospitals?search=${title}`)
        }} >
            <Image src={image} alt='image' className='w-1/2' color='teal' />
            <h1 className='text-white font-serif font-semibold xl:text-xl lg:text-lg md:text-md text-[10px] mt-auto'>{title}</h1>
        </div>
    )
}

export default DiseaseCard
