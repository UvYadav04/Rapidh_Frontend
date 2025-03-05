import React from 'react'
import Link from 'next/link'
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
const Footer = () => {
    return (
        <div className=" lg:pt-16 md:pt-12 pt-6 w-full sm:px-6 px-2 lg:px-8 bg-teal-500 text-white">
            <div className="sm:col-span-2">
                <a
                    href="/"
                    aria-label="Go home"
                    title="Company"
                    className="inline-flex items-center"
                >
                    <svg
                        className="w-8 text-deep-purple-accent-400"
                        viewBox="0 0 24 24"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        stroke="currentColor"
                        fill="none"
                    >
                        <rect x="3" y="1" width="7" height="12" />
                        <rect x="3" y="17" width="7" height="6" />
                        <rect x="14" y="1" width="7" height="6" />
                        <rect x="14" y="11" width="7" height="12" />
                    </svg>
                    <span className="ml-2 text-xl font-bold tracking-wide text-white uppercase">
                        Rapid Hospital
                    </span>
                </a>
                <div className="mt-3 w-full">
                    <p className="text-sm text-slate-200">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus velit quae aspernatur asperiores adipisci.
                    </p>
                    <p className="text-sm md:block hidden text-slate-200">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus velit quae aspernatur asperiores adipisci.
                    </p>

                </div>
            </div>
            <div className='my-5 flex justify-between'>
                <div className="space-y-0 text-sm">
                    <p className="text-base font-bold tracking-wide text-slate-200">
                        Contacts
                    </p>
                    <div className="flex">
                        <p className="mr-1 text-slate-200">Phone:</p>
                        <a
                            href="tel:850-123-5021"
                            aria-label="Our phone"
                            title="Our phone"
                            className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                        >
                            850-123-5021
                        </a>
                    </div>
                    <div className="flex">
                        <p className="mr-1 text-slate-200">Email:</p>
                        <a
                            href="mailto:info@lorem.mail"
                            aria-label="Our email"
                            title="Our email"
                            className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                        >
                            info@lorem.mail
                        </a>
                    </div>
                    <div className="flex">
                        <p className="mr-1 text-slate-200">Address:</p>
                        <a
                            href="https://www.google.com/maps"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Our address"
                            title="Our address"
                            className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                        >
                            312 Lovely Street, NY
                        </a>
                    </div>
                </div>
                <div>
                    <span className="text-base font-bold tracking-wide text-slate-200">
                        Social
                    </span>
                    <div className="flex items-center mt-1 space-x-3">
                        <a
                            href="/"
                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
                        >
                            <FaGithub size={22} color='white' />
                        </a>
                        <a
                            href="/"
                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
                        >
                            <FaXTwitter size={22} color='white' />
                        </a>
                        <a
                            href="/"
                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
                        >
                            <FaInstagram size={22} color='white' />
                        </a>
                        <a
                            href="/"
                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
                        >
                            <FaLinkedinIn size={22} color='white' />
                        </a>
                        <a
                            href="/"
                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
                        >
                            <FaGoogle size={22} color='white' />
                        </a>
                    </div>
                    <p className="mt-4 text-sm text-slate-200 lg:block hidden">
                        Bacon ipsum dolor amet short ribs pig sausage prosciutto chicken
                        spare ribs salami.
                    </p>
                </div>
            </div>
            <div className="flex flex-col-reverse justify-between place-items-center pt-5 pb-2 border-t lg:flex-row">
                <p className="text-sm text-slate-300">
                    © Copyright 2020 Lorem Inc. All rights reserved.
                </p>
                <ul className="flex flex-row gap-4">

                    <li>
                        <a
                            href="/"
                            className="text-sm text-slate-300 transition-colors duration-300 hover:text-deep-purple-accent-400"
                        >
                            Privacy Policy
                        </a>
                    </li>
                    <li>
                        <a
                            href="/"
                            className="text-sm text-slate-300 transition-colors duration-300 hover:text-deep-purple-accent-400"
                        >
                            Terms &amp; Conditions
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Footer