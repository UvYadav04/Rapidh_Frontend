import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";

export const getReviews = createAsyncThunk(
    'reviews/getreviews',
    async (_, { dispatch, rejectWithValue }) => {

        try {
            const response = await fetch(`http://localhost:83/api/fetch/allReviews`, {
                method: "GET"
            })

            if (!response.ok)
                rejectWithValue("failed to fetch reviews")

            const data = await response.json()

            if (data.status === "error")
                rejectWithValue("failed to fetch review from server")

            return data;
        }
        catch (error) {
            return rejectWithValue("something went wrong")
        }
    }
)


export const newreview = createAsyncThunk(
    'reviews/newreview',
    async ({ userId, review }: { userId: any, review: string }, { dispatch, rejectWithValue }: { dispatch: any, rejectWithValue: any }) => {
        try {
            const response = await fetch(`http://localhost:83/api/createReview`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ user: userId, review: review })
            })

            if (!response.ok)
                rejectWithValue("failed to fetch reviews")

            const data = await response.json()

            if (data.status === "error")
                rejectWithValue("failed to fetch review from server")

            return data;

        }
        catch (error) {
            return rejectWithValue("something went wrong")
        }
    }
)