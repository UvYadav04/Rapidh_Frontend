import { createSlice } from '@reduxjs/toolkit'
import { Login, LogOut, Signup } from '../actions/user'

export interface profileInterface {
    id: string,
    email: string,
    name: string
}

interface errorInterface {
    message?: string,
    status?: number
}

interface user {
    loading: boolean,
    erroruser: errorInterface,
    success: boolean,
    profile: profileInterface
}

const initialState = {
    loading: false,
    erroruser: {
        message: "",
        status: -1
    },
    success: false,
    profile: {
        id: "",
        email: "",
        name: ""
    }
}


const userslice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(Signup.pending, (state: user) => {
                // ("sign up pending")
                state.loading = true
            })
            .addCase(Signup.fulfilled, (state: user, action) => {
                // ("signup fullfilled")
                // console.log(action)
                state.loading = false
                state.profile = {
                    id: action.payload.user.user_id,
                    name: action.payload.user.name,
                    email: action.payload.user.email
                }
            })
            .addCase(Signup.rejected, (state: user, action) => {
                // ("signup rejected")
                // console.log(action)
                state.loading = false
                state.erroruser = {
                    message: action.error.message
                }
            })
            .addCase(Login.pending, (state: user) => {
                state.loading = true
                // ("login pending")
            })
            .addCase(Login.fulfilled, (state: user, action) => {
                // ("login fullfilled")
                // console.log(action)
                state.loading = false
                state.profile = {
                    id: action.payload.user.user_id,
                    name: action.payload.user.name,
                    email: action.payload.user.email
                }
            })
            .addCase(Login.rejected, (state: user, action: any) => {
                // ("login rejected")
                // console.log(action)
                state.loading = false
                state.erroruser = {
                    message: action.payload.message,
                    status: action.payload.status
                }
            })
            .addCase(LogOut.pending, (state: user) => {
                state.loading = true
            })
            .addCase(LogOut.fulfilled, (state: user) => {
                // ("logout fullfilled")
                state.loading = false
                state.profile = {
                    id: "",
                    email: "",
                    name: ""
                }
            })
            .addCase(LogOut.rejected, (state: user, action) => {
                // ("logout rejected")
                state.loading = false
                // console.log(action)
                state.erroruser = {
                    message: action.error.message,
                    // status: action.status
                }
            })
    },
    reducers: {
        resetError: (state: user) => {
            return {
                ...state, // Spread the current state
                erroruser: {
                    message: "",  // Reset the message
                    status: -1    // Reset the status
                },
                loading: false  // Set loading to false
            };
        }

    }
})

export const { resetError } = userslice.actions
export default userslice.reducer