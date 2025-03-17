'use client'
import React from "react";
import { motion } from "framer-motion";

const Notification = ({ status }: { status: string }) => {
    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-5 md:left-[45%] left:[40%] transform -translate-x-1/2 p-4 rounded-lg shadow-lg text-white text-lg font-semibold 
        ${status === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
            {status === "success" ? "Booking Successful" : "Booking Rejected"}
        </motion.div>
    );
};

export default Notification;
