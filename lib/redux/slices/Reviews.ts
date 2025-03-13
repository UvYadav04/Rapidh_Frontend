import { createSlice } from "@reduxjs/toolkit";
import { getReviews } from "../actions/reviews";
import reviewsdata from '../../../src/data/reviews'
import reviews from "../../../src/data/reviews";
import { resetError } from "./User";
const data = [...reviewsdata]
// console.log(typeof (data))
//

export interface reviewInterface {
    id: string,
    review: string,
    ratings: number,
    user_id: string,
    created: string,
    user_name: string
}
interface reviews {
    loading: boolean,
    error: string | null,
    checked: boolean,
    reviews: Array<reviewInterface> | null
}

const initialState = {
    loading: false,
    checked: false,
    error: null,
    reviews: []
}


const reviewSlice = createSlice({
    name: "reviews",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getReviews.pending, (state: reviews) => {
                // alert("reviews pending")
                state.loading = true
            })
            .addCase(getReviews.fulfilled, (state: reviews, action) => {
                // alert("reviews fulfilled")
                // console.log(action)
                state.loading = false
                state.checked = true
                state.reviews = action.payload.reviews
            })
            .addCase(getReviews.rejected, (state: reviews, action: any) => {
                // alert("reviews rejected")
                state.loading = false
                state.error = action.payload.message
            })
    },
    reducers: {
        resetReviewError: (state) => {
            state.error = null;
        }
    }
})

export const { resetReviewError } = reviewSlice.actions
export default reviewSlice.reducer