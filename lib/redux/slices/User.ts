import { createSlice } from '@reduxjs/toolkit'
import { Login, LogOut, Signup } from '../actions/user'
import { resetRole } from './Role'

export interface profileInterface {
    id: string,
    email: string
}

interface errorInterface {
    message?: string,
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
        message: ""
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
                // alert("sign up pending")
                state.loading = true
            })
            .addCase(Signup.fulfilled, (state: user, action) => {
                // alert("signup fullfilled")
                // console.log(action)
                state.loading = false
                state.profile = action.payload.data
            })
            .addCase(Signup.rejected, (state: user, action) => {
                // alert("signup rejected")
                // console.log(action)
                state.loading = false
                state.erroruser = {
                    message: action.error.message
                }
            })
            .addCase(Login.pending, (state: user) => {
                state.loading = true
                // alert("login pending")
            })
            .addCase(Login.fulfilled, (state: user, action) => {
                alert("login fullfilled")
                // console.log(action)
                state.loading = false
                state.profile = action.payload.data
            })
            .addCase(Login.rejected, (state: user, action) => {
                alert("login rejected")
                state.loading = false
                state.erroruser = {
                    message: action.error.message
                }
            })
            .addCase(LogOut.pending, (state: user) => {
                state.loading = true
            })
            .addCase(LogOut.fulfilled, (state: user) => {
                alert("logout fullfilled")
                state.loading = false
                state.profile = {
                    id: "",
                    email: ""
                }
                resetRole()
            })
            .addCase(LogOut.rejected, (state: user, action) => {
                alert("logout rejected")
                state.loading = false
                console.log(action)
                state.profile = {
                    id: "",
                    email: ""
                }
                state.erroruser = {
                    message: action.error.message
                }
            })
    },
    reducers: {
        resetError: (state: user) => {
            state.erroruser = {
                message: ""
            }
        }
    }
})

export const { resetError } = userslice.actions
export default userslice.reducer