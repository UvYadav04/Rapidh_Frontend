import { createAsyncThunk, GetThunkAPI } from "@reduxjs/toolkit";

export const getHospitalList = createAsyncThunk(
    'hospitals/gethospitals',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:83/api/fetch/hospitals`, {
                method: "GET"
            })
            if (!response.ok)
                return rejectWithValue("Error in fetching hospitals")

            const data = await response.json()
            console.log(data)
            if (data.status !== "success")
                throw new Error("failed to fetch from server")
            return data
        }
        catch (error: any) {
            console.log(error)
            return rejectWithValue(error.message)
        }
    }
)