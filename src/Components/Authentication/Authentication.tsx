'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../lib/Store';
import { Login, Signup } from '../../../lib/redux/actions/user';
import { resetError } from '../../../lib/redux/slices/User';
import Errorline from './Errorline';
import ServerError from './ServerError';
import LoginLoader from './LoginLoader';
import { MdCancel } from "react-icons/md";
var validator = require("email-validator");
import { useAuth } from '@/ContextProvider/LoginContext';

export interface SignUpData {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
}

export interface LoginData {
    email: string;
    password: string;
}

function Authentication() {
    const [login, setlogin] = useState<number>(1)
    const [logindata, setlogindata] = useState<LoginData>({ email: "", password: "" })
    const [signupdata, setsignupdata] = useState<SignUpData>({ name: "", email: "", password: "", confirmPassword: "" })
    const { loading, profile, erroruser } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>()
    const [index, setindex] = useState<number>(-1)

    const { loginStatus, setLoginStatus } = useAuth()

    const enablerror = (item: number) => {
        setindex(item)
        setTimeout(() => {
            setindex(-1)
        }, 5000);
    }

    const handleLogin = () => {
        if (logindata.email == "") return enablerror(0)
        if (!validator.validate(logindata.email)) return enablerror(0)
        if (logindata.password == "") return enablerror(1)
        dispatch(Login({ email: logindata.email, password: logindata.password }))
    }

    const handleSignup = () => {
        if (signupdata.name == "") return enablerror(2)
        if (signupdata.email == "") return enablerror(0)
        if (!validator.validate(signupdata.email)) return enablerror(0)
        if (signupdata.password == "") return enablerror(1)
        if (signupdata.password.length < 8) return enablerror(3)
        if (!/[a-z]/.test(signupdata.password) || !/[1-9]/.test(signupdata.password)) return enablerror(4)
        if (signupdata.confirmPassword == "") return enablerror(5)
        if (signupdata.password !== signupdata.confirmPassword) return enablerror(9)
        dispatch(Signup({ name: signupdata.name, email: signupdata.email, password: signupdata.password }))
    }

    useEffect(() => {
        if (!loading) {
            if (profile && Object.keys(profile).length > 0) {
                setLoginStatus(0);
            } else if (erroruser.message !== "") {
                if (erroruser?.message === "This Email has been used before") enablerror(7);
                else if (erroruser?.message === "Invalid password or email") enablerror(6);
                else if (erroruser?.message === "This email is not registered.") enablerror(10);
                else enablerror(12);
                dispatch(resetError());
            }
        }
    }, [loading, profile, erroruser]);

    const handleInputChange = (e: any, setter: Function) => {
        const { name, value } = e.target;
        setter((prev: any) => ({ ...prev, [name]: value }));
    }

    if (loginStatus === 0) return null

    return (
        <div className="w-[100vw] h-[100vh] fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] place-content-center place-items-center z-50">
            <div className='w-1/2 h-2/3 min-w-fit min-h-fit my-auto mx-auto bg-slate-300 text-white place-content-center place-items-center rounded-md relative'>
                <button className={`absolute right-1 top-2 `} onClick={() => setLoginStatus(0)}> <MdCancel color='rgb(20 184 166)' size={30} /> </button>
                {index === 12 ? <ServerError /> : loading ? <LoginLoader /> : login ? (
                    <div className="login w-1/2 h-2/3 bg-slate-200 flex flex-col justify-start gap-10 border-2 border-slate-400 px-5 pt-10 pb-5 relative">
                        <div className="inputemail relative">
                            <input type="text" name='email' placeholder='Enter Email' className='w-full text-lg p-0 text-slate-400 focus:outline-none rounded-sm px-2 py-1' value={logindata.email} onChange={(e) => handleInputChange(e, setlogindata)} />
                            {index === 0 && <Errorline index={0} />}
                        </div>
                        <div className="inputpassword relative">
                            <input type="password" name='password' placeholder='Enter Password' className='w-full text-lg p-0 text-slate-400 focus:outline-none rounded-sm px-2 py-1' value={logindata.password} onChange={(e) => handleInputChange(e, setlogindata)} />
                            {index === 1 && <Errorline index={1} />}
                            {index === 6 && <Errorline index={6} />}
                        </div>
                        <button onClick={handleLogin} className='w-full text-white font-bold bg-teal-400 text-xl rounded-md py-1'>Login</button>
                        <h1 className='underline text-teal-400 ms-auto cursor-pointer mt-auto' onClick={() => setlogin(0)}>Create new account</h1>
                    </div>
                ) : (
                    <div className="signup w-1/2 h-2/3 bg-slate-200 flex flex-col justify-start relative gap-5 border-2 border-slate-400 px-5 pt-10 pb-5">
                        <input type="text" name='name' placeholder='Enter Full Name' value={signupdata.name} onChange={(e) => handleInputChange(e, setsignupdata)} />
                        {index === 2 && <Errorline index={2} />}
                        <input type="text" name='email' placeholder='Enter Email' value={signupdata.email} onChange={(e) => handleInputChange(e, setsignupdata)} />
                        {index === 0 && <Errorline index={0} />}
                        <button onClick={handleSignup} className='w-full text-white font-bold bg-teal-400 text-xl rounded-md py-1'>Create Account</button>
                        <h1 className='underline text-teal-400 ms-auto cursor-pointer mt-auto' onClick={() => setlogin(1)}>Existing user</h1>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Authentication;
