import React from "react";
import Button from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { ArrowUpRight, Users, Receipt, LayoutDashboard, Medal, Settings, Dumbbell, ArrowDownRight } from "lucide-react";
import heroimg from '../assets/images/heroimg.png'
import stats from '../assets/images/stats.png'
import coverhero from '../assets/images/coverhero.png'
import {motion} from 'framer-motion'


export default function Hero(){

    const navigate = useNavigate();
    return(
        <>
        <div className=" inset-0 -z-10 overflow-hidden ">
            <div className="absolute inset-0  bg-gradient-to-br from-black/10 to-orange-500"></div>
        </div>

        <div
                    className="absolute z-20 inset-0 opacity-50 bg-cover bg-center" 
                style={{ backgroundImage: `url(${coverhero})` }}
                ></div>

            <div className="min-h-screen  xl:flex 2xl:flex lg:flex grid grid-cols-1 place-items-center place-content-center items-center justify-center  gap-2 px-4 py-4 text-center">
                
                <motion.div
                className="z-30"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex-col    items-center justify-center">
                        <div className="flex-col items-center justify-center ">
                            <p className="fuzzy-bubbles-bold lg:mb-5 xl:text-4xl 2xl:text-6xl text-2xl lg:text-3xl md:text-5xl md:mt-15 xl:mt-0 2xl:mt-0 lg:mt-15 sm:mt-15 mt-15  md:leading-20 xl:leading-16 2xl:leading-25 lg:leading-13 leading-10">Le logiciel Tout-en-Un  <br />pour Votre Salle de Sport.</p>
                            <p className=" 2xl:text-3xl xl:text-2xl md:text-3xl lg:text-2xl text-md text-gray-600 md:leading-relaxed leading-10 "> Gérer vos membres, vos abonnements et <br /> vos cours en
                                toute simplicité. Augmentez <br />la fidélité et optimisez 
                                la gestion de votre <br />salle avec GymPlus.
                            </p>
                        </div>
                        <div className="flex items-center justify-center gap-3 mt-10 ">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                >
                            <Button onClick={null}
                                className="flex items-center text-sm md:text-2xl lg:text-lg  md:p-4 2xl:p-4 xl:p-4 lg:p-2 px-1 py-2 bg-orange-600 hover:bg-transparent border-2 border-orange-500 hover:text-black rounded-lg text-white font-bold transition-colors duration-200 cursor-pointer"
                                title={
                                    <Link 
                                    to="suscribe" 
                                    smooth={true} 
                                    duration={600}
                                    className="cursor-pointer"
                                    >
                                    Choisir un forfait
                                    </Link>
                                }
                                icon={<ArrowUpRight className="ml-2 h-5 w-5" />}
                                
                            />
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                >
                            <Button onClick={null}
                                className="flex items-center text-sm lg:text-lg md:text-2xl md:p-4 2xl:p-4 xl:p-4 lg:p-2 px-1 py-2 border-2 border-orange-500 text-black hover:text-white hover:bg-orange-600 rounded-lg font-bold transition-colors cursor-pointer duration-200"
                                title={
                                    <Link 
                                    to="contact" 
                                    smooth={true} 
                                    duration={600}
                                    className="cursor-pointer"
                                    >
                                    Demander une démo
                                    </Link>
                                }
                                icon={<ArrowDownRight className="ml-2 h-5 w-5" />}
                            />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>


                <motion.div
                    className="z-30 "
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                    <div className="2xl:w-4xl xl:w-2xl md:w-xl lg:w-lg w-[250px] h-full ">
                        <img src={stats} alt=""
                            className="w-full h-full object-contain"
                        />
                    </div>
                </motion.div>

                <div className="absolute lg:bottom-5 md:bottom-10 bottom-5 z-30">
                     <div className="flex items-center justify-center md:gap-20 lg:gap-15 2xl:gap-20 xl:gap-20 gap-5">
                        <Users className="h-10 w-10 text-white/50  hover:text-orange-500 border-1 border-orange-500 p-1"/>
                        <Receipt className="h-10 w-10 text-white/50 hover:text-orange-500 border-1 border-orange-500 p-1"/>
                        <LayoutDashboard className="h-10 w-10 text-white/50 hover:text-orange-500 border-1 border-orange-500 p-1"/>
                        <Medal className="h-10 w-10 text-white/50 hover:text-orange-500 border-1 border-orange-500 p-1"/>
                        <Settings className="h-10 w-10 text-white/50 hover:text-orange-500 border-1 border-orange-500 p-1"/>
                        <Medal className="h-10 w-10 text-white/50 hover:text-orange-500 border-1 border-orange-500 p-1"/>
                    </div>
                </div>
            </div>

           
        
        </>
    )
}