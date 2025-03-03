import { createSlice } from "@reduxjs/toolkit";
import { getHospitalList } from "../actions/hospitals";
interface hospitals {
    loading: boolean,
    error: string | null,
    success: boolean,
    hospitals: Array<object> | null
}

const initialState = {
    loading: false,
    error: null,
    success: false,
    hospitals: null
}


const hospitalSlice = createSlice({
    name: 'hospitals',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getHospitalList.pending, (state: hospitals) => {
                // alert("pending")
            })
            .addCase(getHospitalList.fulfilled, (state: hospitals) => {
                // alert("fullfilled")
            })
            .addCase(getHospitalList.rejected, (state: hospitals) => {
                // alert("rejected")
            })

    },
    reducers: {

    }
})

export default hospitalSlice.reducer