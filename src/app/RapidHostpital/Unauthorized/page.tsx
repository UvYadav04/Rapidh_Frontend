import React from 'react';

const page = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                <h1 className="text-4xl font-bold text-red-500 mb-4">Unauthorized</h1>
                <p className="text-xl text-gray-700 mb-6">
                    You do not have permission to access this page.
                </p>
                <a
                    href="/"
                    className="text-blue-500 hover:text-blue-700 text-lg font-semibold"
                >
                    Go to Home
                </a>
            </div>
        </div>
    );
};

export default page;
