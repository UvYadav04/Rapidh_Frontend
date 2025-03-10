import { createAsyncThunk } from "@reduxjs/toolkit";

export const getMyBookings = createAsyncThunk(
    'bookings/getmybookings',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:83/api/patient/my-bookings`, {
                method: "GET",
                credentials: 'include'
            })

            if (!response.ok)
                return rejectWithValue("unable to fetch request")

            const data = await response.json()
            console.log(data)
            if (data.status === "error")
                return rejectWithValue("Error occured server side")
            return data
        } catch (error) {
            console.log(error)
            return rejectWithValue("Error in fetching my bookings from server")
        }
    }
)