import { createSlice } from "@reduxjs/toolkit"
import { fetchrole } from "../actions/Role"

interface role {
    loading: boolean,
    error: string | null,
    role: string | null
}

const initialState = {
    loading: false,
    error: null,
    role: null
}

const RoleSlice = createSlice({
    name: 'role',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchrole.pending, (state: role) => {
                state.loading = true
            })
            .addCase(fetchrole.fulfilled, (state: role, action) => {
                // alert("role fullfilled")
                console.log(action)
                state.loading = false
                state.role = action.payload.message
            })
            .addCase(fetchrole.rejected, (state: role, action: any) => {
                // alert("role rejected")
                state.loading = false
                state.error = action.payload.message
                console.log(action)
                // state.error = action.payload
            })
    },
    reducers: {
        resetRole: (state: role) => {
            state.role = null
            state.error = null
        },
        resetRoleError: (state: role) => {
            state.error = null
        }
    }
})

export const { resetRole, resetRoleError } = RoleSlice.actions
export default RoleSlice.reducer