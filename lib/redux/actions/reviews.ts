import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { fetchWithTimeout } from "./hospitals";

export const getReviews = createAsyncThunk(
    'reviews/getreviews',
    async (_, { dispatch, rejectWithValue }) => {

        try {
            const response = await fetchWithTimeout(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/client/fetch/allReviews`, {
                method: "GET"
            })

            if (!response.ok)
                rejectWithValue("failed to fetch reviews")

            const data = await response.json()
            console.log(data)

            if (data.status === "error")
                return rejectWithValue("failed to fetch review from server")

            return data;
        }
        catch (error) {
            return rejectWithValue("something went wrong")
        }
    }
)


// export const newreview = createAsyncThunk(
//     'reviews/newreview',
//     async ({ userId, review }: { userId: any, review: string }, { dispatch, rejectWithValue }: { dispatch: any, rejectWithValue: any }) => {
//         try {
//             const response = await fetchWithTimeout(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/client/createReview`, {
//                 method: "POST",
//                 headers: {
//                     'Content-type': 'application/json'
//                 },
//                 body: JSON.stringify({ user: userId, review: review })
//             })

//             if (!response.ok)
//                 rejectWithValue("failed to fetch reviews")

//             const data = await response.json()

//             if (data.status === "error")
//                 rejectWithValue("failed to fetch review from server")

//             return data;

//         }
//         catch (error) {
//             return rejectWithValue("something went wrong")
//         }
//     }
// )