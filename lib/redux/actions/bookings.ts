import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWithTimeout } from "./hospitals";

export const getMyBookings = createAsyncThunk(
    'bookings/getmybookings',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchWithTimeout(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/patient/my-bookings`, {
                method: "GET",
                credentials: 'include'
            })

            if (!response.ok)
                return rejectWithValue("unable to fetch request")

            const data = await response.json()
            // console.log(data)
            if (data.status === "error")
                return rejectWithValue("Error occured server side")
            return data
        } catch (error) {
            // console.log(error)
            return rejectWithValue("Error in fetching my bookings from server")
        }
    }
)