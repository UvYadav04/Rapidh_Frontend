import { createAsyncThunk } from "@reduxjs/toolkit"

export const Signup = createAsyncThunk(
    'user/createAccount',
    async ({ name, email, password }: { name: string, email: string, password: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:83/api/signup`, {
                method: "POST",
                credentials: "include", // Important for cookies
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            })

            if (!response.ok)
                return rejectWithValue("Error in creating account")

            const data = await response.json()
            if (data.status !== "success")
                return rejectWithValue(data.message)

            return data
        } catch (error) {
            console.log(error)
            return rejectWithValue("Somethign went wrong")
        }
    }
)
export const Login = createAsyncThunk(
    'user/loginaccount',
    async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:83/api/login`, {
                method: "POST",
                credentials: "include", // Important for cookies
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            if (!response.ok)
                return rejectWithValue({ message: "Error in logging in out", status: 404 })
            const data = await response.json()
            console.log(data)
            if (data.status === "error")
                return rejectWithValue({ message: data.msg, status: data.code })
            return data
        } catch (error) {
            console.log(error)
            return rejectWithValue({ message: "something went wrong our side. Please try again", status: 402 })
        }
    }
)
export const LogOut = createAsyncThunk(
    'user/logoutaccount',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:83/api/logout`, {
                credentials: "include", // Important for cookies
            })

            if (!response.ok)
                return rejectWithValue({ message: "Error in logging out", status: 404 })

            const data = await response.json()
            if (data.status !== "success")
                return rejectWithValue({ message: data.message, status: data.code })
            return data
        } catch (error) {
            return rejectWithValue({ message: "something went wrong our side. Please try again", status: 402 })
        }
    }
)