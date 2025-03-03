import { createSlice } from "@reduxjs/toolkit";
import { getReviews } from "../actions/reviews";
import reviewsdata from '../../../src/data/reviews'
const data = [...reviewsdata]
// console.log(typeof (data))
// 
interface reviews {
    loading: boolean,
    error: string | null,
    success: boolean,
    reviews: Array<any> | null
}

const initialState = {
    loading: false,
    success: false,
    error: null,
    reviews: data
}


const reviewSlice = createSlice({
    name: "reviews",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getReviews.pending, (state: reviews) => {
                alert("reviews pending")
            })
            .addCase(getReviews.fulfilled, (state: reviews) => {
                alert("reviews fulfilled")
            })
            .addCase(getReviews.rejected, (state: reviews) => {
                alert("reviews rejected")
            })
    },
    reducers: {}
})


export default reviewSlice.reducer