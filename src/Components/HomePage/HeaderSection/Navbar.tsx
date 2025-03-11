'use client';

import React, { ReactElement } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppStore, RootState } from '../../../../lib/Store';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/ContextProvider/LoginContext';
import { LogOut } from '../../../../lib/redux/actions/user';
import Sidebar from './Sidebar';

function Navbar() {
    const router = useRouter();
    const { loading, erroruser, profile } = useSelector((state: RootState) => state.user);
    const { loginStatus, setLoginStatus } = useAuth();
    const dispatch = useDispatch<AppDispatch>()
    // console.log(profile)

    return (
        <div className=" flex justify-center lg:w-full w-fit bg-[#EDF6F9] items-center lg:mt-2 mt-0  sticky top-0 left-0">
            <Sidebar />
            <ul className=" gap-10 lg:flex hidden text-teal-500 font-semibold text-lg ms-8 flex-1 justify-center">
                <MenuItem title="Home" onClick={() => router.push('/')} />
                <MenuItem title="Hospitals" />
                <MenuItem title="Consult" />
                <MenuItem title="Privacy Policy" />
                {profile?.id && (
                    <>
                        <MenuItem
                            title="My Bookings"
                            onClick={() => router.push(`/RapidHostpital/Mybookings?userid=${profile.id}`)}
                        />
                        <MenuItem title="LogOut" onClick={() => dispatch(LogOut())} />
                    </>
                )}

            </ul>

            <button
                className="text-md lg:flex hidden text-black rounded-s-full w-fit  bg-teal-500 ps-3 text-2xl py-2  items-center gap-2 pe-14"
                onClick={() => {
                    if (profile?.id !== "") {
                        alert('Profile clicked');
                    } else {
                        setLoginStatus(loginStatus === 0 ? 1 : 0);
                    }
                }}
            >
                <FaUserCircle color="white" />
                <h6 className="text-sm text-white cursor-pointer">
                    {profile?.id !== ""
                        ? `${profile?.email?.slice(0, 5).toUpperCase()}...`
                        : 'Login'}
                </h6>
            </button>
        </div>
    );
}

const MenuItem = ({ title, onClick }: { title: string; onClick?: () => void }) => (
    <li className={`cursor-pointer ${title === "LogOut" ? "text-red-500" : ""}`} onClick={onClick}>
        {title}
    </li>
);

export default Navbar;
