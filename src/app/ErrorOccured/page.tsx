import Link from 'next/link'
import React from 'react'

function page() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg max-w-sm text-center">
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <h2 className="text-xl font-semibold text-gray-800">Something Went Wrong</h2>
                <p className="text-gray-600 mt-2">
                    We encountered an unexpected issue. Please try again later.
                </p>
                <Link href={'/'}>Home</Link>
            </div>
        </div>
    )
}

export default page
