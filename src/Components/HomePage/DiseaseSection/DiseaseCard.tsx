import Image from 'next/image'
import React from 'react'
import './disease.css'
import { useRouter } from 'next/navigation'

function DiseaseCard({ image, title }: { image: any, title: string }) {
    const router = useRouter()
    return (
        <div className='w-[30%] cursor-pointer pt-5 rounded-sm pb-2 gap-2 flex flex-col  discard  place-content-center place-items-center bg-teal-500' onClick={() => {
            return router.push(`/RapidHostpital/Hospitals?search=${title}`)
        }} >
            <Image src={image} alt='image' className='w-1/2' color='teal' />
            <h1 className='text-white font-serif font-semibold text-xl mt-auto'>{title}</h1>
        </div>
    )
}

export default DiseaseCard
