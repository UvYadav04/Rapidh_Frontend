import { createSlice } from "@reduxjs/toolkit";
import { getReviews } from "../actions/reviews";


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
                // ("reviews pending")
                state.loading = true
            })
            .addCase(getReviews.fulfilled, (state: reviews, action) => {
                // console.log(action)
                state.loading = false
                state.checked = true
                state.reviews = action.payload.reviews
            })
            .addCase(getReviews.rejected, (state: reviews, action: any) => {
                // `("reviews rejected")
                // console.log(action)
                state.loading = false
                state.error = action.payload
            })
    },
    reducers: {
        resetReviewError: (state) => {
            return {
                ...state,  // Copy the existing state
                error: null,// Reset error to null
                checked: false
            };
        }

    }
})

export const { resetReviewError } = reviewSlice.actions
export default reviewSlice.reducer