'use client'

import { Booking } from '../../../../lib/redux/slices/Mybookings'


export interface userList {
    first_name: string,
    user_id: string,
    email: string,
    created: string,
    Bookings: Booking[]
}
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { RootState } from "../../../../lib/Store";
import Header from '@/Components/HomePage/HeaderSection/Header';
import List from './List';

const LIMIT = 1;

const page = () => {
    const router = useRouter();
    const [loader, setloader] = useState<boolean>(false);
    const [role, setrole] = useState<string>("");
    const { profile, erroruser, loading } = useSelector((state: RootState) => state.user);
    const [data, setdata] = useState<userList[]>([]);
    const [hasmore, sethasmore] = useState<boolean>(true);
    const isFetching = useRef<boolean>(false);

    console.log(hasmore);

    const fetchMoreData = async () => {
        if (isFetching.current) return; // Prevent fetching if already in progress
        isFetching.current = true;

        try {
            const response = await fetch(`http://localhost:83/api/fetch/admin/users?skip=${data.length}`, {
                credentials: 'include'
            });

            if (!response.ok) {
                sethasmore(false);
                isFetching.current = false;
                return;
            }

            const userdata = await response.json();
            console.log(userdata);

            if (userdata.status === "error" || !Array.isArray(userdata.users)) {
                sethasmore(false);
                isFetching.current = false;
                return;
            }

            if (userdata.users.length < LIMIT) sethasmore(false);
            setdata((prev) => [...prev, ...userdata.users])

        } catch (error) {
            console.log(error);
        } finally {
            isFetching.current = false; // Allow fetching again
        }
    };

    useEffect(() => {
        if (data.length === 0 && hasmore) fetchMoreData();
    }, []);

    console.log(data);

    return (
        <div className='w-full h-full min-h-fit p-0 flex flex-col'>
            <Header />
            <div className="adminheader w-[90%] mx-auto mt-10 text-teal-400 ">
                <h1 className='text-3xl font-mono'>Welcome Admin</h1>
                <div className="flex flex-col   w-[100%]">
                    <div className='flex flex-row w-full text-slate-400 '>
                        <span className='w-12 px-2 py-2 '>Sr.No</span>
                        <span className='text-start px-2 py-2 flex-1 lg:block hidden'>Id</span>
                        <span className='text-start px-2 py-2 flex-1'>Name</span>
                        <span className='text-start px-2 py-2 flex-1'>Email</span>
                        <span className='text-start px-2 py-2 flex-1 md:block hidden'>Joined</span>
                    </div>
                    <InfiniteScroll
                        dataLength={data.length}
                        next={fetchMoreData}
                        hasMore={hasmore}
                        loader={<tr><td colSpan={4}><h4>Loading...</h4></td></tr>}
                        endMessage={"end"}
                        className='flex flex-col gap-2 w-full'
                    >
                        {data.map((item, index) => <List item={item} index={index} />)}
                    </InfiniteScroll>
                </div>

            </div>
        </div>
        // <div className="w-full h-full flex flex-col items-center mt-10 bg-slate-500">
        //     <h1 className="text-2xl mb-4">Infinite Scroll Demo</h1>

        // </div>
    );
};

export default page;


// const getRole = async () => {
//     try {
//         setloader(true)
//         const response = await fetch("http://localhost:83/api/fetchRole", {
//             credentials: 'include',
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ id: profile.id })
//         })
//         setloader(false)
//         if (!response.ok) {
//             console.log(response)
//             return router.replace('/RapidHostpital/unauthorized?part=2')
//         }

//         const data = await response.json();
//         console.log(data)
//         // return
//         if (data.status === "error")
//             router.replace('/ErrorOccured')

//         if (data.role !== "admin")
//             router.replace('/RapidHostpital/unauthorized?part=2')

//         setrole(data.role)

//     } catch (error) {
//         // alert("yaah dikkay h")
//         console.log(error)
//         router.replace('/RapidHostpital/unauthorized?part=3')
//     }
// }

// useEffect(() => {
//     if (!profile || profile.id === "")
//         router.replace('/RapidHostpital/unauthorized?message=maalikyaahanse')
// }, [profile])

// useEffect(() => {
//     getRole()
// }, [])


// if (loader)
//     return <LoginLoader />

// if (role === "")
//     return null
// 