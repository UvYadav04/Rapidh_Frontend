import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMyBookings } from "../actions/bookings";

// Define structure for each booking (e.g., add more fields as necessary)

export interface Booking {
    AdmissionID: string;
    UserID: string;
    Name: string;
    Age: number;
    Allergy: string | null;
    OperationRequired: number | null;
    Requirements: string;
    AdmissionDate: string;  // Use Date if you plan to manipulate date values
    Diabetes: number | null;
    TotalPrice: string;  // You can use number if you plan to calculate with it
    TreatmentBefore: number | null;
    ReasonToAdmit: string | null;
    OnlyAdmit: string | null;
    DaysToAdmit: number | null;
    HospitalName: string;
    WardName: string;
    ChargePerDay: number;
    OperationName: string | null;
    OperationCharge: number | null;
}

// Type for state structure
interface BookingsState {
    loading: boolean;
    bookingerror: object | null;
    bookings: Booking[] | null;
}

const initialState: BookingsState = {
    bookings: null,
    loading: false,
    bookingerror: null,
};

const bookingSlice = createSlice({
    name: "bookings",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getMyBookings.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMyBookings.fulfilled, (state, action) => {
                alert("fulfilled")
                state.loading = false;
                console.log(action);
                state.bookings = action.payload.bookings; // Safe to access bookings now
                state.bookingerror = null;
            })
            .addCase(getMyBookings.rejected, (state, action) => {
                state.loading = false;
                // Safe access to action.payload.error if it's undefined
                state.bookingerror = {
                    error: action.payload || "An error occurred",
                };
                state.bookings = null;
            });
    },
    reducers: {
        resetBookingError: (state) => {
            state.bookingerror = null
        }
    }
});
export const { resetBookingError } = bookingSlice.actions
export default bookingSlice.reducer;
