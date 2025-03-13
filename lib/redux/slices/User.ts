import { createSlice } from '@reduxjs/toolkit'
import { Login, LogOut, Signup } from '../actions/user'
import { resetRole } from './Role'

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
                // alert("sign up pending")
                state.loading = true
            })
            .addCase(Signup.fulfilled, (state: user, action) => {
                alert("signup fullfilled")
                console.log(action)
                state.loading = false
                state.profile = {
                    id: action.payload.user.user_id,
                    name: action.payload.user.name,
                    email: action.payload.user.email
                }
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
                state.profile = {
                    id: action.payload.user.user_id,
                    name: action.payload.user.name,
                    email: action.payload.user.email
                }
            })
            .addCase(Login.rejected, (state: user, action: any) => {
                alert("login rejected")
                console.log(action)
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
                alert("logout fullfilled")
                state.loading = false
                state.profile = {
                    id: "",
                    email: "",
                    name: ""
                }
                resetRole()
            })
            .addCase(LogOut.rejected, (state: user, action) => {
                alert("logout rejected")
                state.loading = false
                console.log(action)
                state.erroruser = {
                    message: action.error.message,
                    // status: action.status
                }
            })
    },
    reducers: {
        resetError: (state: user) => {
            state.erroruser = {
                message: "",
                status: -1
            }
            state.loading = false
        }
    }
})

export const { resetError } = userslice.actions
export default userslice.reducer