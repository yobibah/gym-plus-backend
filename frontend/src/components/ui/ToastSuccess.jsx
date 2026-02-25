import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function ToastSuccess({message, title}){
    return(
        <motion.div
            initial = {{opacity: 0, x: 100}}
            animate = {{opacity: 1, x: 0}}
            transition={{duration: 0.4}}
            className="shadow-lg p-4 w-100 bg-orange-100  z-50  flex flex-col gap-2 absolute bottom-10 right-5 "
        >
            <p className="text-xl text-green-500 font-bold">{title}</p>
            <p className="text-gray-700 flex items-center">
                    {message}
                </p>

        </motion.div>
    )
}