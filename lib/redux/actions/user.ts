import { createAsyncThunk } from "@reduxjs/toolkit"

export const Signup = createAsyncThunk(
    'user/createAccount',
    async ({ name, email, password }: { name: string, email: string, password: string }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:8080/signup`, {
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
            if (!data.success)
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
            const response = await fetch(`http://localhost:8080/login`, {
                method: "POST",
                credentials: "include", // Important for cookies
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            if (!response.ok)
                return rejectWithValue("Error in creating account")

            const data = await response.json()
            if (!data.success)
                return rejectWithValue(data.message)
            return data
        } catch (error) {
            return rejectWithValue("something went wrong our side. Please try again")
        }
    }
)
export const LogOut = createAsyncThunk(
    'user/logoutaccount',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:8080/logout`, {
                credentials: "include", // Important for cookies
            })

            if (!response.ok)
                return rejectWithValue("Error in logging out")

            const data = await response.json()
            if (!data.success)
                return rejectWithValue(data.message)
            return data
        } catch (error) {
            return rejectWithValue("something went wrong our side. Please try again")
        }
    }
)