'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../../lib/Store'
import { redirect } from 'next/navigation'
import { fetchrole } from '../../../../lib/redux/actions/Role'
import Navbar from '../../../Components/HomePage/HeaderSection/Navbar'
import { MdCancel } from "react-icons/md";
import LoginLoader from '../../../Components/Authentication/LoginLoader'
import { useSearchParams } from 'next/navigation'

interface wardsInterface {
    name: string
    cost: number | undefined
    image: File | null
}

interface operationInterface {
    name: string,
    price: number | undefined
}

interface addressInterface {
    state: string | undefined,
    city: string | undefined,
    town: string | undefined,
    pin: number | undefined,
}

interface hospitalInterface {
    name: string,
    address: addressInterface,
    contact: {
        mobile: number | undefined,
        appointment: number | undefined
    },
    about: string,
    wards: wardsInterface[],
    operations: operationInterface[],
    facilities: string[]
}

const initialState = {
    name: "",
    address: {
        city: undefined,
        state: undefined,
        town: undefined,
        pin: undefined
    },
    contact: {
        mobile: undefined,
        appointment: undefined,
    },
    about: "",
    wards: [],
    operations: [],
    facilities: []
}

function page() {
    const [ward, setward] = useState<wardsInterface>({ name: "", cost: undefined, image: null })
    const [operation, setoperation] = useState<operationInterface>({ name: "", price: undefined })
    const [facility, setfacility] = useState<string>("")
    const [hospital, sethospital] = useState<hospitalInterface>(initialState)
    const [errorIndex, setErrorIndex] = useState<number>(-1)
    const { role, loading, error } = useSelector((state: RootState) => state.role)
    const dispatch = useDispatch<AppDispatch>()
    const params = useSearchParams()

    // console.log(role)
    // useEffect(() => {
    //     console.log(role, loading, error)
    //     if (!loading) {
    //         if (Object.keys(error).length > 0)
    //             redirect('/RapidHostpital/ErrorOccured')
    //         else if (role !== "admin")
    //             redirect('/RapidHostpital/Unauthorized')
    //         else if (!role)
    //             dispatch(fetchrole())
    //     }
    // }, [role, loading, error, dispatch])

    useEffect(() => {
        const encodedHospitalData = params.get("hospital")
        const data = encodedHospitalData ? JSON.parse(atob(encodedHospitalData)) : null;
        // console.log(data)
        if (data) {
            sethospital((prev) => {
                return {
                    ...prev,
                    name: data.name,
                    about: data.about,
                    contact: {
                        appointment: data.contact.appointments,
                        mobile: data.contact.emergency
                    },
                    operations: data.operations,
                    wards: data.wards


                }
            })
        }
    }, [role])



    const enableError = (index: number) => {
        setTimeout(() => {
            setErrorIndex(-1)
        }, 4000);
        setErrorIndex(index)
    }

    const addward = () => {
        if (ward.name === "")
            return enableError(7)
        if (ward.cost === undefined)
            return enableError(8)
        if (ward.image === null)
            return enableError(9)


        sethospital((prev) => {
            return { ...prev, wards: [...prev.wards, ward] }
        })
        setward((prev) => {
            return { ...prev, name: "", image: null, cost: undefined }
        })
    }

    const removeWard = (item: wardsInterface) => {
        const filtered = hospital.wards.filter((ward) => ward !== item)
        sethospital((prev) => {
            return { ...prev, wards: filtered }
        })
    }

    const addOperation = () => {
        if (operation.name === "")
            return enableError(10)
        if (operation.price === undefined)
            return enableError(11)


        sethospital((prev) => {
            return { ...prev, operations: [...prev.operations, operation] }
        })
        setoperation((prev) => {
            return { ...prev, name: "", price: undefined }
        })

    }

    const removeOperation = (item: operationInterface) => {
        const filtered = hospital.operations.filter((operation) => operation !== item)
        sethospital((prev) => {
            return { ...prev, operations: filtered }
        })
    }

    const addfacility = () => {
        if (facility == "")
            return enableError(13)
        sethospital((prev) => {
            return { ...prev, facilities: [...prev.facilities, facility] }
        })

        setfacility("")
    }

    const removeFacility = (item: string) => {
        const filtered = hospital.facilities.filter((facility) => facility !== item)
        sethospital((prev) => {
            return { ...prev, facilities: filtered }
        })
    }

    if (loading)
        return <LoginLoader />
    return (
        <div className='newhospital w-full flex flex-col'>
            <Navbar />
            <div className="hospitalform flex flex-wrap p-5 w-[80%] mx-auto bg-slate-200 flex-col gap-5">
                <h1 className='text-2xl text-black mx-auto'>New Hospital Form</h1>
                <div className="relative mb-1 w-full">
                    <input
                        type="text"
                        id="name"
                        className="peer w-full pt-1 px-1 py-[0.5px] focus:outline-none border-[2px] border-black text-slate-700 bg-slate-200 z-40"
                        value={hospital.name}
                        onChange={(e) => sethospital((prev) => { return { ...prev, name: e.target.value }; })}
                    />
                    <label
                        htmlFor="name"
                        className="absolute left-2 top-[-8px] font-semibold bg-slate-200 text-[10px] text-black z-0"
                    >
                        {errorIndex == 0 ? <p className='text-red-500'>required</p> : "Name of hospital"}
                    </label>
                </div>

                <div className="address flex gap-2">
                    <div className="relative mb-1 w-full flex-1">
                        <input
                            type="text"
                            id="state"
                            className="peer w-full pt-1 px-1 py-[0.5px] focus:outline-none border-[2px] border-black text-slate-700 bg-slate-200 z-40"
                            value={hospital.address?.state}
                            onChange={(e) => sethospital((prev) => {
                                return { ...prev, address: { ...prev.address, state: e.target.value } };
                            })}
                        />
                        <label
                            htmlFor="state"
                            className="absolute left-2 top-[-8px] font-semibold bg-slate-200 text-[10px] text-black z-0"
                        >
                            {errorIndex == 0 ? <p className='text-red-500'>required</p> : "State"}
                        </label>
                    </div>
                    <div className="relative mb-1 w-full flex-1">
                        <input
                            type="text"
                            id="city"
                            className="peer w-full pt-1 px-1 py-[0.5px] focus:outline-none border-[2px] border-black text-slate-700 bg-slate-200 z-40"
                            value={hospital.address?.city}
                            onChange={(e) => sethospital((prev) => {
                                return { ...prev, address: { ...prev.address, city: e.target.value } };
                            })}
                        />
                        <label
                            htmlFor="city"
                            className="absolute left-2 top-[-8px] font-semibold bg-slate-200 text-[10px] text-black z-0"
                        >
                            {errorIndex == 0 ? <p className='text-red-500'>required</p> : "City"}
                        </label>
                    </div>
                    <div className="relative mb-1 w-full flex-1">
                        <input
                            type="text"
                            name="town"
                            className="peer w-full pt-1 px-1 py-[0.5px] focus:outline-none border-[2px] border-black text-slate-700 bg-slate-200 z-40"
                            value={hospital.address?.town}
                            onChange={(e) => sethospital((prev) => {
                                return { ...prev, address: { ...prev.address, town: e.target.value } };
                            })}
                        />
                        <label
                            htmlFor="town"
                            className="absolute left-2 top-[-8px] font-semibold bg-slate-200 text-[10px] text-black z-0"
                        >
                            {errorIndex == 0 ? <p className='text-red-500'>required</p> : "Town"}
                        </label>
                    </div>
                    <div className="relative mb-1 w-full flex-1">
                        <input
                            type="number"
                            id="pin"
                            className="peer w-full pt-1 px-1 py-[0.5px] focus:outline-none border-[2px] border-black text-slate-700 bg-slate-200 z-40"
                            value={hospital.address?.pin}
                            onChange={(e) => sethospital((prev) => {
                                return { ...prev, address: { ...prev.address, pin: (Number)(e.target.value) } };
                            })}
                        />
                        <label
                            htmlFor="pin"
                            className="absolute left-2 top-[-8px] font-semibold bg-slate-200 text-[10px] text-black z-0"
                        >
                            {errorIndex == 0 ? <p className='text-red-500'>required</p> : "PIN"}
                        </label>
                    </div>

                </div>

                <div className="contact flex gap-5">
                    <div className="relative mb-1 w-1/3 ">
                        <input
                            type="number"
                            name="mobile"
                            className="peer w-full pt-1 px-1 py-[0.5px] focus:outline-none border-[2px] border-black text-slate-700 bg-slate-200 z-40"
                            value={hospital.address?.pin}
                            onChange={(e) => sethospital((prev) => {
                                return { ...prev, contact: { ...prev.contact, mobile: (Number)(e.target.value) } };
                            })}
                        />
                        <label
                            htmlFor="pin"
                            className="absolute left-2 top-[-8px] font-semibold bg-slate-200 text-[10px] text-black z-0"
                        >
                            {errorIndex == 0 ? <p className='text-red-500'>required</p> : "mobile"}
                        </label>
                    </div>
                    <div className="relative mb-1 w-1/3">
                        <input
                            type="number"
                            name="appointment"
                            className="peer w-full pt-1 px-1 py-[0.5px] focus:outline-none border-[2px] border-black text-slate-700 bg-slate-200 z-40"
                            value={hospital.contact.appointment}
                            onChange={(e) => sethospital((prev) => {
                                return { ...prev, contact: { ...prev.contact, appointment: (Number)(e.target.value) } };
                            })}
                        />
                        <label
                            htmlFor="appointment"
                            className="absolute left-2 top-[-8px] font-semibold bg-slate-200 text-[10px] text-black z-0"
                        >
                            {errorIndex == 0 ? <p className='text-red-500'>required</p> : "appointment"}
                        </label>
                    </div>
                </div>

                <div className="wards flex flex-col gap-2 w-full ">
                    <div className="addwards flex gap-2 w-full">
                        <div className="relative mb-1 w-1/4">
                            <input
                                type="text"
                                name="ward name"
                                className="peer w-full pt-1 px-1 py-[0.5px] focus:outline-none border-[2px] border-black text-slate-700 bg-slate-200 z-40"
                                value={ward.name}
                                onChange={(e) => setward((prev) => {
                                    return { ...prev, name: e.target.value };
                                })}
                            />
                            <label
                                htmlFor="ward name"
                                className="absolute left-2 top-[-8px] font-semibold bg-slate-200 text-[10px] text-black z-0"
                            >
                                {errorIndex == 7 ? <p className='text-red-500'>required</p> : "ward name"}
                            </label>
                        </div>
                        <div className="relative mb-1 w-1/4">
                            <input
                                type="number"
                                name="ward cost"
                                className="peer w-full pt-1 px-1 py-[0.5px] focus:outline-none border-[2px] border-black text-slate-700 bg-slate-200 z-40"
                                value={ward.cost === undefined ? "" : ward.cost}
                                onChange={(e) => setward((prev) => {
                                    return { ...prev, cost: Number(e.target.value) };
                                })}
                            />
                            <label
                                htmlFor="ward cost"
                                className="absolute left-2 top-[-8px] font-semibold bg-slate-200 text-[10px] text-black z-0"
                            >
                                {errorIndex == 8 ? <p className='text-red-500'>required</p> : "ward cost"}
                            </label>
                        </div>

                        <div className="relative mb-1 w-1/4">
                            <input
                                type="file"
                                name="ward image"
                                className="peer w-full pt-0 px-1 py-[0.5px] focus:outline-none border-[2px] border-slate-400 text-slate-700 bg-slate-200 z-40"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        setward((prev) => ({
                                            ...prev,
                                            image: e.target.files ? e.target.files[0] : null,
                                        }));
                                    }
                                }}
                                accept='image/*'
                            />
                        </div>


                        <button className='text-white px-2 w-1/5 text-sm h-8 bg-black border-black border-[1px]' onClick={() => addward()} >Add ward</button>
                    </div>
                    <div className="showwards flex flex-wrap gap-3 ">
                        {
                            hospital.wards.map((item, index) => {
                                return <div key={index} className='bg-black text-white rounded-full px-2 flex place-items-center py-1 text-lg'>{item.name} | ₹{item.cost} <MdCancel onClick={() => removeWard(item)} className='inline mx-1 ms-3' /></div>
                            })
                        }
                    </div>
                </div>
                <div className="operations flex flex-col gap-2 w-full ">
                    <div className="addOperations flex gap-2 w-full">
                        <div className="relative mb-1 w-1/3">
                            <input
                                type="text"
                                name="operation name"
                                className="peer w-full pt-1 px-1 py-[0.5px] focus:outline-none border-[2px] border-black text-slate-700 bg-slate-200 z-40"
                                value={operation.name}
                                onChange={(e) => setoperation((prev) => {
                                    return { ...prev, name: e.target.value };
                                })}
                            />
                            <label
                                htmlFor="operation name"
                                className="absolute left-2 top-[-8px] font-semibold bg-slate-200 text-[10px] text-black z-0"
                            >
                                {errorIndex == 10 ? <p className='text-red-500'>required</p> : "Operation name"}
                            </label>
                        </div>
                        <div className="relative mb-1 w-1/3">
                            <input
                                type="number"
                                name="operation cost"
                                className="peer w-full pt-1 px-1 py-[0.5px] focus:outline-none border-[2px] border-black text-slate-700 bg-slate-200 z-40"
                                value={operation.price === undefined ? "" : operation.price}
                                onChange={(e) => setoperation((prev) => {
                                    return { ...prev, price: Number(e.target.value) };
                                })}
                            />
                            <label
                                htmlFor="operation cost"
                                className="absolute left-2 top-[-8px] font-semibold bg-slate-200 text-[10px] text-black z-0"
                            >
                                {errorIndex == 11 ? <p className='text-red-500'>required</p> : "Operation cost"}
                            </label>
                        </div>




                        <button className='text-white px-2 w-1/4 text-sm h-8 bg-black border-black border-[1px]' onClick={() => addOperation()} >Add Operation</button>
                    </div>
                    <div className="showoperations flex flex-wrap gap-3 ">
                        {
                            hospital.operations.map((item, index) => {
                                return <div key={index} className='bg-black text-white rounded-full px-2 py-1 text-lg flex place-items-center'>{item.name} | ₹{item.price} <MdCancel onClick={() => removeOperation(item)} className='inline mx-1 ms-3' /></div>
                            })
                        }
                    </div>
                </div>

                <div className="abouthospital">
                    <div className="relative mb-1 w-full">
                        <textarea
                            name="about"
                            rows={5}
                            className="peer w-full pt-1 px-1 py-[0.5px] focus:outline-none border-[2px] border-black text-slate-700 bg-slate-200 z-40"
                            value={hospital.about}
                            onChange={(e) => sethospital((prev) => {
                                return { ...prev, about: e.target.value };
                            })}
                            minLength={30}
                            maxLength={400}
                        />
                        <label
                            htmlFor="operation cost"
                            className="absolute left-2 top-[-8px] font-semibold bg-slate-200 text-[10px] text-black z-0"
                        >
                            {errorIndex == 12 ? <p className='text-red-500'>required</p> : "About hospital"}
                        </label>
                    </div>
                </div>

                <div className="facilities flex flex-col gap-2 w-full ">
                    <div className="addfacility flex gap-2 w-full">
                        <div className="relative mb-1 w-3/4">
                            <input
                                type="text"
                                name="faclity"
                                className="peer w-full pt-1 px-1 py-[0.5px] focus:outline-none border-[2px] border-black text-slate-700 bg-slate-200 z-40"
                                value={facility}
                                onChange={(e) => setfacility(e.target.value)}
                            />
                            <label
                                htmlFor="Facility name"
                                className="absolute left-2 top-[-8px] font-semibold bg-slate-200 text-[10px] text-black z-0"
                            >
                                {errorIndex == 13 ? <p className='text-red-500'>required</p> : "Facility"}
                            </label>
                        </div>




                        <button className='text-white px-2 w-1/4 text-sm h-8 bg-black border-black border-[1px]' onClick={() => addfacility()} >Add Facility</button>
                    </div>
                    <div className="showfacilities flex flex-wrap gap-3 ">
                        {
                            hospital.facilities.map((item, index) => {
                                return <div key={index} className='bg-black text-white flex place-items-center rounded-full px-2  py-1 text-lg'>{item}<MdCancel className='inline mx-1 ms-3' onClick={() => removeFacility(item)} /></div>
                            })
                        }
                    </div>
                </div>

            </div>
        </div >
    )
}

export default page
