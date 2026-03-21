import React from "react";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

export default function ToastError({message, title}){
    return(
        <motion.div
            initial = {{opacity: 0, x: 100}}
            animate = {{opacity: 1, x: 0}}
            transition={{duration: 0.4}}
            className="shadow-lg p-4 2xl:w-100 xl:w-100 md:w-100 w-50 bg-orange-100  z-50  flex flex-col gap-2 absolute bottom-10 right-5 "
        >
            <p className="2xl:text-xl xl:text-xl md:text-xl text-sm text-red-500 font-bold">{title}</p>
            <p className="text-gray-700 flex 2xl:text-base xl:text-base md:text-base text-xs items-center">
                    {message}
                </p>

        </motion.div>
    )
}