'use client';

import React, { ReactElement, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppStore, RootState } from '../../../../lib/Store';
import { redirect, useRouter } from 'next/navigation';
import { useAuth } from '@/ContextProvider/LoginContext';
import { LogOut } from '../../../../lib/redux/actions/user';
import Sidebar from './Sidebar';
import { resetBooking } from '../../../../lib/redux/slices/Mybookings';
import { resetError } from '../../../../lib/redux/slices/User';

function Navbar() {
    const router = useRouter();
    const { loading, erroruser, profile } = useSelector((state: RootState) => state.user);
    const { loginStatus, setLoginStatus } = useAuth();
    const dispatch = useDispatch<AppDispatch>()

    // useEffect(() => {
    //     if (erroruser.message !== "") {
    //         dispatch(resetError())
    //         redirect(`/ErrorOccured?message=Profile error in navbar`)
    //     }
    // })
    return (
        <div className=" flex justify-end lg:w-full w-fit bg-[#EDF6F9] items-center lg:mt-2 mt-0  sticky top-0 left-0">
            <Sidebar />
            <ul className=" gap-10 lg:flex hidden text-teal-500 font-semibold text-lg ms-8 flex-1 justify-center">
                <MenuItem title="Home" onClick={() => router.push('/')} />
                <MenuItem title="Hospitals" onClick={() => router.push('/Hospitals')} />
                <MenuItem title="Consult" />
                <MenuItem title="Privacy Policy" />
                {profile?.id && (
                    <>
                        <MenuItem
                            title="My Bookings"
                            onClick={() => router.push(`/Mybookings?userid=${profile.id}`)}
                        />
                        {/* <MenuItem
                            title="Admin Panel"
                            onClick={() => router.push(`/Admin`)}
                        /> */}
                    </>
                )}

            </ul>

            <div
                className="text-md lg:flex hidden text-black rounded-s-full w-fit  bg-teal-500 ps-3 text-2xl py-2  items-center gap-2 pe-14 relative group"
                onClick={() => {
                    if (profile.id === "")
                        setLoginStatus(loginStatus === 0 ? 1 : 0);
                }}
            >
                <FaUserCircle color="white" className='h-full' />
                <h6 className="text-sm text-white cursor-pointer relative">
                    {
                        profile?.id !== ""
                            ? `${profile?.email?.slice(0, 5).toUpperCase()}...`
                            : 'Login'}
                </h6>
                {profile.id !== "" && <button className='absolute top-[100%] transition duration-1000 ease-in-out group-hover:block hidden right-0 w-full bg-slate-200 rounded-sm text-red-500 text-lg font-semibold' onClick={() => {
                    dispatch(LogOut())
                    dispatch(resetBooking())
                }}>Log Out</button>}
            </div>
        </div>
    );
}

const MenuItem = ({ title, onClick }: { title: string; onClick?: () => void }) => (
    <li className={`cursor-pointer ${title === "LogOut" ? "text-red-500" : ""}`} onClick={onClick}>
        {title}
    </li>
);

export default Navbar;
