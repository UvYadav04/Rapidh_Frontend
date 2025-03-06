'use client';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
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

export interface OperationList {
    name: string;
    operationCharges: number;
    bedCharges: number;
}

export interface WardList {
    name: string;
    charge: number;
    description: string;
}

export interface hospitalInterface {
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
    Ward: number;
    Days: number | undefined;
    Age: number | undefined;
    Requirements: string;
}

export interface OperationInterface {
    Operation: boolean;
    operationdata: OperationList | null;
    Age: number | undefined;
    Requirements: string;
    diabetes: number;
    treatment: number;
    Allergy: string;
}

function HospitalCard2({ data }: { data: hospitalInterface }) {

    const [popup, setPopup] = useState<boolean>(false);
    const [selected, setSelected] = useState<number>(1);
    const [operationInput, setOperationInput] = useState<string>('');
    const [patient, setPatient] = useState<patientInterface>({
        Admit: true,
        Ward: 0,
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
        treatment: 0,
        Allergy: '',
    });
    const [errorIndex, setErrorIndex] = useState<number>(-1);

    const router = useRouter();
    const { profile } = useSelector((state: RootState) => state.user);
    const { loginStatus, setLoginStatus } = useAuth();
    const { error, role, loading } = useSelector((state: RootState) => state.role);

    const dispatch = useDispatch<AppDispatch>();

    const handleOperation = () => {
        if (profile.id === '') {
            return setLoginStatus(1);
        }

        if (operation.operationdata === null) return setErrorIndex(2);
        if (operation.Age === undefined) return setErrorIndex(3);

        const operationData = btoa(JSON.stringify(operation));
        const hospitalData = btoa(JSON.stringify(data));
        router.push(`Hospitals/Booking?user=${profile.id}&patient=${operationData}&hospital=${hospitalData}`);
    };

    const handlePatient = () => {
        if (profile.id === '') {
            return setLoginStatus(1);
        }

        if (patient.Age === undefined) return setErrorIndex(4);

        const patientData = btoa(JSON.stringify(patient));
        const hospitalData = btoa(JSON.stringify(data));
        router.push(`Hospitals/Booking?user=${profile.id}&patient=${patientData}&hospital=${hospitalData}`);
    };

    const editHospital = (hospitalDataObj: any) => {
        const hospitalData = btoa(JSON.stringify(hospitalDataObj));
        router.replace(`/RapidHostpital/addNewHospital?hospital=${hospitalData}`);
    };

    useEffect(() => {
        if (!loading) {
            if (Object.keys(error).length > 0) {
                redirect('/RapidHostpital/ErrorOccured');
            }
            else if (!role) {
                dispatch(fetchrole());
            }
        }
    }, [role, loading, error, dispatch]);

    if (loading) return <LoginLoader />;

    return (
        <div className="Card2 w-[100%] flex flex-row bg-white">

            <ListCard data={data} setPopup={setPopup} />

            {popup ? (
                <div
                    className="popup flex flex-col gap-5 min-w-[80%] max-w-[80%] max-h-[80%] min-h-[80%] overflow-y-scroll fixed top-[10%] left-[10%] bg-white px-2 py-2 pt-10"
                    style={{ scrollbarWidth: 'none' }}
                >
                    <h1
                        className="right-2 absolute top-8 cursor-pointer w-fit px-2 rounded-lg bg-teal-400 text-white"
                        onClick={() => setPopup(false)}
                    >
                        cancel
                    </h1>
                    <div className="intro flex flex-row justify-center text-black">
                        <div className="image w-1/4">
                            <Image src={Aretemis} alt="hospital image" />
                        </div>
                        <div className="About flex flex-col justify-start gap-0 w-3/4 px-2 pt-2">
                            <h1 className="text-4xl text-teal-500 font-semibold flex justify-start items-center gap-5">
                                {data.name}
                                {
                                    role === "admin" ? <button onClick={() => editHospital(data)} className="bg-teal-500 text-white text-sm px-2 my-auto">
                                        Edit
                                    </button> : null
                                }
                            </h1>
                            <p className='mt-0'>{data.rating} ratings</p>
                            <p className='mt-2'>{data.about}</p>
                            <h1 className="mt-auto">
                                <p>Emergency Contact no. - {data.contact.emergency}</p>
                                <p>For Appointments - {data.contact.appointments}</p>
                            </h1>
                        </div>
                    </div>
                    <div className="content">
                        <div className="kind flex gap-5 px-6 w-full justify-center">
                            <button
                                className={`w-1/3 text-2xl pb-1 mb-[0px]  rounded-md ${selected === 1 ? 'bg-slate-200 text-teal-600  border-none rounded-ss-md rounded-se-md rounded-none mb-[0px]' : 'bg-teal-400 text-slate-100'
                                    } border-[1px] border-teal-600`}
                                onClick={() => setSelected(1)}
                            >
                                Admit Patient
                            </button>
                            <button
                                className={`w-1/3 text-2xl pb-1 mb-[0px]  rounded-md ${selected === 2 ? 'bg-slate-200 text-teal-600  border-none rounded-ss-md rounded-se-md rounded-none mb-[0px]' : 'bg-teal-400 text-slate-100'
                                    } border-[1px] border-teal-600`}
                                onClick={() => setSelected(2)}
                            >
                                Have an operation
                            </button>
                        </div>

                        {selected === 1 ? (
                            <div className="admit w-full mt-0 flex flex-col items-center bg-slate-200">
                                <ul className="blocks w-full flex p-0 justify-start gap-5">
                                    {data.wards.map((item: WardList, i) => (
                                        <WardCard
                                            item={item}
                                            key={i}
                                            keyvalue={i}
                                            index={i}
                                            ward={patient.Ward}
                                            setpatient={setPatient}
                                        />
                                    ))}
                                </ul>
                                <div className="questions px-6 flex flex-wrap gap-2 w-full">
                                    <div className="relative mb-1 w-2/5">
                                        <input
                                            type="number"
                                            id="days"
                                            placeholder=" "
                                            className="peer w-full pt-1 px-1 py-[0.5px] focus:outline-none border-[1px] bg-slate-200 border-teal-600 text-slate-700 z-40"
                                            value={patient.Days}
                                            onChange={(e) =>
                                                setPatient((prev) => ({ ...prev, Days: Number(e.target.value) }))
                                            }
                                        />
                                        <label
                                            htmlFor="days"
                                            className="absolute left-2 top-[-8px] bg-slate-200 text-[10px] text-teal-600 z-0"
                                        >
                                            How many days you need to admit - leave empty if you are not sure
                                        </label>
                                    </div>

                                    <div className="relative mb-1 w-2/5">
                                        <input
                                            type="number"
                                            id="age"
                                            placeholder=" "
                                            className="peer w-full pt-1 px-1 py-[0.5px] focus:outline-none border-[1px] bg-slate-200 border-teal-600 text-slate-700 z-40"
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
                                            className="absolute left-2 top-[-8px] bg-slate-200 text-[10px] text-teal-600 z-0"
                                        >
                                            {errorIndex === 4 ? (
                                                <p className="text-red-500">required</p>
                                            ) : (
                                                <p>Age of the patient</p>
                                            )}
                                        </label>
                                    </div>

                                    <div className="relative mb-1 w-full">
                                        <input
                                            type="text"
                                            id="requirements"
                                            placeholder=" "
                                            className="peer w-full pt-1 px-1 py-[0.5px] focus:outline-none border-[1px] bg-slate-200 border-teal-600 text-slate-700 z-40"
                                            value={patient.Requirements}
                                            onChange={(e) =>
                                                setPatient((prev) => ({ ...prev, Requirements: e.target.value }))
                                            }
                                        />
                                        <label
                                            htmlFor="requirements"
                                            className="absolute left-2 top-[-8px] bg-slate-200 text-[10px] text-teal-600 z-0"
                                        >
                                            Any other requirement or any issue
                                        </label>
                                    </div>


                                </div>

                                <div className="total w-full px-6 flex justify-between mx-6">
                                    <button className="bg-teal-400 relative text-white totalbutton rounded-md font-semibold text-xl w-fit h-fit mt-auto mb-2 px-3">
                                        Total : ₹1277/-
                                        <ul className="min-w-fit billpop bg-white z-10 border-2 text-md w-[300px] absolute rounded-md px-2 py-1 text-sm text-left font-light">
                                            <li className="w-full text-black">
                                                Ward : <span className="float-right text-teal-600">{data.wards[patient.Ward].name}</span>
                                            </li>
                                            <li className="w-full text-black">
                                                Admission charges : <span className="float-right text-teal-600">₹{data.admissionCharges}</span>
                                            </li>
                                            <li className="w-full text-black">
                                                Ward charge(per day) :{' '}
                                                <span className="float-right text-teal-600">₹{data.wards[patient.Ward].charge}</span>
                                            </li>
                                        </ul>
                                    </button>
                                    <button
                                        onClick={handlePatient}
                                        className="bg-teal-400 text-white rounded-md font-semibold text-2xl w-1/4 mt-5 mb-2"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="operation mt-0 px-6 bg-slate-200">
                                <div className="operationss w-full py-3 flex flex-col px-5 gap-3 bg-slate-200">
                                    <div className="relative mb-1">
                                        {errorIndex === 2 && (
                                            <label
                                                htmlFor="operation"
                                                className="absolute left-2 top-0 text-[10px] text-red-500 z-0"
                                            >
                                                this column is required
                                            </label>
                                        )}
                                        <input
                                            type="text"
                                            id="operation"
                                            className="focus:outline-none text-teal-500 bg-white w-full rounded-md px-2 py-[0.5px] pt-1 text-lg z-40"
                                            placeholder="search for operations"
                                            value={operationInput}
                                            onChange={(e) => {
                                                setOperationInput(e.target.value);
                                                if (errorIndex === 2) setErrorIndex(-1);
                                            }}
                                        />
                                    </div>

                                    <div
                                        className="operationslist flex flex-row gap-4 flex-wrap justify-evenly max-h-28 overflow-y-scroll"
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

                                <div className="questions w-full flex flex-col gap-2 mt-3">
                                    <p className="flex gap-3 text-slate-700">
                                        <label>Do the Patient have diabetes ?</label>
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
                                    </p>
                                    <p className="flex gap-3 text-slate-700">
                                        <label>Do the Patient have taken treatment before ?</label>
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
                                    </p>
                                    <div className="relative mb-1 w-1/3">
                                        <input
                                            type="number"
                                            id="age"
                                            placeholder=" "
                                            className="peer w-full pt-1 px-1 py-[0.5px] focus:outline-none border-[1px] bg-slate-200 border-teal-600 text-slate-700 z-40"
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
                                            className="absolute left-2 top-[-8px] bg-slate-200 text-[10px] text-teal-600 z-0"
                                        >
                                            {errorIndex === 3 ? (
                                                <p className="text-red-500">required</p>
                                            ) : (
                                                <p>Age of the patient</p>
                                            )}
                                        </label>
                                    </div>

                                    <div className="relative mb-1 w-full">
                                        <input
                                            type="text"
                                            id="allergy"
                                            placeholder=" "
                                            className="peer w-full pt-1 px-1 py-[0.5px] focus:outline-none border-[1px] bg-slate-200 border-teal-600 text-slate-700 z-40"
                                            value={operation.Allergy}
                                            onChange={(e) =>
                                                setOperation((prev) => ({ ...prev, Allergy: e.target.value }))
                                            }
                                        />
                                        <label
                                            htmlFor="allergy"
                                            className="absolute left-2 top-[-8px] bg-slate-200 text-[10px] text-teal-600 z-0"
                                        >
                                            Any Allergy - if Yes, type name
                                        </label>
                                    </div>

                                    <div className="relative mb-1 w-full">
                                        <input
                                            type="text"
                                            id="requirements"
                                            placeholder=" "
                                            className="peer w-full pt-1 px-1 py-[0.5px] focus:outline-none border-[1px] bg-slate-200 border-teal-600 text-slate-700 z-40"
                                            value={operation.Requirements}
                                            onChange={(e) =>
                                                setOperation((prev) => ({ ...prev, Requirements: e.target.value }))
                                            }
                                        />
                                        <label
                                            htmlFor="requirements"
                                            className="absolute left-2 top-[-8px] bg-slate-200 text-[10px] text-teal-600 z-0"
                                        >
                                            Any other requirements
                                        </label>
                                    </div>
                                </div>

                                <div className="total flex justify-between mx-6">
                                    <button className="bg-teal-400 relative text-white totalbutton rounded-md font-semibold text-xl w-fit h-fit mt-auto mb-2 px-3">
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
                                        className="bg-teal-400 text-white rounded-md font-semibold text-2xl w-1/4 mt-5 mb-2"
                                    >
                                        Book Now
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


function ListCard({ data, setPopup }: { data: hospitalInterface, setPopup: Dispatch<SetStateAction<boolean>> }) {
    return (
        <>
            <Image src={Aretemis} className='w-1/6 p-2' alt="image" />
            <div className="info text-slate-700 py-2 px-2 bg-white flex-1">
                <span className="flex justify-start gap-4 place-content-center place-items-center">
                    {/* <h1
                        className="text-lg font-bold cursor-pointer hover:text-teal-500 focus:underline"
                        onClick={() => setPopup(true)}
                    >
                        {data.name.slice(0, 15)}..
                    </h1> */}
                    <h1 onClick={() => setPopup(true)} className='text-xl font-bold cursor-pointer hover:text-teal-500 focus:underline'>{data.name}</h1>
                    <h1>{data.rating} ratings</h1>
                </span>
                <h1 className="text-sm text-slate-600 mt-2">
                    <p>{data.city}, {data.state}, {data.PIN}</p>
                    <p>Emergency : {data.contact.emergency}</p>
                    <p>Appointment : {data.contact.appointments}</p>
                </h1>
                <p className='text-slate-600 mt-4'>{data.about}</p>
            </div>
        </>
    )
}