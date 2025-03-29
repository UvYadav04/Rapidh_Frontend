import React from 'react'
import './Loader.css'
function LoginLoader() {
    return (
        <div className="w-[100vw] h-[100vh] fixed  top-0 left-0  loader z-[100]">
            <div className="justify-content-center jimu-primary-loading"></div>
        </div>
    )
}

export default LoginLoader
