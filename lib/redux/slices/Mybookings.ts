import { createSlice } from "@reduxjs/toolkit";
import { getMyBookings } from "../actions/bookings";
interface admit {
    PatientName: string,
    Date: Date,
    Reciept: string
}

interface operation {
    PatientName: string,
    operation: string,
    Date: Date,
    Reciept: string
}

interface bookings {
    loading: boolean
    bookingerror: object | null
    bookings: {
        Operations: operation[],
        Admits: admit[]
    } | null
}

const initialState: bookings = {
    bookings: null,
    loading: false,
    bookingerror: null
}

const bookingSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMyBookings.pending, (state: bookings) => {
                state.loading = true;
            })
            .addCase(getMyBookings.fulfilled, (state: bookings, action) => {
                state.loading = false
                // console.log(action.payload)
                state.bookings = action.payload
                state.bookingerror = null
            })
            .addCase(getMyBookings.rejected, (state: bookings, action) => {
                state.loading = false
                state.bookingerror = {
                    error: action.payload
                }
                state.bookings = null
            })

    }
})


export default bookingSlice.reducer