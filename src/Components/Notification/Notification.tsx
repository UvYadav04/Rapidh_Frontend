'use client'
import React from "react";
import { motion } from "framer-motion";

const Notification = ({ status }: { status: string }) => {
    return (
        // <div className="w-full h-fit flex fixe  justify-center place-content-center place-items-center">
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed transform -translate-x-1/2 md:p-4 p-2 top-0 xl:left-[45%] lg:left-[40%] z-[50] rounded-lg shadow-lg text-white text-lg font-semibold 
        ${status === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
            {status === "success" ? "Booking Successful" : "Booking Rejected"}
        </motion.div>
        // </div>
    );
};

export default Notification;
