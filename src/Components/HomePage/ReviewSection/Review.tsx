'use client'

import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../lib/Store'
import ReviewCard from './ReviewCard'

import { Card, CardContent } from "../../ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../ui/carousel"
import Autoplay from "embla-carousel-autoplay"

function Review() {

    const { loading, success, error, reviews } = useSelector((state: RootState) => state.reviews)
    // console.log(reviews)
    return (
        <div className='text-black mt-24 w-[100%] b mx-auto mb-20 '>
            <div className="max-w-full w-full  overflow-x-scroll flex gap-10" style={{ scrollbarWidth: "none", scrollBehavior: "smooth" }}>
                <Carousel
                    plugins={[
                        Autoplay({
                            delay: 2000,
                        }),
                    ]}
                    opts={{
                        align: "start",
                        loop: true
                    }}
                    className="w-[90%] mx-auto bg-slate-200"
                >
                    <CarouselContent >
                        {reviews.map((item, index) => (
                            <CarouselItem key={index} className="w-fit  lg:basis-1/3 sm:basis-1/2 place-items-center ">
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-0 w-fit bg-transparent ">
                                            <ReviewCard item={item} />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    )

}

export default Review
