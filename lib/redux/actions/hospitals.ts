import { createAsyncThunk, GetThunkAPI } from "@reduxjs/toolkit";

export const getHospitalList = createAsyncThunk(
    'hospitals/gethospitals',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/hospitals`, {
                method: "GET"
            })
            const data = await response.json()
            if (!data.success)
                throw new Error("failed to fetch from server")
            if (data.success)
                return data

            throw new Error("failed to fetch")
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)