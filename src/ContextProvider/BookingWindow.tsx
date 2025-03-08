'use client'

import React, { createContext, ReactNode, useContext, useState } from 'react'

interface bookingType {
    booking: number,
    setbooking: (status: number) => void
}

const bookingwindowContext = createContext<bookingType | undefined>(undefined)
function BookingWindowProvider({ children }: { children: ReactNode }) {
    const [booking, setbooking] = useState<number>(0)
    return (
        <bookingwindowContext.Provider value={{ booking, setbooking }}>
            {children}
        </bookingwindowContext.Provider>
    )
}

export default BookingWindowProvider


export const useBookingWindow = (): bookingType => {
    const context = useContext(bookingwindowContext)
    if (!context) {
        throw new Error('useBookingWindow must be used within an BoookingProvider');
    }
    return context
}