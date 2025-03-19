import { createSlice } from "@reduxjs/toolkit";
import { getHospitalList } from "../actions/hospitals";
import { hospitalInterface } from "@/Components/HospitalSeachPage/HospitalAbout";
interface hospitals {
    Hospitalloading: boolean,
    Hospitalerror: object | null,
    success: boolean,
    hospitals: Array<hospitalInterface>
}

const initialState = {
    Hospitalloading: false,
    Hospitalerror: null,
    success: false,
    hospitals: []
}


const hospitalSlice = createSlice({
    name: 'hospitals',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getHospitalList.pending, (state: hospitals) => {
                // ("pending")
                state.Hospitalloading = true
            })
            .addCase(getHospitalList.fulfilled, (state: hospitals, action) => {
                alert("fullfilled")
                state.Hospitalloading = false
                console.log(action)
                state.hospitals = action.payload.hospitals
            })
            .addCase(getHospitalList.rejected, (state: hospitals, action) => {
                state.Hospitalloading = false
                // console.log(action)
                state.Hospitalerror = action
            })

    },
    reducers: {
        resetHospitalError: (state) => {
            return {
                ...state,
                Hospitalerror: null
            }
        }
    }
})

export const { resetHospitalError } = hospitalSlice.actions
export default hospitalSlice.reducer