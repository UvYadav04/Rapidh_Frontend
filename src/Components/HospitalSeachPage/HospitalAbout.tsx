'use client';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import Aretemis from '../../Images/Hospitals/hospital.jpg';
import WardCard from '../HomePage/ServicesSection/WardCard';
import OperationCard from './OperationCard';
import '../Css/components.css';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../lib/Store';
import { useAuth } from '@/ContextProvider/LoginContext';
import LoginLoader from '../Authentication/LoginLoader';
import { fetchrole } from '../../../lib/redux/actions/Role';
import { MdCancel } from 'react-icons/md';
import { useBookingWindow } from '@/ContextProvider/BookingWindow';
import BookingWindow from '../BookingWindow/BookingWindow';

export interface OperationList {
    id: string,
    name: string;
    operationCharges: number;
}

export interface WardList {
    id: string
    name: string;
    charge: number;
    description: string;
}

export interface hospitalInterface {
    id: string,
    name: string,
    city: string,
    state: string,
    PIN: string,
    image: string,
    rating: number,
    reviews: string;
    admissionCharges: number;
    contact: {
        emergency: string;
        appointments: string;
    };
    wards: WardList[];
    operations: OperationList[];
    about: string;
}

export interface patientInterface {
    Admit: boolean;
    Ward: WardList;
    Days: number | undefined;
    Age: number | undefined;
    Requirements: string;
}

export interface OperationInterface {
    Operation: boolean;
    Ward: WardList;
    operationdata: OperationList | null;
    Age: number | undefined;
    Requirements: string;
    diabetes: number;
    treatment: number;
    Allergy: string;
}

