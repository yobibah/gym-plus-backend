import React, {useState} from "react";
import { Link } from "react-router";
import Button from "./ui/button";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function Footer(){

    const [terms, setTerms] = useState(false)
    const [conf, setConf] = useState(false)
    const [icon, setIcon] = useState(false)
    const [iconConf, setIconConf] = useState(false)

    // function handleTerms(){
    //    set
    // }

    const year = new Date().getUTCFullYear()
    

    return(
        <div className="relative">
        <div className="fuzzy-bubbles-regular flex justify-between py-4 lg:px-15 md:px-15 2xl:px-15 xl:px-15 px-5 2xl:mt-50 text-sm bg-white">
            <div>
                &copy;{year} GymPlus. <br className="md:hidden"/>Tous droits réservés
            </div>

            <div className="flex items-center gap-3 ">
                <Button title={"Termes"} className="flex items-center cursor-pointer hover:text-orange-600 transition-colors duration-200" 
                    onClick={()=>{setTerms(!terms), setIcon(!icon), setConf(false)}}
                    icon={icon ? <ArrowDown className="h-4 w-4 "/> : <ArrowUp className="h-4 w-4"/> }
                />
                <Button title={"Confidentialités"}  className="flex items-center cursor-pointer hover:text-orange-600 transition-colors duration-200" 
                    onClick={()=>{setConf(!conf), setIconConf(!iconConf), setTerms(false)}}
                    icon={iconConf ? <ArrowDown className="h-4 w-4 "/> : <ArrowUp className="h-4 w-4"/> }
                />
            </div>
        </div>

            {terms &&(
                <motion.div
                    initial = {{opacity: 0, y: 10}}
                    animate = {{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                    
                    className="fuzzy-bubbles-regular absolute px-3 h-100 w-90 lg:w-100 md:w-100 xl:w-100 2xl:w-100 bottom-10 2xl:bottom-13 xl:bottom-13 md:bottom-13 lg:bottom-13 bottom-13 right-3 2xl:right-1 xl:right-1 lg:right-1 md:right-1 flex items-center justify-center rounded-lg z-40 bg-white border-orange-500 border-1 text-black"
                >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa illo obcaecati aspernatur possimus officia eos voluptate soluta repellat repellendt expedita adipisci, quod minus ipsa iste odio ea. Quae facilis, adipisci ut enim qui iure tempore? Qui nemo laborum assumenda officia, sequi cum odit animi repellendus voluptatum?
                Odio corporis totam delectus exercitationem error, sapiente molestiae, provident ab ipsam quia omnis, quam labore commodi. Cum id illum, quis porro quaerat veritatis commodi fuga totam amet consequuntur sunt quidem.
                Nisi nulla totam, necesslo praesentium doloribus doloremque magni? Molestias quasi repellendus ullam nisi possimus dolorem qui.
                </motion.div>
            )}

            {conf &&(
                <motion.div
                    initial = {{opacity: 0, y: 10}}
                    animate = {{opacity: 1, y: 0}}
                    transition={{duration: 0.8}}
                    
                    className="fuzzy-bubbles-regular absolute px-3  h-100 w-90 lg:w-100 md:w-100 xl:w-100 2xl:w-100 2xl:bottom-13 xl:bottom-13 md:bottom-13 md:right-1 lg:bottom-13 lg:right-1 right-3 bottom-13 2xl:right-1 xl:right-1 flex items-center justify-center rounded-lg z-40 bg-white border-orange-500 border-1 text-black"
                >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa illo obcaecati aspernatur possimus officia eos voluptate soluta repellat repellendt expedita adipisci, quod minus ipsa iste odio ea. Quae facilis, adipisci ut enim qui iure tempore? Qui nemo laborum assumenda officia, sequi cum odit animi repellendus voluptatum?
                Odio corporis totam delectus exercitationem error, sapiente molestiae, provident ab ipsam quia omnis, quam labore commodi. Cum id illum, quis porro quaerat veritatis commodi fuga totam amet consequuntur sunt quidem.
                Nisi nulla totam, necesslo praesentium doloribus doloremque magni? Molestias quasi repellendus ullam nisi possimus dolorem qui.
                </motion.div>
            )}
        </div>
    )
}