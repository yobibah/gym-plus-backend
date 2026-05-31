import React from "react";
import { motion } from "framer-motion";


export default function ModalLogout({reject, confirm, children, question}){
    return(
        <div className="absolute inset-0 bg-black/50 backdrop-blur flex z-50 items-center justify-center">
            <motion.div
                initial={{opacity:0, scale:0.75}}
                animate={{opacity:1, scale:1.15}}
                transition={{duration:0.4}}
                className="bg-white/90 flex flex-col items-center justify-center gap-2 px-4 h-55 rounded-xl"
            >
                <h1 className="font-bold text-xl">{question}</h1>
                <div className=" flex flex-col items-center text-gray-500">
                    {children}
                </div>
                <div className="flex items-center border-t mt-5 w-full border-gray-300 justify-between">
                    <motion.button
                        whileTap={{scale:0.95}}
                        onClick={reject}
                        className="border-r border-gray-300 w-full py-2 font-semibold"

                    >Non
                    </motion.button>
                    <motion.button
                        whileTap={{scale:0.95}}
                        onClick={confirm}
                        className=" w-full py-2  text-red-500 font-semibold "
                    >
                        Oui
                    </motion.button>
                </div>
            </motion.div>
        </div>
    )
}