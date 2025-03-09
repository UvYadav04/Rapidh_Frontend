import Image from 'next/image'
import React from 'react'
import dummyUser from './dummyUser.jpeg'
import StarRatings from 'react-star-ratings'
import { reviewInterface } from '@/data/reviews'
function ReviewCard({ item }: { item: reviewInterface }) {
    return (
        <div className='w-64 h-56 rounded-md lg:h-fit flex flex-col place-items-center place-content-start bg-slate-300 lg:py-2 md:py-1 p-2  overflow-x-hidden ' >
            <Image src={item.image ? item.image : dummyUser} className='lg:w-24 sm:w-20 w-20 lg:h-24 sm:h-20 h-20 rounded-full  -top-8' alt='user' />
            <h1 className='-top-7 lg:text-lg sm:text-md text-lg'>{item.name}</h1>
            <p className=' -top-7 break-all lg:px-2 md:px-1 text-sm text-slate-500  overflow-y-scroll' style={{ scrollbarWidth: "none" }}>{item.review.slice(0, 95)}...</p>
            <div className='flex lg:my-2 md:my-1 my-0'>
                <StarRatings
                    rating={item.ratings}
                    starRatedColor="yellow"
                    starEmptyColor="rgb(110 116 139)"
                    name='rating'
                    // size={10}
                    starDimension="20px"
                />
            </div>
        </div>
    )
}

export default ReviewCard
