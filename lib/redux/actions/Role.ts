import { createAsyncThunk } from "@reduxjs/toolkit";
export const fetchrole = createAsyncThunk(
    'role/getrole',
    async (_, { rejectWithValue }: { rejectWithValue: any }) => {

        try {
            // console.log("in the fetching")
            const response = await fetch('http://localhost:3000/server/getrole', {
                method: "GET"
            })
            // console.log(response)

            if (!response.ok)
                return rejectWithValue({ message: "error in fetching role" })

            const data = await response.json()
            // console.log(data)

            if (!data.success)
                return rejectWithValue({ message: "role not found" })
            // console.log(data)
            return data
        }
        catch (error: any) {
            console.log(error)
            return rejectWithValue({ message: error.message })
        }

    }
)