import React from "react";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

export default function ToastError({message}){
    return(
        <motion.div
            initial = {{opacity: 0, x: 80}}
            animate = {{opacity: 1, x: 0}}
            transition={{duration: 0.2}}
            className="bg-white shadow-[0_0_30px_rgba(255,0,0,0.5)] border border-red-500 rounded-lg z-50 px-5  flex items-center justify-center gap-2 text-center absolute bottom-10 right-5  h-12 "
        >
            <XCircle className="h-8 w-8 " fill="red" stroke="white"/>
            <p className="text-xl text-red-700 font-bold">{message}</p>

        </motion.div>
    )
}