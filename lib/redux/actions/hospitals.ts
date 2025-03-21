import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWithTimeout = async (url: string, options = {}, timeout = 20000) => {
    const controller = new AbortController();  // Create an AbortController instance
    const timeoutId = setTimeout(() => controller.abort(), timeout);  // Set the timeout

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,  // Associate the AbortController with the fetch request
        });

        clearTimeout(timeoutId);  // Clear the timeout once the fetch completes
        return response;  // Return the response if the request is successful
    } catch (error: any) {
        // console.log(error)
        if (error.name === 'AbortError') {
            throw new Error('Request timed out');
        }
        throw error;  // Throw any other errors (network issues, etc.)
    }
};

export const getHospitalList = createAsyncThunk(
    'hospitals/gethospitals',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await fetchWithTimeout(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/client/fetch/hospitals`, {
                method: "GET",
            }, 5000);  // Set the timeout to 5 seconds (5000 ms)

            if (!response.ok) {
                return rejectWithValue("Error in fetching hospitals");
            }

            const data = await response.json();
            // console.log(data);

            if (data.status !== "success") {
                throw new Error("Failed to fetch from server");
            }
            return data;  // Return the data on success
        }
        catch (error: any) {
            // console.log(error);
            return rejectWithValue(error.message);  // Reject with the error message
        }
    }
);
