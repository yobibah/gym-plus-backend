import React from "react";
import Button from "./button";
import { motion } from "framer-motion";


export default function CardTarif({title, text1,
    onClick, classNameButton, className, popular, iconButon, text3, titleButton, icon4, icon5,disabled,
    text4, icon2, icon3,text5,text6,text7,textClass,titleClass, popClass, text8, text9, text10,icon8, icon7, icon6, text, icon,}){
    return <div className={className}>
            <div className={popClass}>{popular}</div>
            <div>
                <p className={titleClass}>{title}</p>
                <p className={textClass}>{text}</p>
            </div>
            <div className="mb-5">
                <p >{text1}</p>
            </div>
            <div>
                <div  className=" mb-4 flex items-center justify-left gap-2">
                    {icon}
                    {text3}
                </div>
                <div className="mb-4 flex items-center justify-left gap-2">
                    {icon2}
                    {text4}
                </div>
                <div className="mb-4 flex items-center justify-left gap-2">
                    {icon3}
                    {text5}
                </div>
                <div className="mb-4 flex items-center justify-left gap-2">
                    {icon4}
                    {text6}
                </div>
                <div className="mb-4 flex items-center justify-left gap-2">
                    {icon5}
                    {text7}
                </div>
                <div className="mb-4 flex items-center justify-left gap-2">
                    {icon6}
                    {text8}
                </div>
                <div className="mb-4 flex items-center justify-left gap-2">
                    {icon7}
                    {text9}
                </div>
                <div className="flex items-center justify-left gap-2">
                    {icon8}
                    {text10}
                </div>
            </div>
            <motion.div
                className="mt-5"
                whileTap={{scale: 0.95}}
                whileHover={{scale: 1.05}}
            >
                <button
                    disabled={disabled}
                    onClick={onClick}
                    className={classNameButton}
                
                >
                    {iconButon} {titleButton}
                </button>
            </motion.div>
        </div>
}