import React from "react";
import { Link } from "react-scroll";
import { ArrowUpRight, Users, Receipt, LayoutDashboard, Medal, Settings, Dumbbell, ArrowDownRight, ShieldEllipsis, HeartPlus, Clock, ArrowDown, MousePointerClick, FilePieChart } from "lucide-react";
import stats from '../assets/images/stats2.png'
import coverhero from '../assets/images/coverhero.png'
import {motion} from 'framer-motion'
import { useNavigate } from "react-router-dom";


export default function Hero(){
    const navigate = useNavigate()

    function handleLogin(){
        navigate('/auth')
    }


    return(
        <div className="relative bg-orange-200 h-screen">
            <div className="absolute flex items-center justify-between  bottom-0 z-20 bg-orange-600 w-full h-20 2xl:h-40 xl:h-25 md:h-20">
                <p className="w-full flex items-center justify-center text-base 2xl:text-6xl xl:text-4xl md:text-2xl uppercase font-bold text-white">Choisir mon forfait dès maintenant</p>
                <motion.div 
                    
                    className="2xl:w-120 xl:w-120 md:w-120 relative 2xl:px-20 xl:px-20 md:px-20">
                    <Link
                            to="suscribe"
                            smooth={true}
                            duration={600}
                            offset={-50}
                        >
                        <motion.button
                        onClick={null}
                            whileTap={{scale: 0.95}}
                            className="border hover:bg-white/80 hover:shadow-[0_0_80px_rgba(100,255,200,1)] transition-all duration-200 w-full bg-white text-orange-800 text-2xl uppercase border shadow-[0_0_50px_rgba(100,255,200,1)] rounded-lg font-bold px-2  2xl:p-4 md:p-2 xl:p-2 flex items-center justify-center"
                        >
                            Içi
                        </motion.button>
                    </Link>
                    <MousePointerClick className="absolute hidden 2xl:block xl:block md:block -bottom-0 xl:-bottom-8 2xl:-bottom-8 md:-bottom-8 right-20 2xl:h-20 xl:h-20 md:h-20 xl:w-20 2xl:w-20 md:w-20 h-8 w-8"  fill="white" stroke="orange"/>
                </motion.div>
            </div>
            <div className=" py-8 2xl:px-20 xl:px-20 md:px-20 px-2 relative ">
                
                <div className="absolute bg-orange-300/50 rounded-full h-200 w-200 bottom-5 right-35"></div>
                <div className="flex items-center justify-between w-full 2xl:px-10 xl:px-10 md:px-0 xl:mb-5 md:mb-10 2xl:mb-0 mb-5">
                    <p className="text-2xl font-bold italic uppercase">Gym<span className="text-orange-600">Plus</span></p>
                    <div className="hidden md:flex items-center 2xl:gap-20 xl:gap-20 md:gap-5">
                        
                        <Link
                            to="features"
                            smooth={true}
                            duration={600}
                            offset={-50}
                            className="hover:text-orange-600 transition-all duration-200 cursor-pointer"
                        >Fonctionnalités</Link>
                       
                        <Link
                            to="suscribe"
                            smooth={true}
                            duration={600}
                            offset={-50}
                            className="hover:text-orange-600 transition-all duration-200 cursor-pointer "
                        >Tarifs</Link>
                        
                        <Link
                            to="contact"
                            smooth={true}
                            duration={600}
                            offset={-50}
                            className="hover:text-orange-600 transition-all duration-200 cursor-pointer "
                        >Contacts</Link>
                       
                    </div>
                    <motion.button
                        onClick={handleLogin}
                        whileTap={{scale: 0.95}}
                        className="bg-orange-600 hover:bg-orange-500 rounded-full py-2 px-5 font-semibold text-white"
                    >
                        Se connecter à mon compte
                    </motion.button>
                </div>

                <div className="flex relative 2xl:px-8 xl:px-8 md:px-8 px-2 justify-between ">
                    
                    <div className="flex w-full flex-col 2xl:gap-10 xl:gap-10 md:gap-20 gap-3 pb-10 justify-center">
                        <div className="flex flex-col 2xl:gap-3 xl:gap-3 md:gap-3 gap-1 ">
                            <p className="2xl:text-5xl xl:text-4xl md:text-5xl text-2xl  font-bold"><span className="">Gérez</span> et <span className="">Suivez</span> votre</p>
                            <p className="2xl:text-5xl xl:text-4xl md:text-5xl text-2xl font-bold"><span className="2xl:text-8xl xl:text-6xl md:text-8xl text-orange-600 uppercase">Salle de Gym</span> </p>
                            <p className="2xl:text-5xl xl:text-4xl md:text-5xl  text-2xl font-bold">partout où vous êtes</p>
                            <p className="2xl:text-5xl xl:text-4xl md:text-5xl text-2xl font-bold">et quand vous voulez.</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-gray-500 text-2xl">Gérer vos membres, vos abonnements, vos cours,</p>
                            <p className="text-gray-500 text-2xl">vos activités, vos finances en toute simplicité.</p>
                            <p className="text-gray-500 text-2xl">Augmentez la fidélité et optimisez la gestion de</p>
                            <p className="bg-orange-600 text-white font-bold typing text-2xl">votre salle avec <span className="uppercase italic ">GymPlus</span>.</p>
                            <div className="md:flex xl:flex 2xl:flex items-center hidden 2xl:block xl:block md:block gap-2">
                            <Users className="h-10 w-10 text-gray-500 border border-orange-300 p-2 flex items-center justify-center rounded-full" />
                            <Receipt className="h-10 w-10 text-gray-500 border border-orange-300 p-2 flex items-center justify-center rounded-full" />
                            <LayoutDashboard className="h-10 w-10 text-gray-500 border border-orange-300 p-2 flex items-center justify-center rounded-full" />
                            <Medal className="h-10 w-10 text-gray-500 border border-orange-300 p-2 flex items-center justify-center rounded-full" />
                            <Settings className="h-10 w-10 text-gray-500 border border-orange-300 p-2 flex items-center justify-center rounded-full" />
                            <FilePieChart className="h-10 w-10 text-gray-500 border border-orange-300 p-2 flex items-center justify-center rounded-full" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between 2xl:px-20 xl:px-0">
                            <div className="flex items-center gap-2">
                                <ShieldEllipsis className="h-10 w-10 text-orange-600 bg-orange-300 p-2 flex items-center justify-center rounded-full" />
                                <p className="2xl:text-xl xl:text-xl md:text-xl text-xs ">Sécurisé</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <HeartPlus className="h-10 w-10 text-orange-600 bg-orange-300 p-2 flex items-center justify-center rounded-full" />
                                <p className="2xl:text-xl xl:text-xl md:text-xl text-xs">Fiable</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-10 w-10 text-orange-600 bg-orange-300 p-2 flex items-center justify-center rounded-full" />
                                <p className="2xl:text-xl xl:text-xl md:text-xl text-xs">Service ouvert 24h/7j</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <ArrowDown className="h-10 w-10 text-orange-600 animate-bounce" />
                        </div>

                    </div>

                    <div className="flex w-full hidden 2xl:block xl:block items-center justify-center">
                        <img src={stats} alt="img-dashboard" className="" />
                    </div>

                </div>
            </div>
        </div>
    )
}