import { createAsyncThunk } from "@reduxjs/toolkit";

export const getMyBookings = createAsyncThunk(
    'bookings/getmybookings',
    async (userid: { userid: string }, { rejectWithValue }) => {
        try {
            console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getmybookings/${userid}`, {
                method: "GET"
            })

            if (!response.ok)
                return rejectWithValue("unable to fetch request")

            const data = await response.json()
            // console.log(data)
            if (!data.success)
                return rejectWithValue("Error occured server side")

            return data.data
        } catch (error) {
            console.log(error)
            return rejectWithValue("Error in fetching my bookings from server")
        }
    }
)