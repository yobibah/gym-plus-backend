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
        // <>

        // <div
        //     className="absolute z-20 inset-0 opacity-50 bg-cover bg-center" 
        // style={{ backgroundImage: `url(${coverhero})` }}
        // ></div>

        // <div className="min-h-screen  xl:flex 2xl:flex lg:flex grid grid-cols-1 place-items-center place-content-center items-center justify-center  gap-2 px-4 py-4 text-center">
        // </>

        <div className="relative bg-orange-200 h-screen ">
            <div className="absolute flex items-center justify-between  bottom-0 z-20 bg-orange-600 w-full h-40">
                <p className="w-full flex items-center justify-center text-6xl uppercase font-bold text-white">Choisir mon forfait dès maintenant</p>
                <motion.div 
                    
                className="w-120 relative px-20">
                    <Link
                            to="suscribe"
                            smooth={true}
                            duration={600}
                            offset={-50}
                        >
                    <motion.button
                    onClick={null}
                        whileTap={{scale: 0.95}}
                        className="border hover:bg-white/80 hover:shadow-[0_0_80px_rgba(100,255,200,1)] transition-all duration-200 w-full bg-white text-orange-800 text-2xl uppercase border shadow-[0_0_50px_rgba(100,255,200,1)] rounded-lg font-bold p-4 flex items-center justify-center"
                    >
                         Içi
                    </motion.button>
                    </Link>
                    <MousePointerClick className="absolute -bottom-8 right-20 h-20 w-20"  fill="white" stroke="orange"/>
                </motion.div>
            </div>
            <div className=" py-8 px-20 relative ">
                
                <div className="absolute bg-orange-300/50 rounded-full h-200 w-200 bottom-5 right-35"></div>
                <div className="flex items-center justify-between w-full px-10">
                    <p className="text-2xl font-bold italic uppercase">Gym<span className="text-orange-600">Plus</span></p>
                    <div className="hidden md:flex items-center gap-20">
                        
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

                <div className="flex relative px-8 justify-between ">
                    
                    <div className="flex w-full flex-col gap-10 pb-10 justify-center">
                        <div className="flex flex-col gap-3 ">
                            <p className="text-5xl font-bold"><span className="">Gérez</span> et <span className="">Suivez</span> votre</p>
                            <p className="text-5xl font-bold"><span className="text-8xl  text-orange-600 uppercase">Salle de Gym</span> </p>
                            <p className="text-5xl font-bold">partout où vous êtes</p>
                            <p className="text-5xl font-bold">et quand vous voulez.</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-gray-500 text-2xl">Gérer vos membres, vos abonnements, vos cours,</p>
                            <p className="text-gray-500 text-2xl">vos activités, vos finances en toute simplicité.</p>
                            <p className="text-gray-500 text-2xl">Augmentez la fidélité et optimisez la gestion de</p>
                            <p className="bg-orange-600 text-white font-bold typing text-2xl">votre salle avec <span className="uppercase italic ">GymPlus</span>.</p>
                            <div className="flex items-center gap-2">
                            <Users className="h-10 w-10 text-gray-500 border border-orange-300 p-2 flex items-center justify-center rounded-full" />
                            <Receipt className="h-10 w-10 text-gray-500 border border-orange-300 p-2 flex items-center justify-center rounded-full" />
                            <LayoutDashboard className="h-10 w-10 text-gray-500 border border-orange-300 p-2 flex items-center justify-center rounded-full" />
                            <Medal className="h-10 w-10 text-gray-500 border border-orange-300 p-2 flex items-center justify-center rounded-full" />
                            <Settings className="h-10 w-10 text-gray-500 border border-orange-300 p-2 flex items-center justify-center rounded-full" />
                            <FilePieChart className="h-10 w-10 text-gray-500 border border-orange-300 p-2 flex items-center justify-center rounded-full" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-20">
                            <div className="flex items-center gap-2">
                                <ShieldEllipsis className="h-10 w-10 text-orange-600 bg-orange-300 p-2 flex items-center justify-center rounded-full" />
                                <p className="text-xl ">Sécurisé</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <HeartPlus className="h-10 w-10 text-orange-600 bg-orange-300 p-2 flex items-center justify-center rounded-full" />
                                <p className="text-xl">Fiable</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-10 w-10 text-orange-600 bg-orange-300 p-2 flex items-center justify-center rounded-full" />
                                <p className="text-xl">Service ouvert 24h/7j</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <ArrowDown className="h-10 w-10 text-orange-600 animate-bounce" />
                        </div>

                    </div>

                    <div className="flex w-full items-center justify-center">
                        <img src={stats} alt="img-dashboard" className="" />
                    </div>

                </div>
            </div>
        </div>
    )
}