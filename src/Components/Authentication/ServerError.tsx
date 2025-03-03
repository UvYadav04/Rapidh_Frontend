import React from 'react'

function ServerError() {
    return (
        <div className="w-full h-full flex flex-col place-content-center place-items-center">
            <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg text-center w-2/3 md:w-1/3">
                <h2 className="text-xl font-bold">Server Error</h2>
                <p className="text-sm mt-2">Something went wrong on our end. Please try again later.</p>
            </div>
        </div>

    )
}

export default ServerError
