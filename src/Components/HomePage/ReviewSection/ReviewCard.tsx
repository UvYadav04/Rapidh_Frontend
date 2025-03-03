import Image from 'next/image'
import React from 'react'
import dummyUser from './dummyUser.jpeg'
import StarRatings from 'react-star-ratings'
import { reviewInterface } from '@/data/reviews'
function ReviewCard({ item }: { item: reviewInterface }) {
    return (
        <div className='min-w-64 max-w-64 rounded-md h-fit flex flex-col place-items-center place-content-start bg-slate-300 pb-3' >
            <Image src={item.image ? item.image : dummyUser} className='w-24 h-24 rounded-full  -top-8' alt='user' />
            <h1 className='-top-7 text-lg'>{item.name}</h1>
            <p className=' -top-7 break-all px-2 text-sm text-slate-500'>{item.message.slice(0, 100)}...</p>
            <div className='flex my-2'>
                <StarRatings
                    rating={item.rating}
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
