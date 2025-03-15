'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../lib/Store'
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
import LoginLoader from '@/Components/Authentication/LoginLoader'
import { getReviews } from '../../../../lib/redux/actions/reviews'

import { Button } from "@/Components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import StarRatings from 'react-star-ratings'

interface reviewInput {
    rating: number,
    review: string
}

function Review() {

    const { loading, checked, error, reviews } = useSelector((state: RootState) => state.reviews)
    const dispatch = useDispatch<AppDispatch>()
    const [review, setreview] = useState<reviewInput>({ review: "", rating: 3 })
    const [isloading, setloading] = useState<boolean>(false)
    const { profile } = useSelector((store: RootState) => store.user)
    const [errorr, seterror] = useState<number>(-1)

    useEffect(() => {
        if (!loading && !error && !checked)
            dispatch(getReviews())

    }, [loading, error, reviews])

    const addreview = async () => {
        try {
            if (review.review.length < 10)
                return seterror(1)
            if (profile.id === "")
                return seterror(2)
            setreview({ review: "", rating: 3 })
            setloading(true)
            const response = await fetch("http://localhost:83/api/createReview", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ review })
            })
            setloading(false)

            if (!response.ok)
                return alert("something went wrong")

            const data = await response.json()
            if (data.status === "error") {
                console.log(data)
                return alert("something went wrong")
            }

            // alert("review created")
            dispatch(getReviews())
            // console.log(data)

        } catch (error) {
            alert("failed to add review please try again later")
        }
    }

    useEffect(() => {
        console.log(profile)
        if (profile.id === "")
            seterror(2)
    }, [profile])

    if (loading)
        return <LoginLoader />

    if (error)
        return null
    return (
        <div className='text-black mt-24 w-[100%] b mx-auto mb-20 '>
            <div className="max-w-full w-full  overflow-x-scroll flex flex-col place-items-center place-content-center gap-3 " style={{ scrollbarWidth: "none", scrollBehavior: "smooth" }}>

                {
                    reviews?.length > 0 ? <Carousel
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
                        : <div className='w-[90%] bg-slate-200 mx-auto h-44 flex place-content-center place-items-center'><h1 className='bg-slate-500 text-white px-6 py-2 text-lg  '>No reviews yet</h1></div>
                }


                <div className="w-fit h-fit flex">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className='bg-teal-400 px-6 py-1 text-lg' variant="outline">{reviews.length > 0 ? "Add review" : "Add first review    "}</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">

                            <DialogHeader>
                                <DialogDescription>
                                    {errorr === 2 ? <p className='text-red-400'>Please login to add a review</p> : null}
                                    {errorr === 1 ? <p className='text-red-400'>Review must be atleast 10 characters long.</p> : null}                                </DialogDescription>
                            </DialogHeader>
                            <DialogTitle>Add a review</DialogTitle>
                            <div className="flex flex-col gap-4 py-0">
                                <div className="flex items-center gap-0 bg-red-500">
                                    {/* <Label htmlFor="review" className="text-right">
                                        Review
                                    </Label> */}
                                    <textarea rows={4} id="review" value={review.review} onChange={(e) => setreview((prev) => {
                                        return { ...prev, review: e.target.value }
                                    })} className=" w-full" placeholder='Enter a review' style={{ resize: 'none' }} />
                                </div>
                                <div className="flex  justify-center items-center gap-4">

                                    <StarRatings
                                        rating={review.rating}
                                        starRatedColor="teal"
                                        starEmptyColor="rgb(110 116 139)"
                                        name='rating'
                                        // size={10}
                                        starDimension="30px"
                                        // isSelectable={true}
                                        changeRating={(rating) => setreview((prev) => {
                                            return { ...prev, rating: rating }
                                        })}
                                    />
                                </div>


                            </div>
                            <DialogFooter>
                                <Button onClick={() => addreview()} disabled={profile.id === ""}>Add review</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div >
    )

}

export default Review