function HospitalCard2({ data }: { data: hospitalInterface }) {
    console.log(data)

    const [popup, setPopup] = useState<boolean>(false);
    const [selected, setSelected] = useState<number>(1);
    const [operationInput, setOperationInput] = useState<string>('');
    const [pendingBooking, setpendingBooking] = useState<number>(-1)
    const [patient, setPatient] = useState<patientInterface>({
        Admit: true,
        Ward: data.wards[0],
        Days: undefined,
        Age: undefined,
        Requirements: '',
    });
    const [operation, setOperation] = useState<OperationInterface>({
        Operation: true,
        operationdata: null,
        Age: undefined,
        Requirements: '',
        diabetes: 0,
        Ward: data.wards[0],
        treatment: 0,
        Allergy: '',
    });
    const [errorIndex, setErrorIndex] = useState<number>(-1);

    const router = useRouter();
    const { profile } = useSelector((state: RootState) => state.user);
    const { loginStatus, setLoginStatus } = useAuth();
    const { error, role, loading } = useSelector((state: RootState) => state.role);
    const [window, setwindow] = useState<boolean>(false)

    const dispatch = useDispatch<AppDispatch>();

    const handleOperation = () => {
        if (operation.operationdata === null) return setErrorIndex(2);
        if (operation.Age === undefined) return setErrorIndex(3);
        if (operation.Age <= 0 || operation.Age > 100) return setErrorIndex(6);

        if (profile.id === '') {
            setpendingBooking(1)
            return setwindow(true);
        }

        const operationData = btoa(JSON.stringify(operation));
        const hospitalData = btoa(JSON.stringify(data));
        sessionStorage.setItem("sessionKey", btoa(JSON.stringify(profile.id)))
        router.push(`Hospitals/Booking?user=${profile.id}&patient=${operationData}&hospital=${hospitalData}`);
    };

    const handlePatient = () => {
        if (patient.Age === undefined) return setErrorIndex(4);
        if (patient.Age <= 0 || patient.Age > 100) return setErrorIndex(5)

        if (profile.id === '') {
            setpendingBooking(2)
            return setwindow(true);
        }
        const patientData = btoa(JSON.stringify(patient));
        const hospitalData = btoa(JSON.stringify(data));
        sessionStorage.setItem("sessionKey", btoa(JSON.stringify(profile.id)))
        router.push(`Hospitals/Booking?user=${profile.id}&patient=${patientData}&hospital=${hospitalData}`);
    };

    const editHospital = (hospitalDataObj: any) => {
        const hospitalData = btoa(JSON.stringify(hospitalDataObj));
        router.replace(`/RapidHostpital/addNewHospital?hospital=${hospitalData}`);
    };

    useEffect(() => {
        if (profile.id !== "" && pendingBooking != -1) {
            alert("maalik pending")
            if (pendingBooking == 1)
                handleOperation()

            if (pendingBooking == 2)
                handlePatient()

            setpendingBooking(-1)
        }
    }, [profile])

    useEffect(() => {
        if (popup === false) {
            setwindow(false)
            setpendingBooking(-1)
        }
    }, [popup])

    if (loading) return <LoginLoader />;

    return (
        <div className="Card2 w-[100%] flex flex-row bg-white">

            <ListCard data={data} setPopup={setPopup} popup={popup} />
            {window ? <BookingWindow setwindow={setwindow} /> : null}

            {popup ? (
                <div
                    className="popup flex flex-col gap-5 overflow-y-scroll lg:w-[80%] md:w-[90%] w-full h-[80%] fixed lg:top-[10%] md:top-[14%] top-12 lg:left-[10%] md:left-[5%] left-0 bg-slate-100 px-2 py-2 z-40"
                    style={{ scrollbarWidth: 'none' }}
                >
                    <h1
                        className="right-2 absolute top-2 cursor-pointer w-fit px-2 rounded-lg text-teal-400 "
                        onClick={() => setPopup(false)}
                    >
                        <MdCancel size={25} />
                    </h1>
                    <div className="intro flexflex-col justify-center text-black">
                        <div className="top flex flex-row">
                            <div className="image w-fit">
                                <Image src={Aretemis} className='xl:w-60 xl:h-56 lg:w-56 lg:h-52 md:w-52 md:h-48 sm:w-40 sm:h-36 w-32 h-28 hover:translate-x-10 hover:translate-y-8 transiton duration-500 hover:scale-150 md:rounded-none rounded-md' alt="hospital image" />
                            </div>
                            <div className="About flex flex-col justify-start gap-0 w-3/4 px-2 xl:pt-2 lg:pt-1  pt-0">
                                <h1 className="xl:text-4xl lg:text-3xl md:text-2xl text-xl text-teal-500 font-semibold flex justify-start items-center gap-5 ">
                                    {data.name}
                                    {
                                        role === "admin" ? <button onClick={() => editHospital(data)} className="bg-teal-500 text-white text-sm px-2 my-auto">
                                            Edit
                                        </button> : null
                                    }
                                </h1>
                                <p className='mt-0'>{data.rating} ratings</p>
                                <p className='xl:mt-2 lg:mt-1 mt-0 text-slate-500 lg:text-base md:text-md text-sm xl:leading-5 lg:leading-5 leading-5 md:block hidden'>{data.about}</p>
                                <h1 className="lg:mt-4 md:mt-2 mt-auto text-slate-600">
                                    <p className='lg:text-md text-sm -mt-1 ' >{data.city}, {data.state}, {data.PIN}</p>
                                    <p className='lg:text-md text-sm -mt-1 ' >Emergency - {data.contact.emergency}</p>
                                    <p className='lg:text-md text-sm -mt-1 ' >Appointments - {data.contact.appointments}</p>
                                </h1>
                            </div>
                        </div>
                        <div className="aboutOnMobile md:hidden block mt-2">
                            <p className='xl:mt-2 lg:mt-1 mt-0 text-slate-500 lg:text-md text-sm xl:leading-5 leading-4'>{data.about}</p>
                        </div>
                    </div>
                    <div className="content">
                        <div className="kind flex md:gap-5 gap-3  xl:px-6 md:px-4 px-0 w-full tab:justify-center justify-between">
                            <button
                                className={`px-3 md:w-64 tab:w-60 w-1/2  lg:text-2xl md:text-xl text-lg py-0 mb-1 rounded-md ${selected === 1 ? 'bg-slate-200 text-teal-600  border-none rounded-ss-md rounded-se-md rounded-none mb-[0px]' : 'bg-teal-400 text-slate-100'
                                    } border-[1px] border-teal-600`}
                                onClick={() => setSelected(1)}
                            >
                                Admit Patient
                            </button>
                            <button
                                className={`px-3 md:w-64 tab:w-60 w-1/2 lg:text-2xl md:text-xl text-lg pb-1 mb-1  rounded-md ${selected === 2 ? 'bg-slate-200 text-teal-600  border-none rounded-ss-md rounded-se-md rounded-none mb-[0px]' : 'bg-teal-400 text-slate-100'
                                    } border-[1px] border-teal-600`}
                                onClick={() => setSelected(2)}
                            >
                                Have an operation
                            </button>
                        </div>

                        {selected === 1 ? (
                            <div className="admit w-full mt-0 flex flex-col items-center bg-slate-200">
                                <div className="wards flex flex-col my-5 w-[100%] ps-5 ">
                                    <label className='w-full float-start text-slate-700' htmlFor="">Select a ward:</label>

                                    <ul className="blocks w-full flex p-0 justify-start xl:gap-5 lg:gap-4 md:gap-3 gap-2 flex-nowrap overflow-x-scroll" style={{ scrollbarWidth: 'none' }}>
                                        {data.wards.map((item: WardList, i) => (
                                            <WardCard
                                                item={item}
                                                key={i}
                                                keyvalue={i}
                                                ward={patient.Ward}
                                                setpatient={setPatient}
                                                setoperation={setOperation}
                                                type='admit'
                                            />
                                        ))}
                                    </ul>
                                </div>
                                <div className="questions px-6 flex flex-wrap gap-2 w-full md:mt-0 mt-3">
                                    <div className="relative mb-1 lg:w-2/5 md:w-2/5 sm:w-2/5 w-full">
                                        <input
                                            type="number"
                                            id="days"
                                            placeholder=""
                                            className="peer w-full pt-1 px-1 py-[0.5px] focus:outline-none border-[1px] bg-slate-200 border-teal-600 text-slate-700 "
                                            value={patient.Days || ''}
                                            onChange={(e) =>
                                                setPatient((prev) => ({ ...prev, Days: Number(e.target.value) }))
                                            }
                                            min={1}
                                        />
                                        <label
                                            htmlFor="days"
                                            className="absolute left-2 top-[-8px] bg-slate-200 text-[10px] text-teal-600 "
                                        >
                                            Days to admit - leave empty if not sure
                                        </label>
                                    </div>

                                    <div className="relative mb-1 md:w-2/5 sm:w-2/5 w-full">
                                        <input
                                            type="number"
                                            id="age"
                                            placeholder=""
                                            className="peer w-full pt-1 px-1 py-[0.5px] focus:outline-none border-[1px] bg-slate-200 border-teal-600 text-slate-700 "
                                            value={patient.Age || ''}
                                            onChange={(e) => {
                                                setPatient((prev) => ({ ...prev, Age: Number(e.target.value) }));
                                                if (errorIndex === 4) setErrorIndex(-1);
                                            }}
                                            step={0.1}
                                            min={0.1}
                                        />
                                        <label
                                            htmlFor="age"
                                            className="absolute left-2 top-[-8px] bg-slate-200 text-[10px] text-teal-600 "
                                        >
                                            {
                                                errorIndex === 4 ? (
                                                    <p className="text-red-500">required</p>
                                                ) : (
                                                    errorIndex === 5 ? <p className="text-red-500">invalid</p> : <p>Age of the patient</p>
                                                )
                                            }
                                        </label>
                                    </div>

                                    <div className="relative mb-1 w-full">
                                        <input
                                            type="text"
                                            id="requirements"
                                            placeholder=" "
                                            className="peer w-full pt-1 px-1 py-[0.5px] focus:outline-none border-[1px] bg-slate-200 border-teal-600 text-slate-700 "
                                            value={patient.Requirements}
                                            onChange={(e) =>
                                                setPatient((prev) => ({ ...prev, Requirements: e.target.value }))
                                            }
                                        />
                                        <label
                                            htmlFor="requirements"
                                            className="absolute left-2 top-[-8px] bg-slate-200 text-[10px] text-teal-600 "
                                        >
                                            Any other requirement or any issue
                                        </label>
                                    </div>


                                </div>

                                <div className="total w-full xl:px-6 lg:px-5 md:px-3  px-1 flex justify-between mx-6">
                                    <button className="bg-teal-400 relative text-white totalbutton rounded-md font-semibold lg:text-xl md:text-lg text-md w-fit h-fit mt-auto mb-2 px-3">
                                        Total : ₹1277/-
                                        <ul className="min-w-fit billpop bg-white z-10 border-2 text-md w-[300px] absolute rounded-md px-2 py-1 text-sm text-left font-light">
                                            <li className="w-full text-black">
                                                Ward : <span className="float-right text-teal-600">{patient.Ward.name}</span>
                                            </li>
                                            <li className="w-full text-black">
                                                Admission charges : <span className="float-right text-teal-600">₹{data.admissionCharges}</span>
                                            </li>
                                            <li className="w-full text-black">
                                                Ward charge(per day) :{' '}
                                                <span className="float-right text-teal-600">₹{patient.Ward.charge}</span>
                                            </li>
                                        </ul>
                                    </button>
                                    <button
                                        onClick={handlePatient}
                                        className="bg-teal-400 text-white rounded-md font-semibold lg:text-2xl md:text-xl text-lg w-1/4 mt-5 mb-2 px-1"
                                    >
                                        Proceed
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="operation mt-0 xl:px-6 lg:px-5 md:px-4 sm:px-3 px-2 bg-slate-200">
                                <div className="operationss w-full py-3 flex flex-col xl:px-5 lg:px-4 md:px-3 sm:px-2 px-1 gap-3 bg-slate-200">
                                    <div className="relative mb-1">
                                        {errorIndex === 2 && (
                                            <label
                                                htmlFor="operation"
                                                className="absolute left-2 top-0 text-[10px] text-red-500 "
                                            >
                                                this column is required
                                            </label>
                                        )}
                                        <input
                                            type="text"
                                            id="operation"
                                            className="focus:outline-none text-teal-500 bg-white w-full rounded-md px-2 py-[0.5px] pt-1 llg:text-lg md:text-base text-md "
                                            placeholder="search for operations"
                                            value={operationInput}
                                            onChange={(e) => {
                                                setOperationInput(e.target.value);
                                                if (errorIndex === 2) setErrorIndex(-1);
                                            }}
                                        />
                                    </div>

                                    <div
                                        className="operationslist flex flex-row lg:gap-4 md:gap-2 gap-1 flex-wrap justify-evenly max-h-28 overflow-y-scroll"
                                        style={{ scrollbarWidth: 'none' }}
                                    >
                                        {data.operations.map((item: OperationList, i) =>
                                            item.name.toLowerCase().includes(operationInput) ? (
                                                <OperationCard
                                                    item={item}
                                                    setoperation={setOperation}
                                                    operation={operation}
                                                    key={i}
                                                />
                                            ) : null
                                        )}
                                    </div>
                                </div>

                                <div className="wards ">
                                    <label className='text-slate-700' htmlFor="">Select a ward:</label>
                                    <ul className="blocks w-full flex p-0 justify-start xl:gap-5 lg:gap-4 md:gap-3 gap-2 flex-nowrap overflow-x-scroll" style={{ scrollbarWidth: 'none' }}>

                                        {data.wards.map((item: WardList, i) => (
                                            <WardCard
                                                item={item}
                                                key={i}
                                                keyvalue={i}
                                                ward={operation.Ward}
                                                setpatient={setPatient}
                                                setoperation={setOperation}
                                                type='operation'
                                            />
                                        ))}
                                    </ul>

                                </div>
                                <div className="questions w-full flex flex-col gap-2 mt-3">
                                    <p className="flex sm:flex-row flex-col sm:gap-3 gap-1 text-slate-700">
                                        <label>Do the Patient have diabetes ?</label>
                                        <div className="buttons flex gap-2">
                                            <button
                                                className={`${operation.diabetes === 1 ? 'bg-teal-400 text-white' : 'bg-white text-teal-600'
                                                    } w-20 px-2 py-0 rounded-md text-md`}
                                                onClick={() => setOperation((prev) => ({ ...prev, diabetes: 1 }))}
                                            >
                                                Yes
                                            </button>
                                            <button
                                                className={`${operation.diabetes === 0 ? 'bg-teal-400 text-white' : 'bg-white text-teal-600'
                                                    } w-20 px-2 py-0 rounded-md text-md`}
                                                onClick={() => setOperation((prev) => ({ ...prev, diabetes: 0 }))}
                                            >
                                                No
                                            </button>
                                        </div>
                                    </p>
                                    <p className="flex sm:flex-row flex-col sm:gap-3 gap-1 text-slate-700">
                                        <label>Do the Patient have taken treatment before ?</label>
                                        <div className="buttons flex gap-2">
                                            <button
                                                className={`${operation.treatment === 1 ? 'bg-teal-400 text-white' : 'bg-white text-teal-600'
                                                    } w-20 px-2 py-0 rounded-md text-md`}
                                                onClick={() => setOperation((prev) => ({ ...prev, treatment: 1 }))}
                                            >
                                                Yes
                                            </button>
                                            <button
                                                className={`${operation.treatment === 0 ? 'bg-teal-400 text-white' : 'bg-white text-teal-600'
                                                    } w-20 px-2 py-0 rounded-md text-md`}
                                                onClick={() => setOperation((prev) => ({ ...prev, treatment: 0 }))}
                                            >
                                                No
                                            </button>
                                        </div>
                                    </p>
                                    <div className="relative mb-1 md:w-1/3 sm:w-2/4 w-full">
                                        <input
                                            type="number"
                                            id="age"
                                            placeholder=" "
                                            className="peer w-full pt-1 px-1 py-[0.5px] focus:outline-none border-[1px] bg-slate-200 border-teal-600 text-slate-700 "
                                            value={operation.Age || ''}
                                            onChange={(e) => {
                                                setOperation((prev) => ({
                                                    ...prev,
                                                    Age: e.target.value ? Number(e.target.value) : undefined,
                                                }));
                                                if (errorIndex === 3) setErrorIndex(-1);
                                            }}
                                            min={0.1}
                                            max={100}
                                            step={0.1}
                                        />
                                        <label
                                            htmlFor="age"
                                            className="absolute left-2 top-[-8px] bg-slate-200 text-[10px] text-teal-600 "
                                        >
                                            {errorIndex === 3 ? (
                                                <p className="text-red-500">required</p>
                                            ) : (
                                                errorIndex === 6 ? <p className="text-red-500">invalid</p> : <p>Age of the patient</p>
                                            )
                                            }
                                        </label>
                                    </div>

                                    <div className="relative mb-1 w-full">
                                        <input
                                            type="text"
                                            id="allergy"
                                            placeholder=" "
                                            className="peer w-full pt-1 px-1 py-[0.5px] focus:outline-none border-[1px] bg-slate-200 border-teal-600 text-slate-700 "
                                            value={operation.Allergy}
                                            onChange={(e) =>
                                                setOperation((prev) => ({ ...prev, Allergy: e.target.value }))
                                            }
                                        />
                                        <label
                                            htmlFor="allergy"
                                            className="absolute left-2 top-[-8px] bg-slate-200 text-[10px] text-teal-600 "
                                        >
                                            Any Allergy - if Yes, type name
                                        </label>
                                    </div>

                                    <div className="relative mb-1 w-full">
                                        <input
                                            type="text"
                                            id="requirements"
                                            placeholder=" "
                                            className="peer w-full pt-1 px-1 py-[0.5px] focus:outline-none border-[1px] bg-slate-200 border-teal-600 text-slate-700 "
                                            value={operation.Requirements}
                                            onChange={(e) =>
                                                setOperation((prev) => ({ ...prev, Requirements: e.target.value }))
                                            }
                                        />
                                        <label
                                            htmlFor="requirements"
                                            className="absolute left-2 top-[-8px] bg-slate-200 text-[10px] text-teal-600 "
                                        >
                                            Any other requirements
                                        </label>
                                    </div>
                                </div>

                                <div className="total flex justify-between xl:mx-6 lg:mx-5 md:mx-4 sm:mx-3 mx-1">
                                    <button className="bg-teal-400 relative text-white totalbutton rounded-md font-semibold lg:text-xl md:text-lg text-md w-fit h-fit mt-auto mb-2 px-3">
                                        Total : ₹1277/-
                                        <ul className="min-w-fit billpop bg-white z-10 border-2 text-md w-[300px] absolute rounded-md px-2 py-1 text-sm text-left font-light">
                                            <li className="w-full text-black">
                                                Operation :{' '}
                                                <span className="float-right text-teal-600">
                                                    {operation.Operation.toString()}
                                                </span>
                                            </li>
                                            <li className="w-full text-black">
                                                Operation charge :{' '}
                                                <span className="float-right text-teal-600">
                                                    ₹{operation.operationdata?.operationCharges}
                                                </span>
                                            </li>
                                            <li className="w-full text-black">
                                                Admission charge :{' '}
                                                <span className="float-right text-teal-600">₹1800</span>
                                            </li>
                                        </ul>
                                    </button>
                                    <button
                                        onClick={handleOperation}
                                        className="bg-teal-400 text-white rounded-md font-semibold lg:text-2xl md:text-xl text-lg w-1/4 mt-5 mb-2 px-1"
                                    >
                                        Proceed
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default HospitalCard2;


function ListCard({ data, setPopup, popup }: { data: hospitalInterface, setPopup: Dispatch<SetStateAction<boolean>>, popup: boolean }) {
    return (
        <div className={`liscard flex flex-col ${popup ? "cursor-not-allowed" : ""}`}>
            <div className="beforecard flex ">
                <Image src={Aretemis} className='xl:w-72 xl:h-64 lg:w-64 lg:h-56 md:w-56 md:h-52 sm:w-32 sm:h-28 w-28 h-24 p-2' alt="image" />
                <div className="info text-slate-700 py-2 px-2 bg-white flex-1">
                    <span className="flex justify-start gap-4 place-content-center place-items-center">
                        {/* <h1
                        className="text-lg font-bold cursor-pointer hover:text-teal-500 focus:underline"
                        onClick={() => setPopup(true)}
                    >
                        {data.name.slice(0, 15)}..
                    </h1> */}
                        <h1 onClick={() => setPopup(true)} className='lg:text-xl md:text-lg text-base font-bold cursor-pointer text-teal-500 focus:underline '>
                            {
                                data.name.length > 15 ? <>{data.name.slice(0, 15)}...</> : data.name
                            }
                        </h1>
                        <h1 className='sm:text-base text-sm'>{data.rating} ratings</h1>
                    </span>
                    <h1 className="text-sm text-slate-600 lg:mt-2 md:mt-1 mt-0">
                        <p>{data.city}, {data.state}, {data.PIN}</p>
                        <p className='sm:text-[13px] text-[12px] sm:m-0 -mt-1' >Emergency : {data.contact.emergency}</p>
                        <p className='sm:text-[13px] text-[12px] sm:m-0 -mt-1' >Appointment : {data.contact.appointments}</p>
                    </h1>
                    <p className='text-slate-600 md:block hidden xl:text-base lg:text-md text-sm mt-4 break-all'>{data.about}</p>
                </div>
            </div>
            <div className="responseivehelper md:hidden block p-2 pt-0 text-slate-500 max-h-16 overflow-y-scroll" style={{ scrollbarWidth: 'none' }}>
                <p className=' w-full text-sm'>{data.about}</p>
            </div>
        </div>
    )
}