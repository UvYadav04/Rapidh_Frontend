import React from 'react';

function ServerError() {
    return (
        <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 z-[60]">
            <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg text-center w-[300px]">
                <h2 className="text-xl font-bold">Server Error</h2>
                <p className="text-sm mt-2">Something went wrong on our server. Please try again later.</p>
            </div>
        </div>
    );
}

export default ServerError;
