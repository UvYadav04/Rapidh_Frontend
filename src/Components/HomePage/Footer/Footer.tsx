import React from 'react'
import Link from 'next/link'
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

function Footer() {
    return (
        <div className=" w-full">
            <footer className="text-center text-white " style={{ background: `linear-gradient(to right,rgb(74, 194, 176),rgb(35, 172, 155),rgb(74, 194, 176)` }}>
                <div className="container mx-auto">
                    <section className="mt-5">
                        <div className="flex justify-center space-x-10 pt-5">
                            <div className="w-1/5">
                                <h6 className="text-uppercase font-bold">
                                    <a href="#!" className="text-white">About us</a>
                                </h6>
                            </div>
                            <div className="w-1/5">
                                <h6 className="text-uppercase font-bold">
                                    <a href="#!" className="text-white">Products</a>
                                </h6>
                            </div>
                            <div className="w-1/5">
                                <h6 className="text-uppercase font-bold">
                                    <a href="#!" className="text-white">Awards</a>
                                </h6>
                            </div>
                            <div className="w-1/5">
                                <h6 className="text-uppercase font-bold">
                                    <a href="#!" className="text-white">Help</a>
                                </h6>
                            </div>
                            <div className="w-1/5">
                                <h6 className="text-uppercase font-bold">
                                    <a href="#!" className="text-white">Contact</a>
                                </h6>
                            </div>
                        </div>
                    </section>

                    <hr className="my-5" />

                    <section className="mb-5">
                        <div className="flex justify-center">
                            <div className="lg:w-2/3">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                                    distinctio earum repellat quaerat voluptatibus placeat nam,
                                    commodi optio pariatur est quia magnam eum harum corrupti
                                    dicta, aliquam sequi voluptate quas.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="text-center mb-5 flex place-content-center gap-10">
                        <a href="" className="text-white mr-4">
                            <FaFacebook size={30} />
                        </a>
                        <a href="" className="text-white mr-4">
                            <FaInstagram size={30} />
                        </a>
                        <a href="" className="text-white mr-4">
                            <FaGoogle size={30} />
                        </a>
                        <a href="" className="text-white mr-4">
                            <FaLinkedinIn size={30} />
                        </a>
                        <a href="" className="text-white mr-4">
                            <FaXTwitter size={30} />
                        </a>
                        <a href="" className="text-white mr-4">
                            <FaGithub size={30} />
                        </a>
                    </section>
                </div>

                <div className="text-center p-3 bg-gray-700 bg-opacity-20">
                    © 2020 Copyright:
                    <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
                </div>
            </footer>
        </div >

    )
}

export default Footer
