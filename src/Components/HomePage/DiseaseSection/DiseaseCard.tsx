import Image from 'next/image'
import React from 'react'
import './disease.css'
import { useRouter } from 'next/navigation'

function DiseaseCard({ image, title }: { image: any, title: string }) {
    const router = useRouter()
    const style = {
        "boxShadow": "5px 5px 7px 7px teal"
    }
    return (
        <div className='cursor-pointer lg:pt-5 md:pt-3 pt-1 rounded-sm md:pb-2 pb-1 md:gap-2 gap-1 flex flex-col  discard  place-content-center place-items-center bg-teal-500 flex-1' style={style} onClick={() => {
            return router.push(`/Hospitals?search=${title}`)
        }} >
            <Image src={image} alt='image' className='w-1/2' color='teal' />
            <h1 className='text-white font-serif font-semibold xl:text-xl lg:text-lg md:text-md text-[10px] mt-auto'>{title}</h1>
        </div>
    )
}

export default DiseaseCard
// className = 'md:w-[23%] w-[20%] my-4 cursor-pointer lg:pt-5 md:pt-3 pt-1 rounded-sm md:pb-2 pb-1 md:gap-2 gap-1 flex flex-col  discard  place-content-center place-items-center bg-teal-500'